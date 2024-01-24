import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('locator-logo')
export class Logo extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    img {
      display: block;
      width: min(230px, 100%);
      height: auto;
    }
  `;

  render() {
    return html`
      <img
        src="/recycling-locator-logo.webp"
        alt="Recycling Locator"
        width="230"
        height="42"
      />
    `;
  }
}
