import { css } from 'lit';

/**
 * Public variables are prefixed with `--recycling-locator-`
 * Private variables are prefixed with `--locator-`
 */
export const variables = css`
  :host {
    /* Colors */
    --diamond-skin-heading-color-light: var(
      --recycling-locator-skin-heading-color,
      #333
    );
    --diamond-skin-color-light: var(--recycling-locator-skin-color, #333);
    --diamond-skin-border-color-light: var(
      --recycling-locator-skin-border-color,
      #bdbdbd
    );

    /* Fonts */
    --locator-default-font-family: Arial, Helvetica, sans-serif;
    --diamond-font-family: var(
      --recycling-locator-font-family,
      var(--locator-default-font-family)
    );

    /* Container */
    --locator-container-height: 540px;
    --locator-container-border-color: var(
      --recycling-locator-container-border-color,
      var(--diamond-skin-border-color-light)
    );

    @media (min-width: 768px) {
      --locator-container-height: 640px;
    }
  }
`;
