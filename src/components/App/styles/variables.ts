import { css } from 'lit';

/**
 * Public variables are prefixed with `--recycling-locator-`
 * Private variables are prefixed with `--locator-`
 */
export const variables = css`
  :host {
    /* Colors */
    --locator-color-body: #333;
    --locator-color-border: #bdbdbd;

    /* Fonts */
    --locator-font-family: var(
      --recycling-locator-font-family,
      Arial,
      Helvetica,
      sans-serif
    );

    /* Container */
    --locator-container-height: 540px;
    --locator-container-border-color: var(
      --recycling-locator-container-border-color,
      var(--locator-color-border)
    );

    @media (min-width: 768px) {
      --locator-container-height: 640px;
    }
  }
`;
