import config from '@/config';

interface WidgetApiRequestOptions {
  method?: 'get' | 'post';
  body?: FormData;
}

export default class WidgetApi {
  static async request<T>(
    url: string,
    options: WidgetApiRequestOptions,
  ): Promise<T> {
    const response = await fetch(`${config.widgetApiPath}${url}`, {
      headers: {
        'X-Requested-With': config.packageVersion,
      },
      ...options,
    });
    return response.json();
  }

  static async get<T>(url: string): Promise<T> {
    return WidgetApi.request<T>(url, { method: 'get' });
  }

  static async post<T>(url: string, body: FormData): Promise<T> {
    return WidgetApi.request<T>(url, { method: 'post', body });
  }
}
