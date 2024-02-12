import type { service } from '@here/maps-api-for-javascript';

import config from '../config';

import WidgetApi from './WidgetApi';

interface HereMapsGeocodeResponse {
  items: {
    position: {
      lat: number;
      lng: number;
    };
  }[];
}

export default class PostCodeResolver {
  private static ERROR_POSTCODE_NOT_FOUND = 'Postcode not found';
  private static ERROR_SEARCH_FAILED = 'Search failed';

  private static async getLatLng(
    location: string,
  ): Promise<{ lat: number; lng: number }> {
    const { default: H } = await import(
      // @ts-expect-error TS can't find the maps types
      '@here/maps-api-for-javascript/bin/mapsjs.bundle'
    );
    const apikey = config.mapsPlacesKey;
    const platform = new H.service.Platform({ apikey });
    const service = platform.getSearchService() as service.GeocodingService;
    const result: HereMapsGeocodeResponse = await new Promise(
      (resolve, reject) => {
        service.geocode({ q: location }, resolve, reject);
      },
    );

    if (result?.items?.length === 0) {
      throw new Error(PostCodeResolver.ERROR_SEARCH_FAILED);
    }

    return result.items[0].position;
  }

  private static formatPostcode(postcode: string): string {
    return postcode.replace(/ /g, '').toUpperCase();
  }

  private static extractPostcodeFromString(
    locationOrPostcode: string,
  ): string | null {
    const matches = locationOrPostcode.match(
      /(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})/i,
    );

    if (!matches) {
      return null;
    }

    return PostCodeResolver.formatPostcode(matches[0]);
  }

  static async fromLatLng(lat: number, lng: number): Promise<string> {
    // window.location.hostname === 'localhost' ? '' : '?callback=?'
    const safeLat = encodeURIComponent(lat);
    const safeLng = encodeURIComponent(lng);
    const response = await WidgetApi.request(
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

  static async fromString(locationOrPostcode: string): Promise<string> {
    const postcode =
      PostCodeResolver.extractPostcodeFromString(locationOrPostcode);

    if (postcode) {
      return postcode;
    }

    const { lat, lng } = await PostCodeResolver.getLatLng(locationOrPostcode);
    return PostCodeResolver.fromLatLng(lat, lng);
  }
}
