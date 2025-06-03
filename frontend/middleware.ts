// frontend/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin配下のみ対象
  if (pathname.startsWith("/admin")) {
    const loggedIn = request.cookies.get("logged_in")?.value;

    // Cookieなければ404へリダイレクト
    if (!loggedIn) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }
  }

  return NextResponse.next();
}

// 対象となるパス
export const config = {
  matcher: ["/admin/:path*"],
};
