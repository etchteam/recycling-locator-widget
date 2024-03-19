# Contributing

Guidelines for contributions to the Recycling Locator codebase.

## Get started

Make sure you're using the right node version:

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

You will need the [recycle locator widget api](https://github.com/etchteam/recycle-locator) running on `rl.test` or you will need to connect to staging/production.

For component documentation run:

```bash
npm run storybook
```

Storybook will be available on [http://localhost:6006/](http://localhost:6006/)

## Folder structure

- index.html - default embedded widget
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

To run unit tests only use the unit test filter.

```bash
npm test unit
```

#### End to end tests

To run only the E2E tests.

```bash
npm run test:end-to-end
```

To enable E2E test debugging use the debug command.

```bash
npm run test:end-to-end-debug
```

This will launch Playwright in `PWDEBUG=console` mode with an infinite timeout.

### Structure

Unit tests exist for lib functions in /tests/unit using Vitest.

End-to-end tests exist for route coverage in /tests/end-to-end using Playwright.

All end-to-end tests must be wrapped in the `describeEndToEndTest` function which handles setting up the Playwright browser `page` context.
