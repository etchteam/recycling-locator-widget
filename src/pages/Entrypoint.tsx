import { Suspense } from 'preact/compat';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import '../lib/i18n';

import NotFound from './404.js';
import StartPage from './Start.js';

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<StartPage />} errorElement={NotFound} />,
  ),
);

/**
 * Jobs of the entrypoint:
 * - Load up the router
 * - Setup the start page routes
 * - Lazily register sub routes
 * - Initialise i18n (using suspense to wait for them to load in)
 */
export default function Entrypoint() {
  return (
    <Suspense fallback={<h2>loading...</h2>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
