import { Meta, StoryObj } from '@storybook/preact';

import './MapSvg';

const meta: Meta = {
  title: 'Components/MapSvg',
};

export default meta;

export const MapSvg: StoryObj = {
  render: () => <locator-map-svg>Applies svg map background</locator-map-svg>,
};
