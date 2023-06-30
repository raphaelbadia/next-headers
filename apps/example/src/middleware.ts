import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { withNextHeaders } from "next-headers";

export const middleware = withNextHeaders((request: NextRequest) => {
  if (request.nextUrl.pathname === "/middleware-response") {
    return NextResponse.json(cookies().getAll());
  }
  return NextResponse.next();
});
