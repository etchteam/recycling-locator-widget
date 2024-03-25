import config from '@/config';
import { LocationsResponse as LocationsResponseType } from '@/types/locatorApi';

export const LOCATIONS_ENDPOINT = `${config.locatorApiPath}locations/**`;

export const LocationsResponse: LocationsResponseType = {
  items: [
    {
      id: '106011',
      distance: 0.42,
      name: 'Seven Brethren Recycling Centre',
      address: 'Barnstaple, Barnstaple, EX31 2AS',
      latitude: 51.0733,
      longitude: -4.05966,
      locations: [
        {
          materials: [
            {
              category: 'automotive',
              code: 'ba100',
              name: 'Car Batteries',
            },
            {
              category: 'batteries',
              code: 'ba200',
              name: 'Household Batteries',
            },
            {
              category: 'cardboard',
              code: 'cb100',
              name: 'Cardboard',
            },
            {
              category: 'electricals',
              code: 'we410',
              name: 'Fridges and Freezers',
            },
            {
              category: 'electricals',
              code: 'we400',
              name: 'Large Household Appliances',
            },
            {
              category: 'electricals',
              code: 'we700',
              name: 'Small Household Appliances',
            },
            {
              category: 'electricals',
              code: 'we510',
              name: 'Table and Floor Lamps',
            },
            {
              category: 'electricals',
              code: 'we120',
              name: 'TV and Computer Screens',
            },
            {
              category: 'garden waste',
              code: 'cm100',
              name: 'Garden Waste',
            },
            {
              category: 'glass',
              code: 'gl100',
              name: 'Glass Bottles and Jars',
            },
            {
              category: 'glass',
              code: 'gl800',
              name: 'Sheet/Plate Glass',
            },
            {
              category: 'liquids and chemicals',
              code: 'lq200',
              name: 'Cooking Oils',
            },
            {
              category: 'metals',
              code: 'mt400',
              name: 'Aerosol Cans',
            },
            {
              category: 'metals',
              code: 'mt200',
              name: 'Aluminium Cans',
            },
            {
              category: 'metals',
              code: 'mt100',
              name: 'Aluminium Foil',
            },
            {
              category: 'metals',
              code: 'mt300',
              name: 'Mixed Metal Cans',
            },
            {
              category: 'metals',
              code: 'mt500',
              name: 'Mixed Scrap Metal',
            },
            {
              category: 'metals',
              code: 'mt600',
              name: 'Steel Cans',
            },
            {
              category: 'other',
              code: 'ms905',
              name: 'Mattresses',
            },
            {
              category: 'other',
              code: 'we330',
              name: 'Toner, Printer Cartridges',
            },
            {
              category: 'other',
              code: 'ms600',
              name: 'Upholstered Furniture',
            },
            {
              category: 'paper',
              code: 'pp600',
              name: 'Food and Drink Cartons',
            },
            {
              category: 'paper',
              code: 'pp300',
              name: 'Greeting Cards',
            },
            {
              category: 'paper',
              code: 'pp400',
              name: 'Newspapers',
            },
            {
              category: 'paper',
              code: 'pp500',
              name: 'Phone Directories',
            },
            {
              category: 'paper',
              code: 'pp700',
              name: 'Shredded Paper',
            },
            {
              category: 'plastic',
              code: 'pl100',
              name: 'Plastic Bottles',
            },
            {
              category: 'plastic',
              code: 'pl600',
              name: 'Plastic PS 6 (foam meat trays, plastic cutlery)',
            },
            {
              category: 'textiles',
              code: 'tx100',
              name: 'All Textiles',
            },
          ],
          source: 'valpak',
          locationType: 'HWRC',
        },
      ],
    },
  ],
  meta: {
    latitude: 51.07872831826983,
    longitude: -4.05529069017698,
    radius: 25,
  },
  pagination: {
    total: 30,
    page: 1,
  },
};
