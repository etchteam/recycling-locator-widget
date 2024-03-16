import { Meta, StoryObj } from '@storybook/preact';

import LogoComponent from './Logo';

const meta: Meta = {
  component: LogoComponent,
};

export default meta;

export const Logo: StoryObj = {
  render: () => <locator-logo></locator-logo>,
};

export const LogoOnly: StoryObj = {
  render: () => <locator-logo type="logo-only"></locator-logo>,
};
