# react-islands-runtime

`react-islands-runtime` is an SSR-first React islands runtime with a set of small storefront-style example apps in `examples/`.

This repository does two things:

1. ships the runtime package from `src/`, `packages/`, and `types/`
2. exercises that runtime in concrete apps with local and third-party data sources

## Quick Start

```bash
git clone <repo>
cd react-islands-runtime
yarn install
cd examples
yarn install
yarn dev:test-data
```

Open `http://localhost:3004`.

`test-data` is the best first run because it works entirely from checked-in fixtures.

## Run The Example Apps

From `examples/`:

```bash
yarn dev:commercetools              # http://localhost:3000
yarn dev:contentstack               # http://localhost:3001
yarn dev:agility                    # http://localhost:3002
yarn dev:contentstack-commercetools # http://localhost:3003
yarn dev:test-data                  # http://localhost:3004
```

Each `dev:*` command:

1. prepares the client build and islands manifest
2. starts Vite for client assets
3. starts the matching Express app server

## Repository Layout

- `src/client`: client-side islands runtime
- `src/server`: SSR rendering, routing, CSS, theme, manifest, and security helpers
- `packages/ssr`: SSR package entrypoint
- `packages/islands`: client package entrypoint
- `packages/rsc`: RSC-facing entrypoint
- `types`: TypeScript declarations
- `examples/_shared`: shared app infrastructure, fixtures, runtime helpers, and reusable example components
- `examples/*`: concrete example apps

## Runtime Entry Points

The runtime exposes:

- `react-islands-runtime/ssr`
- `react-islands-runtime/islands`
- `react-islands-runtime/rsc`

TypeScript notes:

- [docs/typescript.md](/Users/jkirchne/node_projects/react-islands-runtime/docs/typescript.md)

## Example App Summary

### `commercetools`

- commercetools-backed catalog, search, and cart flow
- local shared content fixtures

### `contentstack`

- Contentstack-backed content flow
- local shared product, search, and cart fixtures

### `agility`

- CMS-shaped content example with local commerce fixtures

### `contentstack-commercetools`

- Contentstack for content
- commercetools for catalog, search, and cart

### `test-data`

- local content fixtures
- local product fixtures
- no third-party credentials required

## Common Routes

Most apps expose:

- `/`
- `/products`
- `/products/:sku`

Most apps also expose:

- `/api/search`
- `/api/search/suggestions`
- `/api/cart`
- `/api/cart/items`

Some apps include content-oriented endpoints such as:

- `/api/content/home`
- `/api/content/hero`
- `/api/status`

## Environment Loading

The example app server loads env files in this order:

1. `examples/.env`
2. `examples/.env.<target>` when `APP_TARGET` is set
3. `./.env` from the current working directory

For example, `yarn dev:contentstack-commercetools` will look for:

- `examples/.env`
- `examples/.env.contentstack-commercetools`

## Build The Client

```bash
cd examples
yarn build:client
```

That build updates the shared service worker cache name, runs the Vite client build, and writes the islands manifest used by SSR.

## Current Expectations

- Node `>= 22`
- Yarn classic works well for this repo
- the examples are JS-first, even though the runtime ships TypeScript declarations

## First Debug Checks

If an app looks broken or unstyled:

1. restart the app after any runtime or manifest change
2. rerun `cd examples && yarn build:client`
3. verify the example app is using the local runtime package
4. check the app-specific README in `examples/<app>/README.md`
