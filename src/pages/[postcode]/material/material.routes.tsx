import { RouteObject } from 'react-router-dom';

import postcodeAction from '../postcode.action';

import MaterialErrorPage from './error.page';
import MaterialLayout from './material.layout';
import materialLoader from './material.loader';
import MaterialPage from './material.page';
import materialSearchLoader from './search.loader';
import MaterialSearchPage from './search.page';

const routes: RouteObject[] = [
  {
    path: '/:postcode/material',
    element: <MaterialLayout />,
    children: [
      {
        index: true,
        element: <MaterialPage />,
        loader: materialLoader,
        errorElement: <MaterialErrorPage />,
      },
      {
        path: 'search',
        element: <MaterialSearchPage />,
        action: postcodeAction,
        loader: materialSearchLoader,
        errorElement: <MaterialErrorPage />,
      },
    ],
  },
];

export default routes;
