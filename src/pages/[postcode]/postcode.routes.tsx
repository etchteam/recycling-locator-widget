import { RouteObject } from 'react-router-dom';

import NotFoundPage from '@/pages/not-found.page';

import homeRecyclingRoutes from './home/home.routes';
import materialRoutes from './material/material.routes';
import postcodeAction from './postcode.action';
import postcodeLoader from './postcode.loader';
import PostcodePage from './postcode.page';

const routes: RouteObject[] = [
  {
    path: '/:postcode',
    id: 'postcode',
    element: <PostcodePage />,
    action: postcodeAction,
    loader: postcodeLoader,
    errorElement: <NotFoundPage />,
  },
  ...materialRoutes,
  ...homeRecyclingRoutes,
];

export default routes;
