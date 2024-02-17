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

Start the local development server on [http://localhost:3000](http://localhost:3000)

```bash
npm start
```

## Viewing changes

There's 3 preset configurations that are available to test with locally:

- [/](http://localhost:3000) - default English embedded widget
- [/welsh](http://localhost:3000/welsh) - Welsh language embedded widget
- [/standalone](http://localhost:3000/standalone) - Full page app

For component documentation run:

```bash
npm run storybook
```

Storybook will be available on [http://localhost:6006/](http://localhost:6006/)

## Folder structure

- /public - static assets
- index.html - default English embedded widget example
- welsh.html - Welsh language embedded widget example
- standalone.html - Full page app example
- /src
  - /components - all locator specific custom elements
  - /lib - general lib functions
  - /styles - global styles
  - /types - global types
  - /pages - app routes using a file naming convention
    - *.loader.ts – loader for a route
    - *.action.ts – form submission action for a route
    - *.page.ts – renders as a page on a route
    - *.routes.ts – holds routes
    - /\[route\] - dynamic route segment
  - config.ts - global app config variables
  - index.tsx - registers the recycling-locator web app and renders entrypoint.tsx

## Public asset URLs

All asset URLs must be prefixed with `config.publicPath` so that the asset is loaded via a full publicly accessible web address.

This is because the embedded version of the widget is designed to be placed within the context of third party sites where the assets won't exist.

## Translations

All content changes must have a Welsh equivalent translation.

The translation files can be found under /public/translations.

- en.json – English language (default)
- cy.json – Welsh language
