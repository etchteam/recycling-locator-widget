import { Meta, StoryObj } from '@storybook/preact';

import './ContextHeader';

const meta: Meta = {
  title: 'Components/Canvas/ContextHeader',
};

export default meta;

export const ContextHeader: StoryObj = {
  render: () => <locator-context-header>Context Header</locator-context-header>,
};
