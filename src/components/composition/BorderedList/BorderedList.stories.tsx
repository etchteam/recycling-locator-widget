import { Meta, StoryObj } from '@storybook/preact';

import './BorderedList';

const meta: Meta = {
  title: 'Components/BorderedList',
};

export default meta;

export const BorderedList: StoryObj = {
  render: () => (
    <locator-bordered-list>
      <ul role="list">
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    </locator-bordered-list>
  ),
};
