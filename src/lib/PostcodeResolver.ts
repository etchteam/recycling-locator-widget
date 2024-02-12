import type { service } from '@here/maps-api-for-javascript';

import config from '../config';

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

  private static extractPostcodeFromString(
    locationOrPostcode: string,
  ): string | null {
    const matches = locationOrPostcode.match(
      /(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})/i,
    );

    if (!matches) {
      return null;
    }

    return matches[0].toUpperCase().replace(/ /g, '');
  }

  static async fromLatLng(lat: number, lng: number): Promise<string> {
    // var url = config.widgetRoutePrefix + '/postcode/' +
    //   encodeURIComponent(latitude) + ',' +
    //   encodeURIComponent(longitude) +
    //   (window.location.hostname === 'localhost' ? '' : '?callback=?');
    // $.getJSON({
    //   url: url
    // }).done(function(data) {
    //   if (data.error && data.error == 'Not Found') {
    //     deferred.reject(resolver.ERROR_POSTCODE_NOT_FOUND);
    //   } else if (data.error) {
    //     deferred.reject(resolver.ERROR_SEARCH_FAILED);
    //   } else {
    //     deferred.resolve(data.postcode);
    //   }
    // }).fail(function() {
    //   deferred.reject(resolver.ERROR_SEARCH_FAILED);
    // });
    return `${lat} ${lng}`;
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
