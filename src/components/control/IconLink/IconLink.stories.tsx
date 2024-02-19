import { Meta, StoryObj } from '@storybook/preact';

import '@/components/content/Icon/Icon';
import './IconLink';

const meta: Meta = {
  title: 'Components/Control/IconLink',
};

export default meta;

export const IconLink: StoryObj = {
  render: () => (
    <locator-icon-link>
      <a href="#id">
        <locator-icon icon="pin" />
        Nearest places to recycle
      </a>
    </locator-icon-link>
  ),
};
