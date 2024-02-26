import { RouteObject } from 'react-router-dom';

import HomeRecyclingContactPage from './contact.page';
import HomeRecyclingLayout from './home.layout';
import homeRecyclingLoader from './home.loader';
import HomeRecyclingPage from './home.page';
import homeRecyclingCentreLoader from './recycling-centre.loader';
import HomeRecyclingCentrePage from './recycling-centre.page';

const routes: RouteObject[] = [
  {
    path: '/:postcode/home',
    element: <HomeRecyclingLayout />,
    loader: homeRecyclingLoader,
    id: 'home-recycling',
    children: [
      { index: true, element: <HomeRecyclingPage /> },
      {
        path: 'recycling-centre',
        element: <HomeRecyclingCentrePage />,
        loader: homeRecyclingCentreLoader,
      },
      {
        path: 'contact',
        element: <HomeRecyclingContactPage />,
      },
    ],
  },
];

export default routes;
