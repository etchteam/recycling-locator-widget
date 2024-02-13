import type { service } from '@here/maps-api-for-javascript';

import config from '../config';

import WidgetApi from './WidgetApi';

interface HereMapsGeocodeResponse {
  items: {
    address: {
      city: string;
      countryName: string;
    };
    position: {
      lat: number;
      lng: number;
    };
  }[];
}

interface WidgetApiPostcodeResponse {
  error?: string;
  postcode?: string;
}

export default class PostCodeResolver {
  static readonly ERROR_POSTCODE_NOT_FOUND = 'Postcode not found';
  static readonly ERROR_SEARCH_FAILED = 'Search failed';
  static readonly NOT_IN_UK = 'Not in the UK';

  static async getGeocodeData(
    location: string,
  ): Promise<HereMapsGeocodeResponse> {
    const { default: H } = await import(
      // @ts-expect-error TS can't find the maps types
      '@here/maps-api-for-javascript/bin/mapsjs.bundle'
    );
    const apikey = config.mapsPlacesKey;
    const platform = new H.service.Platform({ apikey });
    const service = platform.getSearchService() as service.GeocodingService;
    return await new Promise((resolve, reject) => {
      service.geocode({ q: location }, resolve, reject);
    });
  }

  /**
   * Return a url safe postcode
   */
  static formatPostcode(postcode: string): string {
    return postcode.replace(/ /g, '').toUpperCase();
  }

  /**
   * Geo code only returns a partial postcode.
   * Resolve the lat/lng to get the full postcode.
   */
  static async fromLatLng(lat: number, lng: number): Promise<string> {
    const safeLat = encodeURIComponent(lat);
    const safeLng = encodeURIComponent(lng);
    const response = await WidgetApi.request<WidgetApiPostcodeResponse>(
      `${config.widgetApiPath}postcode/${safeLat},${safeLng}`,
    );

    if (response.error || !response.postcode) {
      throw Error(
        response.error === 'Not Found'
          ? PostCodeResolver.ERROR_POSTCODE_NOT_FOUND
          : PostCodeResolver.ERROR_SEARCH_FAILED,
      );
    }

    return PostCodeResolver.formatPostcode(response.postcode);
  }

  /**
   * Get a valid UK postcode from a location
   */
  static async fromString(location: string): Promise<string> {
    const geocode = await PostCodeResolver.getGeocodeData(location);

    if (geocode?.items?.length === 0) {
      throw new Error(PostCodeResolver.ERROR_SEARCH_FAILED);
    }

    const { countryName } = geocode.items[0].address;
    const { lat, lng } = geocode.items[0].position;

    if (countryName.toLowerCase() !== 'united kingdom') {
      throw new Error(PostCodeResolver.NOT_IN_UK);
    }

    return PostCodeResolver.fromLatLng(lat, lng);
  }
}
