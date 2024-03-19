import config from '@/config';
import { Material } from '@/types/locatorApi';

export const MATERIALS_ENDPOINT = `${config.locatorApiPath}materials`;
export const POPULAR_MATERIALS_ENDPOINT = `${config.locatorApiPath}materials?popular=true`;

export const ValidMaterialsResponse: Material[] = [
  {
    id: 43,
    name: 'Plastic milk bottles',
    popular: false,
  },
];

export const EmptyMaterialsResponse = [];

export const PopularMaterialsResponse: Material[] = [
  {
    id: 45,
    name: 'Plastic pots, tubs and trays',
    popular: true,
  },
];
