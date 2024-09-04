# Contributing

Guidelines for contributions to the Recycling Locator codebase.

## Get started

Before starting, you will need access to [recycle locator proxy](https://github.com/etchteam/recycle-locator) and have it running locally. Alternatively, you can use the UAT proxy.

Make sure you're using the right node version

```bash
nvm use
```

Install the dependencies

```bash
npm install
```

Setup your .env

```bash
cp .env.example .env
```

Start the local development server on [http://localhost:3020](http://localhost:3020)

```bash
npm start
```

For component documentation, start storybook on on [http://localhost:6006/](http://localhost:6006/)

```bash
npm run storybook
```

If using the UAT recycle locator proxy, you will need to set up a local reverse proxy to a domain that has been whitelisted for CORS.

Download [Caddy](https://caddyserver.com/), then execute the downloaded file and start up the reverse proxy (change the folder and caddy file name in the instructions below if needed)

```bash
cd ~/Downloads
chmod +x caddy_darwin_arm64
./caddy_darwin_arm64
./caddy_darwin_arm64 reverse-proxy --to :3020 --from rl.localhost
```

Navigate to [rl.localhost](rl.localhost) in the browser

## Folder structure

- index.html - default embedded widget
- standalone.html - standalone variant testing available at [http://localhost:3020/standalone](http://localhost:3020/standalone)
- /public - static assets
- /demo – documentation website for demonstrations of the widget
- /src
  - /components - all locator specific custom elements
  - /lib - general lib functions
  - /styles - global styles
  - /types - global types
  - /pages - app routes using a file naming convention
    - entrypoint.tsx - sets up the app and routes
    - *.loader.ts - data loader for a route
    - *.action.ts - form submission action for a route
    - *.page.tsx - renders as a page on a route
    - *.routes.ts - route definitions
    - *.layout.tsx - wraps a page routes to provide layout
    - /\[route\] - dynamic route segment
  - config.ts - global app config variables
  - index.tsx - registers the recycling-locator web app and renders /pages/entrypoint.tsx

## Public asset URLs

All asset URLs must be prefixed with `config.publicPath` so that the asset is loaded via a full publicly accessible web address.

This is because the embedded version of the widget is designed to be placed within the context of third party sites where the assets won't exist.

## Translations

All content changes must have a Welsh equivalent translation.

The translation files can be found under /public/translations.

- en.json – English language (default)
- cy.json – Welsh language

## Tests

### Running tests

Tests will run through `vitest`, for the end-to-end tests Playwright launches a chromium instance against the **built** dist folder.

#### Unit tests

Run only unit tests

```bash
npm run test:unit
```

#### End to end tests

Run only the E2E tests

```bash
npm run test:end-to-end
```

Or enable E2E test debugging

```bash
npm run test:end-to-end-debug
```

This will launch Playwright in `PWDEBUG=console` mode with an infinite timeout.

### Structure

Unit tests exist for lib functions in /tests/unit using Vitest.

End-to-end tests exist for route coverage in /tests/end-to-end using Playwright.

All end-to-end tests must be wrapped in the `describeEndToEndTest` function which handles setting up the Playwright browser `page` context.

## wrap-rlw.js

This file exists on the [recycle locator proxy](https://github.com/etchteam/recycle-locator) under `resources/assets/js/widget/index.js`.

Be aware that any changes to routes, may result in knock on changes being needed in this script.

