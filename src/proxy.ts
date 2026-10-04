import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createClient } from "./lib/client/server";

type RouteType = "protected" | "public" | "auth";

interface RoutePattern {
	pattern: string;
	type: RouteType;
}

const routeConfigs: RoutePattern[] = [
	{ pattern: "/login", type: "auth" },
	{ pattern: "/register", type: "auth" },

	{ pattern: "/register/profile", type: "protected" },
];

const redirects: Record<string, string> = {
	signup: "register",
	"sign-up": "register",
	sign_up: "register",

	signin: "login",
	"sign-in": "login",
	sign_in: "login",
	"log-in": "login",
	log_in: "login",
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

	const segments = pathname.split("/");
	const firstSegment = segments[1];
	const canonicalSegment = firstSegment ? redirects[firstSegment] : undefined;

	if (canonicalSegment) {
		const url = request.nextUrl.clone();
		segments[1] = canonicalSegment;
		url.pathname = segments.join("/") || "/";
		return NextResponse.redirect(url, 308);
	}

	const routeType = matchRoute(pathname);

	if (routeType === "public") {
		return NextResponse.next();
	}

	const supabase = await createClient();
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	const hasUser = !!user && !userError;
	let hasProfile = false;

	if (hasUser) {
		const { data: profile, error: profileError } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", user.id)
			.maybeSingle();
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
