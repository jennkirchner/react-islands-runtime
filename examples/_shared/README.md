# Shared Example Infrastructure

This folder contains the shared pieces used by the example apps under `examples/`.

## What Lives Here

- `appServer.js`: shared Express app bootstrap
- `app-data/`: local fixture data used by the checked-in apps
- `components/`: reusable example components such as the theme switch and carousel block
- `models/`: shared model helpers
- `public/`: shared static assets
- `runtime/`: local runtime entrypoints used while developing the apps in this repo

## Design System Shape

The runtime expects each app to provide its own theme features and document styles.

- app-level theme config lives in `examples/<app>/server/designSystem.js`
- app-level shell and theme wiring lives in `examples/<app>/server/foundation.js`
- reusable component styles, such as carousel and search styles, are imported explicitly by each app
- theme tokens such as `radius.surface` and `radius.image` become CSS variables used by those components

## Request Flow

For an app like `examples/test-data`:

1. `server/index.js` imports `startAppServer` from `examples/_shared/appServer.js`
2. `server/index.js` imports `appFeatures` from its local `server/designSystem.js`
3. the shared app server passes those features into the runtime composition pipeline
4. the app theme, CSS variables, and explicit component styles are applied during SSR

## Why This Split Exists

Changes in `react-islands-runtime/ssr` affect the published runtime surface.

Changes in `examples/<app>/server/designSystem.js` or `examples/<app>/server/foundation.js` affect only that app's implementation of the runtime extension points.
