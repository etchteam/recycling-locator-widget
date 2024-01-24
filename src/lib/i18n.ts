import i18n from 'i18next';
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  // load translation using http -> see /public/translations
  // https://github.com/i18next/i18next-http-backend
  .use(HttpBackend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init<HttpBackendOptions>({
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/translations/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
