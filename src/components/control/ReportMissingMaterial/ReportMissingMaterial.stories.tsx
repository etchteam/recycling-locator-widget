import { Meta, StoryObj } from '@storybook/preact';

import ReportMissingMaterialComponent from './ReportMissingMaterial';

const meta: Meta = {
  title: 'Components/Control/ReportMissingMaterial',
  component: ReportMissingMaterialComponent,
};

export default meta;

export const ReportMissingMaterial: StoryObj = {
  render: () => {
    return <ReportMissingMaterialComponent missingMaterial="Rice crispies" />;
  },
};
