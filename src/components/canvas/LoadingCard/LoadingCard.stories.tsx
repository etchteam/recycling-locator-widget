import { Meta, StoryObj } from '@storybook/preact';

import './LoadingCard';

const meta: Meta = {
  title: 'Components/Canvas/LoadingCard',
};

export default meta;

export const LoadingCard: StoryObj = {
  render: () => <locator-loading-card></locator-loading-card>,
};
