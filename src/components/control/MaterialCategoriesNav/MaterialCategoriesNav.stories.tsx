import { Meta, StoryObj } from '@storybook/preact';

import { MaterialCategory } from '@/types/locatorApi';

import MaterialCategoriesNavComponent from './MaterialCategoriesNav';

const meta: Meta = {
  title: 'Components/Control/MaterialCategoriesNav',
  component: MaterialCategoriesNavComponent,
};

export default meta;

export const MaterialCategoriesNav: StoryObj = {
  render: () => {
    const materialCategories: MaterialCategory[] = [
      {
        id: '1',
        name: 'Automotive',
        materials: [
          { id: '1', name: 'Tyres' },
          { id: '2', name: 'Car batteries' },
          { id: '3', name: 'Engine oil' },
        ],
      },
      {
        id: '2',
        name: 'Cardboard',
        materials: [
          { id: '4', name: 'Cardboard boxes' },
          { id: '5', name: 'Cardboard tubes' },
          { id: '6', name: 'Cardboard trays' },
        ],
      },
    ];

    return (
      <MaterialCategoriesNavComponent
        basePath="#"
        materialCategories={materialCategories}
      />
    );
  },
};
