import { Meta, StoryObj } from '@storybook/preact';

import './Header';

const meta: Meta = {
  title: 'Components/Composition/Header',
};

export default meta;

export const Header: StoryObj = {
  render: () => (
    <locator-header>
      <div style="border:1px solid black">Flex header</div>
      <div style="border:1px solid black">With gap</div>
    </locator-header>
  ),
};
