import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { typography } from './styles/typography';
import { variables } from './styles/variables';

/**
 * Provides global styles for the application
 */
@customElement('locator-app')
export class App extends LitElement {
  static styles = [
    variables,
    typography,
    css`
      article {
        border: 1px solid var(--locator-container-border-color);
        height: var(--locator-container-height);
        overflow-y: auto;
      }
    `,
  ];

  render() {
    return html`
      <article>
        <slot></slot>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'locator-app': App;
  }
}
