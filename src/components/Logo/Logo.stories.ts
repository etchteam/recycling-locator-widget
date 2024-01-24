import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './Logo';

const meta: Meta = {
  component: 'locator-logo',
};

export default meta;

export const Logo: StoryObj = {
  render: () => html`<locator-logo></locator-logo>`,
};
