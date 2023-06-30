import { NextRequest, NextResponse } from "next/server";
import { requestAsyncStorage } from "next/dist/client/components/request-async-storage";
import { RequestAsyncStorageWrapper } from "next/dist/server/async-storage/request-async-storage-wrapper";

export function withNextHeaders(
  wrappedMiddleware: (
    request: NextRequest
  ) => Promise<NextResponse> | NextResponse
): (request: NextRequest) => Promise<NextResponse> {
  return async function augmentNextHeadersMiddleware(
    request: NextRequest
  ): Promise<NextResponse> {
    return RequestAsyncStorageWrapper.wrap(
      requestAsyncStorage,
      { req: request },
      async () => {
        return await wrappedMiddleware(request);
      }
    );
  };
}
