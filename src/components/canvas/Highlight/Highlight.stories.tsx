import { Meta, StoryObj } from '@storybook/preact';

import './Highlight';

const meta: Meta = {
  title: 'Components/Canvas/Highlight',
};

export default meta;

export const Highlight: StoryObj = {
  render: () => <locator-highlight>Highlighted text</locator-highlight>,
};

export const Info: StoryObj = {
  render: () => (
    <locator-highlight className="theme-info">Info text</locator-highlight>
  ),
};

export const Positive: StoryObj = {
  render: () => (
    <locator-highlight className="theme-positive">
      Positive text
    </locator-highlight>
  ),
};

export const Negative: StoryObj = {
  render: () => (
    <locator-highlight className="theme-negative">
      Negative text
    </locator-highlight>
  ),
};
