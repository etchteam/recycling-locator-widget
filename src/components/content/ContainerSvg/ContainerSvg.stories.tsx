import { Meta, StoryObj } from '@storybook/preact';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/content/Icon/Icon';
import './ContainerSvg';

const meta: Meta = {
  title: 'Components/Content/ContainerSvg',
};

export default meta;

export const ContainerSvg: StoryObj = {
  render: () => (
    <locator-container-svg
      name="Wheeled Bin"
      lid-colour="black"
      body-colour="pink"
    ></locator-container-svg>
  ),
};
