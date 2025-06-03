// frontend/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 管理ページのみチェック対象
  if (pathname.startsWith("/admin")) {
    const cookie = request.cookies.get("logged_in");
    const isLoggedIn = cookie?.value === "true";

    // ログインしていない場合は 404 に強制書き換え
    if (!isLoggedIn) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }
  }

  return NextResponse.next();
}

// ミドルウェア対象のパス
export const config = {
  matcher: ["/admin/:path*"],
};
