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
import AboutPage from './Start/About';
import StartLayout from './Start/Layout';
import StartPage from './Start/Start';

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route element={<StartLayout />} errorElement={NotFound}>
      <Route path="/" element={<StartPage />} />
      <Route path="/about" element={<AboutPage />} />
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
