import diamondUiBase from '@etchteam/diamond-ui/styles/base.css?inline';
import diamondUiTokens from '@etchteam/diamond-ui/styles/tokens.css?inline';
import { css, unsafeCSS } from 'lit';

export const vendor = css`
  ${unsafeCSS(diamondUiTokens.replace(/:root/g, ':host'))}
  ${unsafeCSS(diamondUiBase)}
`;
