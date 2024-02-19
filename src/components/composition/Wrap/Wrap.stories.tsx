import { Meta, StoryObj } from '@storybook/preact';

import './Wrap';

const meta: Meta = {
  title: 'Components/Composition/Wrap',
};

export default meta;

export const Wrap: StoryObj = {
  render: () => (
    <locator-wrap>
      <div style="border:1px solid black">
        Wrapped content with fluidly scaling max width
      </div>
    </locator-wrap>
  ),
};
