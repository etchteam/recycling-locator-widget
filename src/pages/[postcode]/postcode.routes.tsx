import { RouteObject } from 'react-router-dom';

import NotFoundPage from '@/pages/not-found.page';

import homeRecyclingRoutes from './home/home.routes';
import materialRoutes from './material/material.routes';
import postcodeAction from './postcode.action';
import postcodeLoader from './postcode.loader';
import PostcodePage from './postcode.page';

const routes: RouteObject[] = [
  {
    errorElement: <NotFoundPage />,
    // This loader validates the postcode for all child routes
    loader: postcodeLoader,
    id: 'postcode',
    children: [
      {
        path: '/:postcode',
        element: <PostcodePage />,
        action: postcodeAction,
      },
      ...materialRoutes,
      ...homeRecyclingRoutes,
    ],
  },
];

export default routes;
