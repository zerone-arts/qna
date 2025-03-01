import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  // `searchParams`에서 `query` 값을 가져와서 UTF-8 인코딩 후 헤더에 추가
  const query = req.nextUrl.searchParams.get("query") || "";
  const encodedQuery = encodeURIComponent(query); // 인코딩 처리
  requestHeaders.set("x-query", encodedQuery);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/frontend/:path*", "/algorithm/:path*", "/datastructure/:path*"],
};
