import type { service } from '@here/maps-api-for-javascript';

import config from '@/config';
import { PostcodeResponse } from '@/types/widgetApi';

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

export default class PostCodeResolver {
  static readonly ERROR_POSTCODE_NOT_FOUND = 'Postcode not found';
  static readonly ERROR_SEARCH_FAILED = 'Search failed';
  static readonly ERROR_NOT_IN_UK = 'Not in the UK';
  static readonly POSTCODE_REGEX =
    /(GIR ?0AA|[A-PR-UWYZ](\d{1,2}|([A-HK-Y]\d([\dABEHMNPRV-Y])?)|\d[A-HJKPS-UW]) ?\d[ABD-HJLNP-UW-Z]{2})/i;

  static async getValidGeocodeData(
    location: string,
  ): Promise<HereMapsGeocodeResponse> {
    console.log(location);
    const { default: H } = await import(
      // @ts-expect-error TS can't find the maps types
      '@here/maps-api-for-javascript/bin/mapsjs.bundle'
    );
    const apikey = config.mapsPlacesKey;
    const platform = new H.service.Platform({ apikey });
    const service = platform.getSearchService() as service.GeocodingService;
    const geocode: HereMapsGeocodeResponse = await new Promise(
      (resolve, reject) => {
        service.geocode({ q: location }, resolve, reject);
      },
    );

    if (geocode?.items?.length === 0) {
      throw new Error(PostCodeResolver.ERROR_SEARCH_FAILED);
    }

    const { countryName } = geocode.items[0].address;

    if (countryName.toLowerCase() !== 'united kingdom') {
      throw new Error(PostCodeResolver.ERROR_NOT_IN_UK);
    }

    return geocode;
  }

  static extractPostcodeFromString(locationOrPostcode: string): string | null {
    const matches = PostCodeResolver.POSTCODE_REGEX.exec(locationOrPostcode);

    if (!matches) {
      return null;
    }

    return PostCodeResolver.formatPostcode(matches[0]);
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
    const response = await WidgetApi.get<PostcodeResponse>(
      `postcode/${safeLat},${safeLng}`,
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
   * Take a location string then:
   * 1. Test it’s a valid UK address
   * 2. If the location contains a postcode return it
   * 3. If the location does not contain a postcode use the lat/lng to get the postcode
   */
  static async fromString(location: string): Promise<string> {
    const geocode = await PostCodeResolver.getValidGeocodeData(location);

    const extractedPostcode =
      PostCodeResolver.extractPostcodeFromString(location);

    if (extractedPostcode) {
      return extractedPostcode;
    }

    const { lat, lng } = geocode.items[0].position;

    return PostCodeResolver.fromLatLng(lat, lng);
  }
}
