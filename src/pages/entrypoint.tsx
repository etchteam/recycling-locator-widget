import { Suspense } from 'preact/compat';
import {
  createMemoryRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import { i18nInit } from '@/lib/i18n';
import { Locale } from '@/types/locale';

import Postcode, {
  postcodeAction,
  postcodeLoader,
} from './start/[postcode]/index';
import PostcodeLayout from './start/[postcode]/layout';
import About from './start/about';
import StartLayout from './start/layout';
import Location, { locationAction } from './start/location/index';
import LocationLayout from './start/location/layout';

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route element={<StartLayout />}>
      <Route path="/" element={<LocationLayout />}>
        <Route index element={<Location />} action={locationAction} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="/:postcode" element={<PostcodeLayout />}>
        <Route
          index
          element={<Postcode />}
          loader={postcodeLoader}
          action={postcodeAction}
        />
        <Route path="/:postcode/about" element={<About />} />
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
