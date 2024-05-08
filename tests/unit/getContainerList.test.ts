import { describe, expect, test } from 'vitest';

import getContainerList, { searchContainerList } from '@/lib/getContainerList';
import { LocalAuthorityProperty } from '@/types/locatorApi';

const flowersMaterialMock = {
  id: '86',
  name: 'Flowers',
  popular: false,
  category: {
    id: '14',
    name: 'Garden waste',
    popular: false,
    materials: [],
  },
};

const aluminiumFoilMaterialMock = {
  id: '18',
  name: 'Aluminium foil',
  popular: false,
  category: {
    id: '3',
    name: 'Foil',
    popular: false,
    materials: [],
  },
};

const mock: LocalAuthorityProperty[] = [
  {
    name: 'Kerbside Properties - Aylesbury area',
    type: 'Dry',
    containers: [
      {
        name: 'Box',
        displayName: 'Box',
        bodyColour: 'Blue',
        lidColour: 'Blue',
        materials: [aluminiumFoilMaterialMock],
      },
      {
        name: 'Wheeled Bin',
        displayName: 'Wheeled Bin',
        bodyColour: 'Red',
        lidColour: 'Green',
      },
    ],
  },
  {
    name: 'Communal Properties - Chiltern area',
    type: 'Dry',
    containers: [
      {
        name: 'Box',
        displayName: 'Box',
        bodyColour: 'Blue',
        lidColour: 'Blue',
        materials: [aluminiumFoilMaterialMock],
      },
    ],
  },
  {
    name: 'All Properties with Gardens - Aylesbury area',
    type: 'Garden',
    containers: [
      {
        name: 'Wheeled Bin',
        displayName: 'Wheeled Bin',
        bodyColour: 'Green',
        lidColour: 'Green',
        materials: [flowersMaterialMock],
      },
      {
        name: 'Wheeled Bin',
        displayName: 'Wheeled Bin',
        bodyColour: 'Green',
        lidColour: 'Green',
        materials: [flowersMaterialMock],
      },
    ],
  },
  {
    name: 'Gardens',
    type: 'Garden',
    containers: [
      {
        name: 'Wheeled Bin',
        displayName: 'Wheeled Bin',
        bodyColour: 'Green',
        lidColour: 'Green',
        materials: [flowersMaterialMock],
      },
    ],
  },
];

describe('getContainerList', () => {
  test('Returns a list of containers in the expected format', () => {
    expect(getContainerList(mock)).toEqual({
      Dry: [mock[0], mock[1]],
      Garden: [mock[3].containers[0]],
    });
  });
});

describe('searchContainerList', () => {
  const mockContainerList = getContainerList(mock);

  test('Empty searches return the original containerList', () => {
    expect(searchContainerList(mockContainerList)).toEqual({
      containerList: mockContainerList,
    });
  });

  test('Search returns containerList of containers with matching materials', () => {
    expect(searchContainerList(mockContainerList, 'Aluminium foil')).toEqual({
      containerList: {
        Dry: [{ ...mock[0], containers: [mock[0].containers[0]] }, mock[1]],
      },
      containerCount: 2,
      searchResult: 'positive',
    });

    expect(searchContainerList(mockContainerList, 'Flowers')).toEqual({
      containerList: {
        Dry: [],
        Garden: [mock[3].containers[0]],
      },
      containerCount: 1,
      searchResult: 'positive',
    });
  });

  test('Negative search returns the original containerList with a negative searchResult', () => {
    expect(searchContainerList(mockContainerList, 'Bananas')).toEqual({
      containerList: mockContainerList,
      containerCount: 0,
      searchResult: 'negative',
    });
  });
});
