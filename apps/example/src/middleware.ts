import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname === "/middleware-response") {
    return NextResponse.json(cookies().getAll());
  }
  return NextResponse.next();
};
