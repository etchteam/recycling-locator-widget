import { RouteObject } from 'react-router-dom';

import MaterialLayout from './material.layout';
import MaterialPage from './material.page';

const routes: RouteObject[] = [
  {
    path: '/:postcode/material',
    element: <MaterialLayout />,
    children: [{ index: true, element: <MaterialPage /> }],
  },
];

export default routes;
