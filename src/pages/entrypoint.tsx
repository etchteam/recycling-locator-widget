import { Suspense } from 'preact/compat';
import {
  createMemoryRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import { i18nInit } from '@/lib/i18n';
import { postcodeLoader } from '@/lib/loaders/postcode';
import { Locale } from '@/types/locale';

import PostcodePage, { postcodeAction } from './[postcode]/index';

import IndexPage, { indexAction } from './index';

const router = createMemoryRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<IndexPage />} action={indexAction} />
      <Route
        path="/:postcode"
        id="postcode"
        element={<PostcodePage />}
        action={postcodeAction}
        loader={postcodeLoader}
      />
    </>,
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
