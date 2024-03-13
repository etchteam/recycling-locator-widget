import i18n from 'i18next';

import config from '@/config';
import { Locale } from '@/types/locale';

interface LocatorApiRequestOptions {
  method?: 'get' | 'post';
  body?: FormData;
}

export default class LocatorApi {
  static async request<T>(
    url: string,
    options: LocatorApiRequestOptions,
  ): Promise<T> {
    const locale = i18n.language as Locale;
    const response = await fetch(`${config.locatorApiPath}${url}`, {
      headers: {
        'X-Requested-With': config.packageVersion,
        'Accept-Language': locale === 'cy' ? 'cy' : 'en-GB',
      },
      ...options,
    });
    return response.json();
  }

  static async get<T>(url: string): Promise<T> {
    return LocatorApi.request<T>(url, { method: 'get' });
  }

  static async post<T>(url: string, body: FormData): Promise<T> {
    return LocatorApi.request<T>(url, { method: 'post', body });
  }
}
