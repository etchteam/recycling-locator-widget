import diamondUiBase from '@etchteam/diamond-ui/styles/base.css?inline';
import diamondUiTokens from '@etchteam/diamond-ui/styles/tokens.css?inline';
import { css, unsafeCSS } from 'lit';

export const diamondUi = css`
  ${unsafeCSS(diamondUiTokens.replace(/:root/g, ':host'))}
  ${unsafeCSS(diamondUiBase)}

  /**
   * Redefine body styles from diamond because we don't have a <body> element
   */
  :host {
    font-family: var(--diamond-font-family);
    font-size: var(--diamond-font-size-base);
    -webkit-font-smoothing: antialiased;
    line-height: var(--diamond-font-line-height);
  }

  /**
   * Diamond variable overrides
   */
  :host {
    --diamond-skin-heading-color-light: var(--theme-heading-color-light);
    --diamond-skin-color-light: var(--theme-color-light);
    --diamond-skin-border-color-light: var(--theme-border-color-light);

    --diamond-font-family: var(--font-family);
  }
`;
