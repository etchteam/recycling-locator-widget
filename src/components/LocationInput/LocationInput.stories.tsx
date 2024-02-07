import { Meta, StoryObj } from '@storybook/preact';

import LocationInputComponent from './LocationInput';

const meta: Meta = {
  component: LocationInputComponent,
};

export default meta;

export const LocationInput: StoryObj = {
  render: () => (
    <>
      <label htmlFor="location-input">Where are you?</label>
      <locator-location-input></locator-location-input>
    </>
  ),
};
