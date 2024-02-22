import { Meta, StoryObj } from '@storybook/preact';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/content/ContainerSvg/ContainerSvg';
import './Container';

const meta: Meta = {
  title: 'Components/Composition/Container',
};

export default meta;

export const Container: StoryObj = {
  render: () => (
    <>
      <locator-container>
        <locator-container-svg
          name="Wheeled Bin"
          lid-colour="black"
          body-colour="pink"
        ></locator-container-svg>
        Blue Box (35 to 60L)
      </locator-container>
      <locator-container>
        <locator-container-svg name="Box"></locator-container-svg>
        Blue Box (35 to 60L)
      </locator-container>
      <locator-container>
        <locator-container-svg name="Kitchen Caddy"></locator-container-svg>
        Blue Box (35 to 60L)
      </locator-container>
    </>
  ),
};
