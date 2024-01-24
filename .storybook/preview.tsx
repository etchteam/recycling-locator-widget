import type { Preview } from '@storybook/web-components';

import '@etchteam/diamond-ui/styles/base.css';

import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { variables } from '../src/styles/variables';
import { diamondUi } from '../src/styles/diamond-ui';

/**
 * Wraps storybook stories with global styling in the same way as they are applied to the widget
 */
@customElement('locator-storybook-decorator')
export class StorybookDecorator extends LitElement {
  static styles = [
    variables,
    diamondUi,
    css`
      :host {
        display: block;
        container-type: inline-size;
      }
    `
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
