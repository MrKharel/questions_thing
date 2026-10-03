import { createClient } from "./lib/clients/auth-db/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type RouteType = "protected" | "public" | "auth" | "create-profile";

interface RoutePattern {
	pattern: string;
	type: RouteType;
}

// Array instead of a Record so overlapping patterns (e.g. "/dashboard" vs
// "/dashboard/*") have a well-defined, explicit check order.
const routeConfigs: RoutePattern[] = [
	// Protected routes (require both user && profile)

	// Auth routes (user must not exist). "/register" is canonical here —
	// legacy aliases like "/signup" are handled by `redirects` below.
	{ pattern: "/login", type: "auth" },
	{ pattern: "/register", type: "auth" },
	{ pattern: "/forgot-password", type: "auth" },

	// Create profile page (user must exist but not profile)
	{ pattern: "/register/profile", type: "create-profile" },

	// All other routes are public by default
];

// Legacy/alternate first-path-segments that should permanently redirect to
// their canonical route. Keys are compared against the first URL segment.
const redirects: Record<string, string> = {
	signup: "register",
	"sign-up": "register",
	sign_up: "register",
	signin: "login",
	"sign-in": "login",
	sign_in: "login",
	"log-in": "login",
	log_in: "login",
	"create-profile": "register/profile",
};

function normalizePathname(pathname: string): string {
	if (pathname.length > 1 && pathname.endsWith("/")) {
		return pathname.slice(0, -1);
	}
	return pathname;
}

function matchRoute(pathname: string): RouteType {
	for (const { pattern, type } of routeConfigs) {
		if (pattern.endsWith("/*")) {
			const base = pattern.slice(0, -2);
			// require a path boundary so "/dashboard-old" doesn't match "/dashboard/*"
			if (pathname === base || pathname.startsWith(`${base}/`)) {
				return type;
			}
		} else if (pathname === pattern) {
			return type;
		}
	}
	return "public";
}

export default async function Proxy(request: NextRequest) {
	const pathname = normalizePathname(request.nextUrl.pathname);

	// --- 1. Alias redirects, resolved before touching the DB at all ---
	const segments = pathname.split("/"); // ["", "signup", ...]
	const firstSegment = segments[1];
	const canonicalSegment = firstSegment ? redirects[firstSegment] : undefined;

	if (canonicalSegment) {
		const url = request.nextUrl.clone();
		segments[1] = canonicalSegment;
		url.pathname = segments.join("/") || "/";
		// 308 preserves method and tells clients/search engines this is permanent
		return NextResponse.redirect(url, 308);
	}

	const routeType = matchRoute(pathname);

	// --- 2. Public routes never need auth/profile lookups ---
	if (routeType === "public") {
		return NextResponse.next();
	}

	// --- 3. Only hit Supabase for routes that actually need identity info ---
	const supabase = await createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	const hasUser = !!user && !userError;

	// Only query the profile if a user exists — avoids querying with an
	// undefined id and avoids the DB roundtrip entirely for anonymous visitors.
	let hasProfile = false;
	if (hasUser) {
		const { data: profile, error: profileError } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", user.id)
			.maybeSingle(); // "no profile yet" is a valid state, not an error like .single() treats it

		hasProfile = !!profile && !profileError;
	}

	switch (routeType) {
		case "protected": {
			if (!hasUser || !hasProfile) {
				const url = request.nextUrl.clone();
				url.pathname = "/login";
				url.searchParams.set("redirectTo", pathname + request.nextUrl.search);
				return NextResponse.redirect(url);
			}
			break;
		}

		case "auth": {
			if (hasUser) {
				const url = request.nextUrl.clone();
				url.pathname = hasProfile ? "/home" : "/register/profile";
				url.search = "";
				return NextResponse.redirect(url);
			}
			break;
		}

		case "create-profile": {
			if (!hasUser) {
				return NextResponse.redirect(new URL("/login", request.url));
			}
			if (hasProfile) {
				return NextResponse.redirect(new URL("/home", request.url));
			}
			break;
		}
	}

	return NextResponse.next();
}

// IMPORTANT: Next.js middleware only reads a matcher from an export literally
// named `config` (i.e. `config.matcher`). The original file exported
// `matcher`, which Next.js silently ignores — meaning middleware was actually
// running on *every* request, including static assets.
export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
