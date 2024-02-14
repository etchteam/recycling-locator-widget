import { StoryObj } from '@storybook/preact';

import MaterialSearchInputComponent from './MaterialSearchInput';

const meta = {
  component: MaterialSearchInputComponent,
};

export default meta;

export const MaterialSearchInput: StoryObj = {
  render: () => (
    <>
      <label htmlFor="custom-material-input">
        What do you need to recycle?
      </label>
      <locator-material-search-input
        inputId="custom-material-input"
        placeholder="Enter the name of an item..."
      ></locator-material-search-input>
    </>
  ),
};
