import { Meta, StoryObj } from '@storybook/preact';

import './NavBar';

const meta: Meta = {
  title: 'Components/Control/NavBar',
};

export default meta;

export const NavBar: StoryObj = {
  render: () => (
    <locator-nav-bar>
      <nav>
        <ul>
          <li>
            <a href="#tab-1" aria-current="page">
              Link 1
            </a>
          </li>
          <li>
            <a href="#tab-2">Link 2</a>
          </li>
          <li>
            <a href="#tab-3">Link 3</a>
          </li>
        </ul>
      </nav>
    </locator-nav-bar>
  ),
};
