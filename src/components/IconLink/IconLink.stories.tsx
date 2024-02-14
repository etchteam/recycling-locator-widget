import { Meta, StoryObj } from '@storybook/preact';

import '../Icon/Icon';
import './IconLink';

const meta: Meta = {
  title: 'Components/IconLink',
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
