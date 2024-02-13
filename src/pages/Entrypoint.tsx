import { Suspense } from 'preact/compat';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { i18nInit } from '../lib/i18n';
import { Locale } from '../types/locale';

import NotFound from './404';
import AboutPage from './start/About';
import StartIndexPage from './start/Index';
import StartLayout from './start/Layout';
import LocationForm, { locationFormAction } from './start/LocationForm';
import PostcodeIndexPage from './start/[postcode]/Index';
import PostcodeMenu from './start/[postcode]/Menu';

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route element={<StartLayout />} errorElement={<NotFound />}>
      <Route path="/" element={<StartIndexPage />}>
        <Route index element={<LocationForm />} action={locationFormAction} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
      <Route path="/:postcode" element={<PostcodeIndexPage />}>
        <Route index element={<PostcodeMenu />} />
        <Route path="/:postcode/about" element={<AboutPage />} />
      </Route>
    </Route>,
  ),
);

/**
 * Jobs of the entrypoint:
 * - Load up the router
 * - Setup the start page routes
 * - Lazily register sub routes
 * - Initialise i18n (using suspense to wait for them to load in)
 */
export default function Entrypoint({ locale }: { readonly locale: Locale }) {
  i18nInit(locale);

  return (
    <Suspense fallback={<h2>loading...</h2>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
