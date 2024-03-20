import { Meta, StoryObj } from '@storybook/preact';

import FooterComponent from './Footer';

const meta: Meta = {
  title: 'Components/Content/Footer',
  component: FooterComponent,
};

export default meta;

export const Footer: StoryObj = {
  render: () => <FooterComponent />,
};
