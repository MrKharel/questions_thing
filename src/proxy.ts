import createClient from "./lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type RouteType = "protected" | "public" | "onboarding" | "auth";
type RoutePattern = { pattern: string; type: RouteType };

const PROTECTED_SAFE_REDIRECT = "/home";
const AUTH_SAFE_REDIRECT = "/login";
const ONBOARDING_SAFE_REDIRECT = "/onboarding";

const routeConfigs: RoutePattern[] = [
  // AUTH routes
  { pattern: "/login", type: "auth" },
  { pattern: "/signup", type: "auth" },
  { pattern: "/forgot-password", type: "auth" },
  { pattern: "/reset-password", type: "auth" },
  { pattern: "/onboarding", type: "onboarding" },

  // PROTECTED routes
  { pattern: "/", type: "protected" },
  { pattern: "/home", type: "protected" },
  { pattern: "/dashboard", type: "protected" },
  { pattern: "/dashboard/*", type: "protected" },
];
const redirects: Record<string, string> = {};

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

  let supabaseResponse = NextResponse.next({ request });
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  const hasUser = user && !userError;
  let hasProfile = false;

  if (hasUser) {
    const { data: profile, error: profileError } = await supabase.from("profile").select("id").eq("id", user.id).maybeSingle();
    if (profile && !profileError) {
      hasProfile = true;
    }
  }

  switch (routeType) {
    case "protected": {
      if (!hasProfile || !hasUser) {
        const url = request.nextUrl.clone();
        url.pathname = AUTH_SAFE_REDIRECT;
        url.searchParams.set("redirectTo", pathname + request.nextUrl.search);
        return NextResponse.redirect(url);
      }
      break;
    }

    case "auth": {
      if (hasUser) {
        const url = request.nextUrl.clone();
        if (hasProfile) {
          url.pathname = PROTECTED_SAFE_REDIRECT;
          url.search = "";
          return NextResponse.redirect(url);
        }
        url.pathname = ONBOARDING_SAFE_REDIRECT;
        url.search = "";
        return NextResponse.redirect(url);
      }
      break;
    }

    case "onboarding": {
      if (!hasUser) {
        const url = request.nextUrl.clone();
        url.pathname = AUTH_SAFE_REDIRECT;
        url.searchParams.set("redirectTo", pathname + request.nextUrl.search);
        return NextResponse.redirect(url);
      }
      if (hasProfile) {
        const url = request.nextUrl.clone();
        url.pathname = PROTECTED_SAFE_REDIRECT;
        url.search = "";
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}

// IMPORTANT: Next.js middleware only reads a matcher from an export literally
// named `config` (i.e. `config.matcher`). The original file exported
// `matcher`, which Next.js silently ignores — meaning middleware was actually
// running on *every* request, including static assets.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
