import config from '../config';

export default class WidgetApi {
  static async request(url: string) {
    const response = await fetch(url, {
      headers: {
        'X-Requested-With': config.packageVersion,
      },
    });
    return response.json();
  }
}
