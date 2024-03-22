import { StoryObj } from '@storybook/preact';

import MaterialSearchInputComponent from './MaterialSearchInput';

const meta = {
  title: 'Components/Control/MaterialSearchInput',
  component: MaterialSearchInputComponent,
};

export default meta;

export const MaterialSearchInput: StoryObj = {
  render: () => (
    <form>
      <label htmlFor="custom-material-input">
        What do you need to recycle?
      </label>
      <MaterialSearchInputComponent
        inputId="custom-material-input"
        placeholder="Enter the name of an item..."
      ></MaterialSearchInputComponent>
    </form>
  ),
};
