import { render } from 'preact';

import Entrypoint from './app/Entrypoint';

customElements.define(
  'recycling-locator-widget',
  class RecyclingLocatorWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      render(<Entrypoint />, this.shadowRoot);
    }
  },
);
