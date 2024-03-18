import { StoryObj } from '@storybook/preact';

import LocationInputComponent from './LocationInput';

const meta = {
  title: 'Components/Control/LocationInput',
  component: LocationInputComponent,
};

export default meta;

export const LocationInput: StoryObj = {
  render: () => (
    <>
      <label htmlFor="custom-location-input">Where are you?</label>
      <LocationInputComponent
        input-id="custom-location-input"
        placeholder="Enter a town or postcode..."
      ></LocationInputComponent>
    </>
  ),
};
