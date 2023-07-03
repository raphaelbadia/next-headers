# next-headers

A (very) tiny wrapper to allow you to use Next.js's `cookies()` and `headers()` functions in your middleware.

![publish size](https://badgen.net/packagephobia/publish/next-headers) ![Tree shaking supported](https://badgen.net/bundlephobia/tree-shaking/next-headers) [<img src="https://img.shields.io/npm/dw/next-headers.svg" />](https://www.npmjs.com/package/next-headers)

## Why would I need this?

Next.js's `cookies()` and `headers()` functions are only available in app directory. This means that if you want to use them in your middleware, you need to pass the request object from your middleware to every function down the stream. This can get messy, especially if you have multiple layers of middlewares, or if you have shared logic between your middleware and server code.

## Installation

### npm

```bash
npm install next-headers
```

### Yarn

```bash
yarn add next-headers
```

## Usage

Open your `middleware.ts` file and import the `next-headers` package:

```ts // File: middleware.ts
import { withNextHeaders } from "next-headers";
```

Then, wrap your middleware with the `withNextHeaders` function:

```ts
export const middleware = withNextHeaders((request) => {
  // You can now use cookies() and headers() here
});
```

That's it! You can now use `cookies()` and `headers()` in your middleware.
