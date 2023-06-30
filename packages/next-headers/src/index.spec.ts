import { NextRequest, NextResponse } from "next/server";
import { withNextHeaders } from ".";
import { cookies } from "next/headers";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

// async storage is not available in the test environment, so we mock it
jest.mock("next/dist/client/components/request-async-storage", () => {
  return {
    requestAsyncStorage: {
      getStore: () => {
        const store = {
          get cookies() {
            const cks = new RequestCookies(new Headers());
            cks.set("hello", "world");
            return cks;
          },
          get headers() {
            return new Headers();
          },
        };
        return store;
      },
      run: (store: unknown, callback: Function) => callback(),
    },
  };
});

describe("withNextHeaders middleware", () => {
  it("returns a NextResponse with a basic middleware", async () => {
    const request = {} as NextRequest;
    const basicMiddleware = () => {
      return NextResponse.json("ok");
    };
    const response = await withNextHeaders(basicMiddleware)(request);
    expect(await response.json()).toEqual("ok");
  });

  it("doesn't crash when using cookies() in the middleware", async () => {
    const request = {} as NextRequest;
    const basicMiddleware = () => {
      const cookiesList = cookies();
      console.log({ cookiesList });
      return NextResponse.json(cookiesList.getAll());
    };
    const response = await withNextHeaders(basicMiddleware)(request);
    expect(await response.json()).toEqual([{ name: "hello", value: "world" }]);
  });
});
