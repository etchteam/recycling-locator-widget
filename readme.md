# Recycling Locator

## Welsh language support

Use the `locale` attribute to set the language. `cy` is currently the only supported language code.

```html
<recycling-locator locale="cy"></recycling-locator>
```

## Prefilled location

Provide the `postcode` attribute to skip initial location entry.

```html
<recycling-locator postcode="AB123CD"></recycling-locator>
```

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
