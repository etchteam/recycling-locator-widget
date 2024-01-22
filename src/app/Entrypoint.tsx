import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import NotFound from './404.js';
import StartPage from './Start.js';

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<StartPage />} errorElement={NotFound} />,
  ),
);

/**
 * Jobs of the entrypoint:
 * - Wrap the global styles
 * - Load up the router
 * - Setup the start page routes
 * - Lazily register sub routes
 */
export default function Entrypoint() {
  return (
    <>
      <h1>The Widget</h1>
      <RouterProvider router={router} />
    </>
  );
}
