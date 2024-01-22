import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

/**
 * Provides global styles for the application
 */
@customElement('locator-app')
export class App extends LitElement {
  static styles = css`
    :host {
      --locator-outer-border-color: var(
        --recycling-locator-border-color,
        #bdbdbd
      );

      display: block;
      font-family: Arial, Helvetica, sans-serif;
      border: 1px solid var(--locator-outer-border-color);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'locator-app': App;
  }
}
