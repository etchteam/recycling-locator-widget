import config from '@/config';

interface WidgetApiRequestOptions {
  method?: 'get' | 'post';
  body?: FormData;
}

export default class WidgetApi {
  static async request(
    url: string,
    options: WidgetApiRequestOptions,
  ): Promise<any> {
    const response = await fetch(`${config.widgetApiPath}${url}`, {
      headers: {
        'X-Requested-With': config.packageVersion,
      },
      ...options,
    });
    return response.json();
  }

  static async get<T>(url: string): Promise<T> {
    return WidgetApi.request(url, { method: 'get' });
  }

  static async post<T>(url: string, body: FormData): Promise<T> {
    return WidgetApi.request(url, { method: 'post', body });
  }
}
