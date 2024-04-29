import { Meta, StoryObj } from '@storybook/preact';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import './Container';

const meta: Meta = {
  title: 'Components/Composition/Container',
};

export default meta;

export const Container: StoryObj = {
  render: () => (
    <diamond-grid wrap="wrap">
      <diamond-grid-item small-mobile="12">
        <locator-container>
          <locator-container-svg
            name="Communal Wheeled Bin"
            label="locator-container-svg doesn't need to be inside a locator-container"
            body-colour="red"
            lid-colour="black"
          ></locator-container-svg>
        </locator-container>
      </diamond-grid-item>
      <diamond-grid-item small-mobile="12">
        <locator-container>
          <locator-container-svg
            name="Wheeled Bin"
            lid-colour="black"
            body-colour="pink"
          ></locator-container-svg>
          <locator-container-content>
            <locator-container-name>
              <h4>Named box</h4>
            </locator-container-name>
          </locator-container-content>
        </locator-container>
      </diamond-grid-item>
      <diamond-grid-item small-mobile="12">
        <locator-container>
          <locator-container-svg
            body-colour="#2d9cdb"
            lid-colour="#2d9cdb"
            name="Box"
          ></locator-container-svg>
          <locator-container-content>
            <locator-container-name>Paid for box</locator-container-name>
          </locator-container-content>
        </locator-container>
      </diamond-grid-item>
      <diamond-grid-item small-mobile="12">
        <locator-container>
          <locator-container-svg
            body-colour="#2d9cdb"
            name="Kitchen Caddy"
          ></locator-container-svg>
          <locator-container-content>
            <locator-container-name>
              Kitchen caddy with notes
            </locator-container-name>
          </locator-container-content>
        </locator-container>
      </diamond-grid-item>
      <diamond-grid-item small-mobile="12">
        <locator-container>
          <locator-container-svg
            body-colour="#2d9cdb"
            name="Kitchen Caddy"
          ></locator-container-svg>
          <locator-container-content>
            <locator-container-name>
              Paid for kitchen caddy with notes
            </locator-container-name>
          </locator-container-content>
        </locator-container>
      </diamond-grid-item>
    </diamond-grid>
  ),
};
