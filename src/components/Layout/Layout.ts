import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

@customElement('locator-layout')
export class Layout extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    @container (min-width: 768px) {
      :host {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          'header aside'
          'main aside';
      }
    }

    ::slotted([slot='header']) {
      background: var(--diamond-color-white);
      border-bottom: var(--diamond-border);
      grid-area: header;
      position: sticky;
      top: 0;
    }

    ::slotted([slot='main']) {
      grid-area: main;
    }

    ::slotted([slot='aside']) {
      grid-area: aside;
    }
  `;

  render() {
    return html`
      <slot name="header"></slot>
      <slot name="main"></slot>
      <slot name="aside"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'locator-layout': Layout;
  }
}
