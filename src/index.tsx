import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { render as preactRender } from 'preact';

import Entrypoint from './app/Entrypoint';
import { diamondUi } from './styles/diamond-ui';
import { variables } from './styles/variables';

/**
 * The root web component
 * - Registers the recycling-locator-widget custom element
 * - Renders the Preact app within the shadow DOM for style encapsulation
 * - Provides global styles
 */
@customElement('recycling-locator-widget')
export class RecyclingLocatorWidget extends LitElement {
  static styles = [
    variables,
    diamondUi,
    css`
      :host {
        display: block;
      }

      article {
        border: var(--container-border);
        container-type: inline-size;
        height: var(--container-height);
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
