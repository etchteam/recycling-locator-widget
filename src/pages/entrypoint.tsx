import { Suspense } from 'preact/compat';
import {
  createMemoryRouter,
  RouterProvider,
  RouteObject,
  createBrowserRouter,
} from 'react-router-dom';

import '@/lib/sentry';
import { RecyclingLocatorAttributes } from '@/index';
import { i18nInit } from '@/lib/i18n';

import postcodeRoutes from './[postcode]/postcode.routes';
import ErrorPage from './error.page';
import NotFoundPage from './not-found.page';
import startAction from './start.action';
import startRoutes from './start.routes';

const routes: RouteObject[] = [
  {
    errorElement: <ErrorPage />,
    children: [
      ...startRoutes,
      ...postcodeRoutes,
      {
        path: '/*',
        element: <NotFoundPage />,
        action: startAction,
      },
    ],
  },
];

/**
 * Jobs of the entrypoint:
 * - Load up the router
 * - Setup the start page routes
 * - Lazily register sub routes
 * - Init i18n (using suspense to wait for them to load in)
 * - Init Sentry
 */
export default function Entrypoint({
  locale,
  variant,
  basename,
}: Readonly<RecyclingLocatorAttributes>) {
  i18nInit(locale);

  const router =
    variant === 'standalone'
      ? createBrowserRouter(routes, { basename })
      : createMemoryRouter(routes);

  return (
    <Suspense fallback={<h2>loading...</h2>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
