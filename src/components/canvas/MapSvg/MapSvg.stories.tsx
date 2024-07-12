import { Meta, StoryObj } from '@storybook/preact';

import MapSvgComponent from './MapSvg';

const meta: Meta = {
  title: 'Components/Canvas/MapSvg',
};

export default meta;

export const MapSvg: StoryObj = {
  render: () => <MapSvgComponent>Applies svg map background</MapSvgComponent>,
};
