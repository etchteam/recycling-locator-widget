import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { render as preactRender } from 'preact';

import Entrypoint from './app/Entrypoint';
import { typography } from './styles/typography';
import { variables } from './styles/variables';
import { vendor } from './styles/vendor';

/**
 * The root web component
 * - Registers the recycling-locator-widget custom element
 * - Renders the Preact app within the shadow DOM for style encapsulation
 * - Provides global styles
 */
@customElement('recycling-locator-widget')
export class RecyclingLocatorWidget extends LitElement {
  static styles = [
    vendor,
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
    return preactRender(
      <article>
        <Entrypoint />
      </article>,
      this.shadowRoot,
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'recycling-locator-widget': RecyclingLocatorWidget;
  }
}
