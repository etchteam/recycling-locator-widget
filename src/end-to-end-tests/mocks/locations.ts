import config from '@/config';
import { LocationsResponse as LocationsResponseType } from '@/types/locatorApi';

export const LOCATIONS_ENDPOINT = `${config.locatorApiPath}locations/**`;

export const LocationsResponse: LocationsResponseType = {
  items: [
    {
      id: 85347,
      distance: 22.47,
      name: 'Dulverton Recycling Centre',
      address: 'Brushford Road, Dulverton, Somerset, Dulverton, TA22 9AA',
      latitude: 51.0294,
      longitude: -3.53963,
      materials: [
        {
          category: 'automotive',
          code: 'ba100',
          name: 'Car Batteries',
        },
        {
          category: 'automotive',
          code: 'cr100',
          name: 'Tyres',
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
          category: 'construction and building materials',
          code: 'cn100',
          name: 'Bricks',
        },
        {
          category: 'construction and building materials',
          code: 'cn550',
          name: 'Plasterboard',
        },
        {
          category: 'construction and building materials',
          code: 'cn500',
          name: 'Wood',
        },
        {
          category: 'electricals',
          code: 'we460',
          name: 'Air Conditioners',
        },
        {
          category: 'electricals',
          code: 'we360',
          name: 'Calculators',
        },
        {
          category: 'electricals',
          code: 'we160',
          name: 'Cameras, Video Cameras',
        },
        {
          category: 'electricals',
          code: 'we740',
          name: 'Clocks',
        },
        {
          category: 'electricals',
          code: 'we310',
          name: 'Computers',
        },
        {
          category: 'electricals',
          code: 'we430',
          name: 'Cookers, Ovens',
        },
        {
          category: 'electricals',
          code: 'we200',
          name: 'Electrical Tools',
        },
        {
          category: 'electricals',
          code: 'we200',
          name: 'Electrical Tools',
        },
        {
          category: 'electricals',
          code: 'we810',
          name: 'Electrical Toys',
        },
        {
          category: 'electricals',
          code: 'we350',
          name: 'Electrical Typewriters',
        },
        {
          category: 'electricals',
          code: 'we370',
          name: 'Fax Machines',
        },
        {
          category: 'electricals',
          code: 'we410',
          name: 'Fridges and Freezers',
        },
        {
          category: 'electricals',
          code: 'we820',
          name: 'Games Console',
        },
        {
          category: 'electricals',
          code: 'we730',
          name: 'Hair Dryers',
        },
        {
          category: 'electricals',
          code: 'we300',
          name: 'IT Equipment',
        },
        {
          category: 'electricals',
          code: 'we300',
          name: 'IT Equipment',
        },
        {
          category: 'electricals',
          code: 'we400',
          name: 'Large Household Appliances',
        },
        {
          category: 'electricals',
          code: 'we400',
          name: 'Large Household Appliances',
        },
        {
          category: 'electricals',
          code: 'we440',
          name: 'Microwaves',
        },
        {
          category: 'electricals',
          code: 'we320',
          name: 'Mobile Phones',
        },
        {
          category: 'electricals',
          code: 'we340',
          name: 'Printers, Copying Equipment',
        },
        {
          category: 'electricals',
          code: 'we150',
          name: 'Radios',
        },
        {
          category: 'electricals',
          code: 'we173',
          name: 'Routers',
        },
        {
          category: 'electricals',
          code: 'we171',
          name: 'Set top boxes',
        },
        {
          category: 'electricals',
          code: 'we220',
          name: 'Sewing Machines',
        },
        {
          category: 'electricals',
          code: 'we700',
          name: 'Small Household Appliances',
        },
        {
          category: 'electricals',
          code: 'we700',
          name: 'Small Household Appliances',
        },
        {
          category: 'electricals',
          code: 'we700',
          name: 'Small Household Appliances',
        },
        {
          category: 'electricals',
          code: 'we610',
          name: 'Smoke Detectors',
        },
        {
          category: 'electricals',
          code: 'we510',
          name: 'Table and Floor Lamps',
        },
        {
          category: 'electricals',
          code: 'we130',
          name: 'Televisions',
        },
        {
          category: 'electricals',
          code: 'we720',
          name: 'Toasters',
        },
        {
          category: 'electricals',
          code: 'we120',
          name: 'TV and Computer Screens',
        },
        {
          category: 'electricals',
          code: 'we710',
          name: 'Vacuum Cleaners',
        },
        {
          category: 'electricals',
          code: 'we420',
          name: 'Washing Machines',
        },
        {
          category: 'garden waste',
          code: 'cm300',
          name: 'Christmas Trees',
        },
        {
          category: 'garden waste',
          code: 'cm100',
          name: 'Garden Waste',
        },
        {
          category: 'garden waste',
          code: 'cn200',
          name: 'Soil',
        },
        {
          category: 'glass',
          code: 'gl100',
          name: 'Glass Bottles and Jars',
        },
        {
          category: 'glass',
          code: 'gl100',
          name: 'Glass Bottles and Jars',
        },
        {
          category: 'glass',
          code: 'gl100',
          name: 'Glass Bottles and Jars',
        },
        {
          category: 'glass',
          code: 'gl100',
          name: 'Glass Bottles and Jars',
        },
        {
          category: 'liquids and chemicals',
          code: 'lq200',
          name: 'Cooking Oils',
        },
        {
          category: 'liquids and chemicals',
          code: 'lq100',
          name: 'Engine Oil',
        },
        {
          category: 'liquids and chemicals',
          code: 'lq500',
          name: 'Gas Bottles',
        },
        {
          category: 'liquids and chemicals',
          code: 'lq300',
          name: 'Household Cleaning Fluids',
        },
        {
          category: 'liquids and chemicals',
          code: 'lq400',
          name: 'Paint',
        },
        {
          category: 'liquids and chemicals',
          code: 'lq400',
          name: 'Paint',
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
          code: 'we330',
          name: 'Toner, Printer Cartridges',
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
          category: 'plastic',
          code: 'pl940',
          name: 'Plant pots',
        },
        {
          category: 'plastic',
          code: 'pl100',
          name: 'Plastic Bottles',
        },
        {
          category: 'plastic',
          code: 'pl300',
          name: 'Plastic HDPE 2 (milk bottles)',
        },
        {
          category: 'plastic',
          code: 'pl200',
          name: 'Plastic PET 1 (plastic bottles)',
        },
        {
          category: 'plastic',
          code: 'pl600',
          name: 'Plastic PS 6 (foam meat trays, plastic cutlery)',
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
      is_hwrc: true,
    },
  ],
  latitude: 51.08668193341878,
  longitude: -4.048432293180724,
};
