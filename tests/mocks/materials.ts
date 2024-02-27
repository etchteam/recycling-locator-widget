import config from '@/config';
import { Material } from '@/types/locatorApi';

export const MATERIALS_ENDPOINT = `${config.locatorApiPath}materials?**`;

export const ValidMaterialsResponse: Material[] = [
  {
    id: 43,
    name: 'Plastic milk bottles',
    popular: false,
  },
];

export const EmptyMaterialsResponse = [];
