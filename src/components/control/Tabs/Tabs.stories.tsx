import { Meta, StoryObj } from '@storybook/preact';

import './Tabs';

const meta: Meta = {
  title: 'Components/Control/Tabs',
};

export default meta;

export const Tabs: StoryObj = {
  render: () => (
    <locator-tabs>
      <nav>
        <ul>
          <li>
            <a href="#tab-1" aria-current="page">
              Tab 1
            </a>
          </li>
          <li>
            <a href="#tab-2">Tab 2</a>
          </li>
          <li>
            <a href="#tab-3">Tab 3</a>
          </li>
        </ul>
      </nav>
    </locator-tabs>
  ),
};
