export const GEOCODE_ENDPOINT =
  'https://geocode.search.hereapi.com/v1/geocode**';

export const GuernseyGeocodeResponse = {
  items: [
    {
      title: 'Guernsey',
      id: 'here:cm:namedplace:20496348',
      resultType: 'administrativeArea',
      administrativeAreaType: 'country',
      address: {
        label: 'Guernsey',
        countryCode: 'GGY',
        countryName: 'Guernsey',
      },
      position: {
        lat: 49.4571,
        lng: -2.53517,
      },
      scoring: {
        queryScore: 1,
        fieldScore: {
          country: 1,
        },
      },
    },
  ],
};

export const PostcodeGeocodeResponse = {
  items: [
    {
      title: 'EX32 7RB Weirside Way, Barnstaple, United Kingdom',
      id: 'here:af:streetsection:FMk-86TlRvmsnBTWfBjU-A:EAMyCGV4MzJ8N3Ji',
      resultType: 'postalCodePoint',
      address: {
        label: 'EX32 7RB Weirside Way, Barnstaple, United Kingdom',
        countryCode: 'GBR',
        countryName: 'United Kingdom',
        state: 'England',
        countyCode: 'DEV',
        county: 'Devon',
        city: 'Barnstaple',
        district: 'Barnstaple',
        street: 'Weirside Way',
        postalCode: 'EX32 7RB',
      },
      position: {
        lat: 51.08674,
        lng: -4.04845,
      },
      access: [
        {
          lat: 51.08674,
          lng: -4.04845,
        },
      ],
      mapView: {
        west: -4.05024,
        south: 51.08562,
        east: -4.04666,
        north: 51.08786,
      },
      scoring: {
        queryScore: 1,
        fieldScore: {
          postalCode: 1,
        },
      },
    },
  ],
};
