import { css } from 'lit';

/**
 * Public variables are prefixed with `--recycling-locator-`
 * - These variables shouldn't have an assigned value because that would overwrite them
 * - They can be assigned a value by the website that the widget is placed on instead
 * - Or fallback to the default value
 */
export const variables = css`
  :host {
    /**
     * Theme
     */
    --theme-heading-color-light: var(
      --recycling-locator-theme-heading-color-light,
      #333
    );
    --theme-color-light: var(--recycling-locator-theme-color-light, #333);
    --theme-border-color-light: var(
      --recycling-locator-theme-border-color-light,
      #bdbdbd
    );

    /**
     * Fonts
     */
    --font-family-default: Arial, Helvetica, sans-serif;
    --font-family: var(
      --recycling-locator-font-family,
      var(--font-family-default)
    );

    /**
     * Container (The widgets outer wrapper)
     */
    --container-height: 540px;
    --container-border-default: 1px solid var(--theme-border-color-light);
    --container-border: var(
      --recycling-locator-container-border,
      var(--container-border-default)
    );

    @media (min-width: 768px) {
      --container-height: 640px;
    }
  }
`;
