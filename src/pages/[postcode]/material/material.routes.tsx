import { RouteObject } from 'react-router-dom';

import postcodeAction from '../postcode.action';

import MaterialLayout from './material.layout';
import MaterialPage from './material.page';
import NotFoundPage from './not-found.page';

const routes: RouteObject[] = [
  {
    path: '/:postcode/material',
    element: <MaterialLayout />,
    children: [
      { index: true, element: <MaterialPage /> },
      { path: 'not-found', element: <NotFoundPage />, action: postcodeAction },
    ],
  },
];

export default routes;
