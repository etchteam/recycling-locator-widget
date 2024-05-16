# Recycling Locator

Powered by RecycleNow.com, this tool can be used to search and find recycling locations throughout the United Kingdom. It’s been created as an embeddable widget that can be added to any website to help visitors discover more recycling options.

## Add the widget to your website

To apply to embed the widget on your website, email us at [PartnerEnquiries@wrap.org.uk](mailto:PartnerEnquiries@wrap.org.uk).

Installation won't work until your application has been approved.

### Option 1: Install the script

Add the script above the closing `</body>` tag.

```html
<script src="https://rl.recyclenow.com/wrap-rlw.js" async defer></script>
```

Include an element with the id "wrap-rlw" into your HTML, this is where the widget will be output.

```html
<div id="wrap-rlw"></div>
```

Include the global stylesheet (optional)

```html
<link href="https://rl.recyclenow.com/recycling-locator.css">
```

### Option 2: Install the web component

Install via NPM

```bash
npm i -S @etchteam/recycling-locator`
```

Include the web component in your HTML, this is where the widget will be output.

```html
<recycling-locator></recycling-locator>
```

Include the stylesheet within your website styles (optional)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@etchteam/recycling-locator@latest/dist/recycling-locator.css">
```

⚠️ Dependabot is configured to notify daily for NPM version changes, falling out of date means the widget could stop working due to upstream breaking API changes.

## Available settings

### Locale

Use the `locale` attribute to set the language.

The language code for Welsh (`cy`) is currently the only supported language code.

**Script**

```html
<script src="..." data-locale="cy"></script>
```

**Web component**

```html
<recycling-locator locale="cy"></recycling-locator>
```

### Theme

Accepted values are red, blue, green, orange, purple, brown, navy, or black.

**Script**

```html
<script src="..." data-theme="red"></script>
```

**Web component**

```html
<recycling-locator theme="red"></recycling-locator>
```

#### CSS variables

For more granular control over the theme, add CSS variables to your stylesheet.

```css
:root{
  /* The primary colour is the main color that's changed via theme presets */
  --recycling-locator-color-primary-lightest: #eef5e5;
  --recycling-locator-color-primary-light: #dfefc8;
  --recycling-locator-color-primary: #8dc63f;
  --recycling-locator-color-primary-dark: #297f00;

  /* Other variables control specific parts of the UI */
  --recycling-locator-theme-background: #fff;
  --recycling-locator-theme-background-muted-light: #f5f6f8;
  --recycling-locator-theme-heading-color-light: #222;
  --recycling-locator-theme-color-light: #222;
  --recycling-locator-theme-color-muted-light: #4f4f4f;
  --recycling-locator-theme-color-hover: var(--recycling-locator-color-primary-dark);
  --recycling-locator-theme-border-color-light: #cfd1d3;
  --recycling-locator-theme-border-color-hover-light: var(--recycling-locator-color-primary-dark);
  --recycling-locator-theme-link-color: #0077ab;
}
```

### Path

The initial path to load. Common examples include:

- `/{postcode}` to pre-fill the location
- `/home-recycling` for home recycling embeds
- `/material?materials=111&search=Cereal boxes` to pre-select a material
- `/{postcode}/places/{placeName}/{placePostcode}` to load a single place

To discover other possible initial path combinations, take note of the path in the URL whilst navigating on the standalone version of the tool at [locator.recyclenow.com](https://locator.recyclenow.com/).

**Script**

```html
<script src="..." data-initial-path="/home-recycling"></script>
```

**Web component**

```html
<recycling-locator path="/home-recycling"></recycling-locator>
```

### Materials

This setting is **only available for the script installation method** for backwards compatibility.

The same can be achieved by passing materials in the `path` web component attribute.

Example with material id:

```html
<script src="..." data-materials="1"></script>
```

Example with multiple materials:

```html
<script src="..." data-materials="[1,2]"></script>
```

### Public path

This setting is **only available for the web component installation method**.

This setting can be used to set a public URL to load assets from, the path should always end with a `/`.

If not provided, [jsdelivr CDN](https://www.jsdelivr.com/) will be used.

The following example would serve assets from your websites public directory:

```html
<recycling-locator public-path="/public/"></recycling-locator>
```

To self-host assets, static files can be moved from node_modules using a postinstall script.

```bash
cp -r ./node_modules/@etchteam/recycling-locator/dist/images ./public
cp -r ./node_modules/@etchteam/recycling-locator/dist/translations ./public
cp ./node_modules/@etchteam/recycling-locator/dist/recycling-locator.css ./public
cp ./node_modules/@etchteam/recycling-locator/dist/styles.css ./public
```

## Content Security Policy (CSP)

If your website implements a CSP, it'll need some changes based on whether the script or web component installation option is being used.

**Script**

- `img-src data: https://rl.recyclenow.com https://*.here.com;`
- `script-src https://rl.recyclenow.com 'unsafe-eval';`
- `connect-src blob: https://rl.recyclenow.com https://*.sentry.io https://*.hereapi.com https://*.here.com;`
- `style-src 'unsafe-inline' https://rl.recyclenow.com;`
- `font-src https://*.here.com;`
- `worker-src blob:;`

**Web component**

- `img-src data: https://cdn.jsdelivr.net https://*.here.com;`
- `script-src 'self' 'unsafe-eval';`
- `connect-src blob: https://cdn.jsdelivr.net https://rl.recyclenow.com https://*.sentry.io https://*.hereapi.com https://*.here.com;`
- `style-src 'unsafe-inline' https://cdn.jsdelivr.net;`
- `font-src https://*.here.com;`
- `worker-src blob:;`

## Listening for when the locator has loaded

The `<recycling-locator>` will dispatch a custom "ready" event when the UI has rendered.

```javascript
document
  .querySelector('recycling-locator')
  .addEventListener('ready', () => {
    console.info('Ready to recycle');
  });
```

## Contributing

Looking to contribute to the code? A good starting point is [the contributing docs](https://github.com/etchteam/recycling-locator-widget/blob/main/contributing.md).
