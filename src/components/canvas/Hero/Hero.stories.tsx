import { Meta, StoryObj } from '@storybook/preact';
import '@etchteam/diamond-ui/canvas/Card/Card';

import '@/components/content/Icon/Icon';
import '@/components/composition/Wrap/Wrap';
import './Hero';

const meta: Meta = {
  title: 'Components/Canvas/Hero',
};

export default meta;

export const Neutral: StoryObj = {
  render: () => (
    <>
      <locator-hero>
        <locator-wrap>
          <locator-icon icon="distance" />
          <h3>Searching this area...</h3>
        </locator-wrap>
      </locator-hero>
      <locator-wrap>
        <diamond-card border radius>
          <p>Overlapping content</p>
        </diamond-card>
      </locator-wrap>
    </>
  ),
};

export const Positive: StoryObj = {
  render: () => (
    <>
      <locator-hero variant="positive">
        <locator-wrap>
          <locator-icon icon="tick-circle" />
          <h3>Yes, it can be recycled!</h3>
        </locator-wrap>
      </locator-hero>
      <locator-wrap>
        <diamond-card border radius>
          <p>Overlapping content</p>
        </diamond-card>
      </locator-wrap>
    </>
  ),
};

export const Negative: StoryObj = {
  render: () => (
    <>
      <locator-hero variant="negative">
        <locator-wrap>
          <locator-icon icon="cross-circle" />
          <h3>No, it can’t be recycled!</h3>
        </locator-wrap>
      </locator-hero>
      <locator-wrap>
        <diamond-card border radius>
          <p>Overlapping content</p>
        </diamond-card>
      </locator-wrap>
    </>
  ),
};

export const Hazardous: StoryObj = {
  render: () => (
    <>
      <locator-hero variant="hazardous">
        <locator-wrap>
          <locator-icon icon="warning" />
          <h3>This is hazardous waste!</h3>
        </locator-wrap>
      </locator-hero>
      <locator-wrap>
        <diamond-card border radius>
          <p>Overlapping content</p>
        </diamond-card>
      </locator-wrap>
    </>
  ),
};
