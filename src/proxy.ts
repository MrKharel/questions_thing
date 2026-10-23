import createClient from "./lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type RouteType = "protected" | "public" | "auth";
type RoutePattern = { pattern: string; type: RouteType };

const routeConfigs: RoutePattern[] = [
  // AUTH routes
  { pattern: "/login", type: "auth" },
  { pattern: "/signup", type: "auth" },

  // PUBLIC routes
  { pattern: "/help/forgot-password", type: "public" },

  // PROTECTED routes
  { pattern: "/", type: "protected" },
];
const redirects: Record<string, string> = {
  "/help": "/login",
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

  let supabaseResponse = NextResponse.next({ request });
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  const hasUser = user && !userError;

  switch (routeType) {
    case "protected": {
      if (!hasUser) {
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
        url.pathname = "/classes";
        url.search = "";
        return NextResponse.redirect(url);
      }
      break;
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
