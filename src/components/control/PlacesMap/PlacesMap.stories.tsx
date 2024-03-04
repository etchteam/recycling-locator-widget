import { StoryObj } from '@storybook/preact';

import PlacesMapComponent from './PlacesMap';

const meta = {
  title: 'Components/Control/PlacesMap',
  component: PlacesMapComponent,
};

export default meta;

const mockLocations = {
  latitude: 51.08668193341878,
  longitude: -4.048432293180724,
  items: [
    {
      id: 108711,
      distance: 0,
      name: 'Baby Sensory North Devon',
      address: '46 Weirside Way, Barnstaple, EX32 7RB',
      latitude: 51.0867,
      longitude: -4.04858,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 81254,
      distance: 0.14,
      name: 'Frank Marsh Stores',
      address:
        'Frank Marsh Stores, 1 Churchill Close, Devon, Barnstaple, EX32 7HJ',
      latitude: 51.0847,
      longitude: -4.04801,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 89404,
      distance: 0.18,
      name: 'Co-op',
      address: '23 St Georges Road, Devon, Barnstaple, EX32 7AU',
      latitude: 51.0856,
      longitude: -4.05232,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 100568,
      distance: 0.18,
      name: 'Salvation Army Clothing Donation Bank',
      address:
        "Co-op Store (TCG), Reusable Items Only, 23 St George's Road, Barnstaple, EX32 7AU",
      latitude: 51.0856,
      longitude: -4.05232,
      materials: [
        {
          category: 'textiles',
          code: 'tx100',
          name: 'All Textiles',
        },
        {
          category: 'textiles',
          code: 'tx200',
          name: 'Clothes',
        },
        {
          category: 'textiles',
          code: 'tx300',
          name: 'Household Linen',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 22875,
      distance: 0.4,
      name: 'North Devon District Hospital',
      address: 'Raleigh Heights, Barnstaple, EX31 4JB',
      latitude: 51.0922,
      longitude: -4.05116,
      materials: [
        {
          category: 'metals',
          code: 'mt100',
          name: 'Aluminium Foil',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 78945,
      distance: 0.62,
      name: 'Wilkinsons',
      address: 'Unit 5, Green Lanes Shopping Centre, Barnstaple, EX31 1UG',
      latitude: 51.0819,
      longitude: -4.06061,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 104936,
      distance: 0.63,
      name: 'Primark Barnstaple',
      address: '49 - 52 High Street, Barnstaple, England, EX31 1DB',
      latitude: 51.08215,
      longitude: -4.061168,
      materials: [
        {
          category: 'textiles',
          code: 'tx100',
          name: 'All Textiles',
        },
        {
          category: 'textiles',
          code: 'tx200',
          name: 'Clothes',
        },
        {
          category: 'textiles',
          code: 'tx300',
          name: 'Household Linen',
        },
        {
          category: 'textiles',
          code: 'tx400',
          name: 'Shoes',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 82380,
      distance: 0.63,
      name: 'Primark',
      address: 'Primark, 49-52 Highstreet, Barnstable, EX31 1DB',
      latitude: 51.08215,
      longitude: -4.061168,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 81267,
      distance: 0.64,
      name: 'Game',
      address: 'Game, 40 High Street, Devon, Barnstaple, EX31 1BZ',
      latitude: 51.0817,
      longitude: -4.06091,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 82475,
      distance: 0.64,
      name: 'Rymans',
      address: 'Rymans, 40/40a High Street, Devon, Barnstaple, EX31 1BZ',
      latitude: 51.0817,
      longitude: -4.06091,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 100569,
      distance: 0.64,
      name: 'Salvation Army Clothing Donation Bank',
      address:
        'Salvation Army Barnstaple Corps, Reusable Items Only, Oakleigh Road, Barnstaple, EX32 8JT',
      latitude: 51.0779,
      longitude: -4.05318,
      materials: [
        {
          category: 'textiles',
          code: 'tx100',
          name: 'All Textiles',
        },
        {
          category: 'textiles',
          code: 'tx200',
          name: 'Clothes',
        },
        {
          category: 'textiles',
          code: 'tx300',
          name: 'Household Linen',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 85653,
      distance: 0.66,
      name: 'Costa Coffee',
      address: '75 High Street, Barnstaple, EX31 1HX',
      latitude: 51.0809,
      longitude: -4.06073,
      materials: [
        {
          category: 'other',
          code: 'ms850',
          name: 'Disposable Coffee Cups',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 92280,
      distance: 0.66,
      name: 'Marks and Spencers',
      address: '78 High Street, Devon, Barnstaple, EX31 1HX',
      latitude: 51.0809,
      longitude: -4.06073,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
        {
          category: 'textiles',
          code: 'tx100',
          name: 'All Textiles',
        },
        {
          category: 'textiles',
          code: 'tx200',
          name: 'Clothes',
        },
        {
          category: 'textiles',
          code: 'tx300',
          name: 'Household Linen',
        },
        {
          category: 'textiles',
          code: 'tx400',
          name: 'Shoes',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 84228,
      distance: 0.66,
      name: 'Superdrug',
      address: 'Superdrug, 65-67 High Street, Devon, Barnstaple, EX31 1HX',
      latitude: 51.0809,
      longitude: -4.06073,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 59462,
      distance: 0.66,
      name: 'Tesco',
      address: 'Barnstaple, 58 High Street, Barnstaple, EX31 1JB',
      latitude: 51.0819,
      longitude: -4.06171,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 98501,
      distance: 0.7,
      name: "Barnardo's",
      address: '89 High Street, Barnstaple, Devon, Barnstaple, EX31 1HR',
      latitude: 51.0795,
      longitude: -4.05979,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 96309,
      distance: 0.7,
      name: 'Caffe Nero - Barnstaple',
      address: '27 High Street, Barnstaple, EX31 1HR',
      latitude: 51.0795,
      longitude: -4.05979,
      materials: [
        {
          category: 'other',
          code: 'ms850',
          name: 'Disposable Coffee Cups',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 84899,
      distance: 0.71,
      name: 'WHSmiths',
      address: 'WHSmiths, 76 High Street, Devon, Barnstaple, EX31 1HP',
      latitude: 51.0789,
      longitude: -4.05909,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 97441,
      distance: 0.77,
      name: "McDonald's - BARNSTAPLE - EASTERN AVE",
      address: 'Eastern Avenue, Hollowtree Road, Devon, Barnstaple, EX32 8PB',
      latitude: 51.0757,
      longitude: -4.04598,
      materials: [
        {
          category: 'other',
          code: 'ms850',
          name: 'Disposable Coffee Cups',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 100564,
      distance: 0.92,
      name: 'Salvation Army Clothing Donation Bank',
      address:
        'ASDA Store, Reusable Items Only, Anchorwood Retail Park, Taw Wharf, Barnstaple, EX31 2BN',
      latitude: 51.0779,
      longitude: -4.0644,
      materials: [
        {
          category: 'textiles',
          code: 'tx100',
          name: 'All Textiles',
        },
        {
          category: 'textiles',
          code: 'tx200',
          name: 'Clothes',
        },
        {
          category: 'textiles',
          code: 'tx300',
          name: 'Household Linen',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 107139,
      distance: 1.01,
      name: 'Newbery Recycling Ltd',
      address: 'Anchor Mill, Braunton Road, Barnstaple, EX31 1GB',
      latitude: 51.0847,
      longitude: -4.07151,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 70327,
      distance: 1.04,
      name: 'Barnstaple Travis Perkins',
      address: 'Seven Brethren Bank, Sticklepath, Barnstaple, Devon, EX31 2AS',
      latitude: 51.0733,
      longitude: -4.05966,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 84138,
      distance: 1.04,
      name: 'SUEZ - Seven Brethren HWRC',
      address:
        'SUEZ - Seven Brethren HWRC, Seven Brethren Industrial Esta, Barnstaple, Devon, Sticklepath, EX31 2AS',
      latitude: 51.0733,
      longitude: -4.05966,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: true,
    },
    {
      id: 100563,
      distance: 1.04,
      name: 'Salvation Army Clothing Donation Bank',
      address:
        'Tesco Extra, Reusable Items Only, Barnstaple Retail Park, Station Road, Barnstaple, EX31 2AS',
      latitude: 51.0733,
      longitude: -4.05966,
      materials: [
        {
          category: 'textiles',
          code: 'tx100',
          name: 'All Textiles',
        },
        {
          category: 'textiles',
          code: 'tx200',
          name: 'Clothes',
        },
        {
          category: 'textiles',
          code: 'tx300',
          name: 'Household Linen',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 106011,
      distance: 1.04,
      name: 'Seven Brethren Recycling Centre',
      address: 'Barnstaple, Barnstaple, EX31 2AS',
      latitude: 51.0733,
      longitude: -4.05966,
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
      data_source: 'valpak',
      is_hwrc: true,
    },
    {
      id: 50413,
      distance: 1.04,
      name: 'Seven Brethren Recycling Centre',
      address:
        'Seven Brethren Recycling Centre, Severn Bretheren Ind Estate, Barnstaple, EX31 2AS',
      latitude: 51.0733,
      longitude: -4.05966,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: true,
    },
    {
      id: 92977,
      distance: 1.04,
      name: 'Tesco Car Park',
      address: 'Barnstaple Retail Park, Barnstaple, EX31 2AS',
      latitude: 51.0733,
      longitude: -4.05966,
      materials: [
        {
          category: 'glass',
          code: 'gl100',
          name: 'Glass Bottles and Jars',
        },
        {
          category: 'metals',
          code: 'mt200',
          name: 'Aluminium Cans',
        },
        {
          category: 'metals',
          code: 'mt300',
          name: 'Mixed Metal Cans',
        },
        {
          category: 'metals',
          code: 'mt600',
          name: 'Steel Cans',
        },
        {
          category: 'paper',
          code: 'pp400',
          name: 'Newspapers',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 62463,
      distance: 1.05,
      name: 'Barnstaple Wickes',
      address:
        'Eastern Avenue, Whiddon Valley Industrial Estate, Barnstaple, Devon, Barnstaple, EX32 8NX',
      latitude: 51.0734,
      longitude: -4.03673,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 71319,
      distance: 1.05,
      name: 'Wickes Barnstaple',
      address: 'Eastern Avenue, Barnstaple, Devon, EX32 8NX',
      latitude: 51.0734,
      longitude: -4.03673,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
    {
      id: 59470,
      distance: 1.08,
      name: 'Tesco',
      address: 'Barnstaple, Rose Lane, Barnstaple, EX32 8PG',
      latitude: 51.0728,
      longitude: -4.03711,
      materials: [
        {
          category: 'batteries',
          code: 'ba200',
          name: 'Household Batteries',
        },
      ],
      data_source: 'valpak',
      is_hwrc: false,
    },
  ],
};

export const PlacesMap: StoryObj = {
  render: () => (
    <PlacesMapComponent
      latitude={mockLocations.latitude}
      longitude={mockLocations.longitude}
      locations={mockLocations.items}
    />
  ),
};
