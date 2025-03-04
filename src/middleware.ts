import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  // 검색어 (`query`)와 정렬 (`sort`) 값을 가져와 UTF-8 인코딩 후 헤더에 추가
  const query = req.nextUrl.searchParams.get("query") || "";
  const sort = req.nextUrl.searchParams.get("sort") || ""; // 정렬 추가

  requestHeaders.set("x-query", encodeURIComponent(query));
  requestHeaders.set("x-sort", sort); // 정렬 값을 헤더에 추가

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/frontend/:path*", "/algorithm/:path*", "/datastructure/:path*"],
};
