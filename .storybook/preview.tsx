import type { Preview } from '@storybook/web-components';

import '@etchteam/diamond-ui/styles/base.css';

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { typography } from '../src/styles/typography';
import { variables } from '../src/styles/variables';
import { vendor } from '../src/styles/vendor';

/**
 * Wraps storybook stories with global styling in the same way as they are applied to the widget
 */
@customElement('locator-storybook-decorator')
export class StorybookDecorator extends LitElement {
  static styles = [
    vendor,
    variables,
    typography,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => html`
      <locator-storybook-decorator>
        ${Story()}
      </locator-storybook-decorator>
    `,
  ],
};

export default preview;
