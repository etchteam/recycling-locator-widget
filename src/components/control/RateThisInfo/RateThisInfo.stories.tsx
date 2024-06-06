import { Meta, StoryObj } from '@storybook/preact';

import RateThisInfoComponent from './RateThisInfo';

const meta: Meta = {
  title: 'Components/Control/RateThisInfo',
  component: RateThisInfoComponent,
};

export default meta;

export const RateThisInfo: StoryObj = {
  render: () => {
    return <RateThisInfoComponent />;
  },
};
