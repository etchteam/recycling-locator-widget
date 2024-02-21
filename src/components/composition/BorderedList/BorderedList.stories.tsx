import { Meta, StoryObj } from '@storybook/preact';

import './BorderedList';

const meta: Meta = {
  title: 'Components/Composition/BorderedList',
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

export const SmallWithListHeader: StoryObj = {
  render: () => (
    <locator-bordered-list size="sm">
      <h3>Header</h3>
      <ul role="list">
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    </locator-bordered-list>
  ),
};
