import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const rawHost =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.host ||
    "";
  
  const host = rawHost.split(":")[0].toLowerCase();

  // Fail-safe redirect: Push any traffic hitting apex domain 'loah.in' directly to 'www.loah.in' with a 301 Permanent Redirect
  if (host === "loah.in") {
    const redirectUrl = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      "https://www.loah.in"
    );
    return NextResponse.redirect(redirectUrl, {
      status: 301,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. Next.js internal static assets (_next/static, _next/image)
     * 2. Common media and static files (.svg, .png, .jpg, .ico, .txt, .xml, .webmanifest)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};
