import config from '@/config';
import { LocalAuthority } from '@/types/locatorApi';

export const LOCAL_AUTHORITY_ENDPOINT = `${config.locatorApiPath}local-authority/**`;

export const localAuthority: LocalAuthority = {
  id: 321,
  name: 'North Devon District Council',
  lastUpdate: '2024-02-07T15:47:56.064Z',
  enquiryNumber: '01271 374776',
  recyclingUri:
    'https://www.northdevon.gov.uk/bins-and-recycling/what-goes-in-your-bin-box-or-bag',
  hwrcUri: 'https://new.devon.gov.uk/wasteandrecycling/centre/seven-brethren/',
  gardenWasteUri:
    'https://www.northdevon.gov.uk/bins-and-recycling/garden-waste-green-wheelie-bin-collections',
  properties: {
    'All properties': [
      {
        name: 'All properties',
        type: 'Dry',
        containers: [
          {
            name: 'Reusable Sack',
            displayName: 'Reusable Sack',
            bodyColour: '#3cb848',
            lidColour: null,
            notes: [],
            materials: [
              {
                id: 10,
                name: 'Junk mail',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 11,
                name: 'Magazines',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 12,
                name: 'Newspapers',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 13,
                name: 'Shredded paper',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 14,
                name: 'Telephone directories',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 15,
                name: 'Window envelopes',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 52,
                name: 'Clothing',
                popular: true,
                category: {
                  id: 9,
                  name: 'Textiles',
                  popular: false,
                },
              },
              {
                id: 54,
                name: 'Shoes & bags',
                popular: false,
                category: {
                  id: 9,
                  name: 'Textiles',
                  popular: false,
                },
              },
            ],
          },
          {
            name: 'Box',
            displayName: 'Box (35 to 60L)',
            bodyColour: '#4f4f4f',
            lidColour: '#4f4f4f',
            notes: ['containers can be black or green.'],
            materials: [
              {
                id: 18,
                name: 'Aluminium foil',
                popular: false,
                category: {
                  id: 3,
                  name: 'Foil',
                  popular: false,
                },
              },
              {
                id: 19,
                name: 'Foil trays',
                popular: false,
                category: {
                  id: 3,
                  name: 'Foil',
                  popular: false,
                },
              },
              {
                id: 23,
                name: 'Aerosols',
                popular: false,
                category: {
                  id: 5,
                  name: 'Metal',
                  popular: false,
                },
              },
              {
                id: 24,
                name: 'Drinks cans',
                popular: false,
                category: {
                  id: 5,
                  name: 'Metal',
                  popular: false,
                },
              },
              {
                id: 25,
                name: 'Food tins',
                popular: false,
                category: {
                  id: 5,
                  name: 'Metal',
                  popular: false,
                },
              },
              {
                id: 26,
                name: 'Metal lids from glass jars',
                popular: false,
                category: {
                  id: 5,
                  name: 'Metal',
                  popular: false,
                },
              },
              {
                id: 42,
                name: 'Household cleaner & detergent bottles',
                popular: false,
                category: {
                  id: 7,
                  name: 'Plastic bottles',
                  popular: false,
                },
              },
              {
                id: 43,
                name: 'Plastic milk bottles',
                popular: false,
                category: {
                  id: 7,
                  name: 'Plastic bottles',
                  popular: false,
                },
              },
              {
                id: 44,
                name: 'Plastic drinks bottles',
                popular: false,
                category: {
                  id: 7,
                  name: 'Plastic bottles',
                  popular: false,
                },
              },
              {
                id: 45,
                name: 'Toiletries & shampoo bottles',
                popular: false,
                category: {
                  id: 7,
                  name: 'Plastic bottles',
                  popular: false,
                },
              },
              {
                id: 47,
                name: 'Food pots & tubs',
                popular: false,
                category: {
                  id: 8,
                  name: 'Plastic packaging',
                  popular: false,
                },
              },
              {
                id: 48,
                name: 'Margarine tubs',
                popular: false,
                category: {
                  id: 8,
                  name: 'Plastic packaging',
                  popular: false,
                },
              },
              {
                id: 50,
                name: 'Plastic trays',
                popular: false,
                category: {
                  id: 8,
                  name: 'Plastic packaging',
                  popular: false,
                },
              },
              {
                id: 51,
                name: 'Yoghurt pots',
                popular: false,
                category: {
                  id: 8,
                  name: 'Plastic packaging',
                  popular: false,
                },
              },
              {
                id: 58,
                name: 'Laptops',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 59,
                name: 'Computers',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 60,
                name: 'TVs',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 61,
                name: 'DVD/CD players',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 62,
                name: 'Hi-fi',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 63,
                name: 'Telephones/fax',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 64,
                name: 'Mobile phones',
                popular: true,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 65,
                name: 'Cameras',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 67,
                name: 'Hairdryers & electric toothbrushes',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 69,
                name: 'Electronic toys & games',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 70,
                name: 'Energy-saving light bulbs',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 71,
                name: 'Microwave',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 72,
                name: 'Table lamps',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 106,
                name: 'Set top boxes',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 107,
                name: 'Routers',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
            ],
          },
          {
            name: 'Reusable Sack',
            displayName: 'Reusable Sack',
            bodyColour: '#ad7849',
            lidColour: null,
            notes: [],
            materials: [
              {
                id: 1,
                name: 'Cardboard egg boxes',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
              {
                id: 2,
                name: 'Cardboard fruit and veg punnets',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
              {
                id: 3,
                name: 'Cardboard sleeves',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
              {
                id: 4,
                name: 'Cereal boxes',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
              {
                id: 5,
                name: 'Corrugated cardboard',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
              {
                id: 7,
                name: 'Toilet roll tubes',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
            ],
          },
          {
            name: 'Box',
            displayName: 'Box (35 to 60L)',
            bodyColour: '#2d9cdb',
            lidColour: null,
            notes: [],
            materials: [
              {
                id: 20,
                name: 'Glass bottles and jars',
                popular: true,
                category: {
                  id: 4,
                  name: 'Glass',
                  popular: false,
                },
              },
            ],
          },
        ],
        notes: null,
      },
      {
        name: 'Subscription garden scheme - open to all',
        type: 'Garden',
        containers: [
          {
            name: 'Wheeled Bin',
            displayName: 'Wheeled Bin (120L)',
            bodyColour: '#3cb848',
            lidColour: '#3cb848',
            notes: ['Subscription costs £55 from April 2023'],
            materials: [
              {
                id: 86,
                name: 'Flowers',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 87,
                name: 'Grass cuttings',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 88,
                name: 'Leaves',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 89,
                name: 'Plants',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 90,
                name: 'Prunings & twigs',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 91,
                name: 'Weeds',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 92,
                name: 'Christmas trees',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
            ],
            cost: 55,
          },
        ],
        notes:
          'Fortnightly Collections through out the year. Collections suspended Christmas week and New Years week.',
      },
      {
        name: 'All properties',
        type: 'Residual',
        containers: [
          {
            name: 'Wheeled Bin',
            displayName: 'Wheeled Bin (240L)',
            bodyColour: '#4f4f4f',
            lidColour: '#4f4f4f',
            notes: [],
          },
          {
            name: 'Non-Reusable Sack',
            displayName: 'Non-Reusable Sack',
            bodyColour: '#4f4f4f',
            lidColour: '#4f4f4f',
            notes: [],
          },
          {
            name: 'Communal Wheeled Bin',
            displayName: 'Communal Wheeled Bin (181 to 240L)',
            bodyColour: '#4f4f4f',
            lidColour: null,
            notes: [],
          },
        ],
        notes: '870 are on 140 litre wheeled bins',
      },
    ],
    'Kerbside properties': [
      {
        name: 'All kerbside properties',
        type: 'Food',
        containers: [
          {
            name: 'Kerbside Caddy',
            displayName: 'Kerbside Caddy (23L)',
            bodyColour: '#3cb848',
            lidColour: null,
            notes: [
              'Any bag accepted, bread bags, carrier bags, black bags, cereal bags.',
            ],
            materials: [
              {
                id: 93,
                name: 'Bread',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 94,
                name: 'Cakes & pastries',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 95,
                name: 'Dairy products - eggs, cheese & milk',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 96,
                name: 'Raw & cooked meat including bones',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 97,
                name: 'Raw & cooked fish including bones',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 98,
                name: 'Raw & cooked vegetables including peelings',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 99,
                name: 'Rice',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 100,
                name: 'Pasta',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 101,
                name: 'Beans & pulses',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 102,
                name: 'Uneaten food & plate scrapings',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 103,
                name: 'Tea leaves, tea bags & coffee grinds',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 104,
                name: 'Uneaten food (remove packaging)',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
            ],
            interiorColour: '#219653',
          },
          {
            name: 'Kitchen Caddy',
            displayName: 'Kitchen Caddy (7L)',
            bodyColour: '#3cb848',
            lidColour: '#3cb848',
            notes: [
              'Any bag accepted, bread bags, carrier bags, black bags, cereal bags.',
            ],
            materials: [
              {
                id: 93,
                name: 'Bread',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 94,
                name: 'Cakes & pastries',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 95,
                name: 'Dairy products - eggs, cheese & milk',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 96,
                name: 'Raw & cooked meat including bones',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 97,
                name: 'Raw & cooked fish including bones',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 98,
                name: 'Raw & cooked vegetables including peelings',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 99,
                name: 'Rice',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 100,
                name: 'Pasta',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 101,
                name: 'Beans & pulses',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 102,
                name: 'Uneaten food & plate scrapings',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 103,
                name: 'Tea leaves, tea bags & coffee grinds',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
              {
                id: 104,
                name: 'Uneaten food (remove packaging)',
                popular: false,
                category: {
                  id: 15,
                  name: 'Food waste',
                  popular: false,
                },
              },
            ],
            interiorColour: '#219653',
          },
        ],
        notes: null,
      },
      {
        name: 'All properties',
        type: 'Dry',
        containers: [
          {
            name: 'Reusable Sack',
            displayName: 'Reusable Sack',
            bodyColour: '#3cb848',
            lidColour: null,
            notes: [],
            materials: [
              {
                id: 10,
                name: 'Junk mail',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 11,
                name: 'Magazines',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 12,
                name: 'Newspapers',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 13,
                name: 'Shredded paper',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 14,
                name: 'Telephone directories',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 15,
                name: 'Window envelopes',
                popular: false,
                category: {
                  id: 2,
                  name: 'Paper',
                  popular: false,
                },
              },
              {
                id: 52,
                name: 'Clothing',
                popular: true,
                category: {
                  id: 9,
                  name: 'Textiles',
                  popular: false,
                },
              },
              {
                id: 54,
                name: 'Shoes & bags',
                popular: false,
                category: {
                  id: 9,
                  name: 'Textiles',
                  popular: false,
                },
              },
            ],
          },
          {
            name: 'Box',
            displayName: 'Box (35 to 60L)',
            bodyColour: '#4f4f4f',
            lidColour: '#4f4f4f',
            notes: ['containers can be black or green.'],
            materials: [
              {
                id: 18,
                name: 'Aluminium foil',
                popular: false,
                category: {
                  id: 3,
                  name: 'Foil',
                  popular: false,
                },
              },
              {
                id: 19,
                name: 'Foil trays',
                popular: false,
                category: {
                  id: 3,
                  name: 'Foil',
                  popular: false,
                },
              },
              {
                id: 23,
                name: 'Aerosols',
                popular: false,
                category: {
                  id: 5,
                  name: 'Metal',
                  popular: false,
                },
              },
              {
                id: 24,
                name: 'Drinks cans',
                popular: false,
                category: {
                  id: 5,
                  name: 'Metal',
                  popular: false,
                },
              },
              {
                id: 25,
                name: 'Food tins',
                popular: false,
                category: {
                  id: 5,
                  name: 'Metal',
                  popular: false,
                },
              },
              {
                id: 26,
                name: 'Metal lids from glass jars',
                popular: false,
                category: {
                  id: 5,
                  name: 'Metal',
                  popular: false,
                },
              },
              {
                id: 42,
                name: 'Household cleaner & detergent bottles',
                popular: false,
                category: {
                  id: 7,
                  name: 'Plastic bottles',
                  popular: false,
                },
              },
              {
                id: 43,
                name: 'Plastic milk bottles',
                popular: false,
                category: {
                  id: 7,
                  name: 'Plastic bottles',
                  popular: false,
                },
              },
              {
                id: 44,
                name: 'Plastic drinks bottles',
                popular: false,
                category: {
                  id: 7,
                  name: 'Plastic bottles',
                  popular: false,
                },
              },
              {
                id: 45,
                name: 'Toiletries & shampoo bottles',
                popular: false,
                category: {
                  id: 7,
                  name: 'Plastic bottles',
                  popular: false,
                },
              },
              {
                id: 47,
                name: 'Food pots & tubs',
                popular: false,
                category: {
                  id: 8,
                  name: 'Plastic packaging',
                  popular: false,
                },
              },
              {
                id: 48,
                name: 'Margarine tubs',
                popular: false,
                category: {
                  id: 8,
                  name: 'Plastic packaging',
                  popular: false,
                },
              },
              {
                id: 50,
                name: 'Plastic trays',
                popular: false,
                category: {
                  id: 8,
                  name: 'Plastic packaging',
                  popular: false,
                },
              },
              {
                id: 51,
                name: 'Yoghurt pots',
                popular: false,
                category: {
                  id: 8,
                  name: 'Plastic packaging',
                  popular: false,
                },
              },
              {
                id: 58,
                name: 'Laptops',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 59,
                name: 'Computers',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 60,
                name: 'TVs',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 61,
                name: 'DVD/CD players',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 62,
                name: 'Hi-fi',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 63,
                name: 'Telephones/fax',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 64,
                name: 'Mobile phones',
                popular: true,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 65,
                name: 'Cameras',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 67,
                name: 'Hairdryers & electric toothbrushes',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 69,
                name: 'Electronic toys & games',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 70,
                name: 'Energy-saving light bulbs',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 71,
                name: 'Microwave',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 72,
                name: 'Table lamps',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 106,
                name: 'Set top boxes',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
              {
                id: 107,
                name: 'Routers',
                popular: false,
                category: {
                  id: 10,
                  name: 'Electricals',
                  popular: false,
                },
              },
            ],
          },
          {
            name: 'Reusable Sack',
            displayName: 'Reusable Sack',
            bodyColour: '#ad7849',
            lidColour: null,
            notes: [],
            materials: [
              {
                id: 1,
                name: 'Cardboard egg boxes',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
              {
                id: 2,
                name: 'Cardboard fruit and veg punnets',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
              {
                id: 3,
                name: 'Cardboard sleeves',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
              {
                id: 4,
                name: 'Cereal boxes',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
              {
                id: 5,
                name: 'Corrugated cardboard',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
              {
                id: 7,
                name: 'Toilet roll tubes',
                popular: false,
                category: {
                  id: 1,
                  name: 'Cardboard',
                  popular: false,
                },
              },
            ],
          },
          {
            name: 'Box',
            displayName: 'Box (35 to 60L)',
            bodyColour: '#2d9cdb',
            lidColour: null,
            notes: [],
            materials: [
              {
                id: 20,
                name: 'Glass bottles and jars',
                popular: true,
                category: {
                  id: 4,
                  name: 'Glass',
                  popular: false,
                },
              },
            ],
          },
        ],
        notes: null,
      },
      {
        name: 'Subscription garden scheme - open to all',
        type: 'Garden',
        containers: [
          {
            name: 'Wheeled Bin',
            displayName: 'Wheeled Bin (120L)',
            bodyColour: '#3cb848',
            lidColour: '#3cb848',
            notes: ['Subscription costs £55 from April 2023'],
            materials: [
              {
                id: 86,
                name: 'Flowers',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 87,
                name: 'Grass cuttings',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 88,
                name: 'Leaves',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 89,
                name: 'Plants',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 90,
                name: 'Prunings & twigs',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 91,
                name: 'Weeds',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
              {
                id: 92,
                name: 'Christmas trees',
                popular: false,
                category: {
                  id: 14,
                  name: 'Garden waste',
                  popular: false,
                },
              },
            ],
            cost: 55,
          },
        ],
        notes:
          'Fortnightly Collections through out the year. Collections suspended Christmas week and New Years week.',
      },
      {
        name: 'All properties',
        type: 'Residual',
        containers: [
          {
            name: 'Wheeled Bin',
            displayName: 'Wheeled Bin (240L)',
            bodyColour: '#4f4f4f',
            lidColour: '#4f4f4f',
            notes: [],
          },
          {
            name: 'Non-Reusable Sack',
            displayName: 'Non-Reusable Sack',
            bodyColour: '#4f4f4f',
            lidColour: '#4f4f4f',
            notes: [],
          },
          {
            name: 'Communal Wheeled Bin',
            displayName: 'Communal Wheeled Bin (181 to 240L)',
            bodyColour: '#4f4f4f',
            lidColour: null,
            notes: [],
          },
        ],
        notes: '870 are on 140 litre wheeled bins',
      },
    ],
  },
};
