import { RouteObject } from 'react-router-dom';

import HomeRecyclingContactPage from './contact.page';
import HomeRecyclingLayout from './home.layout';
import homeRecyclingLoader from './home.loader';
import HomeRecyclingPage from './home.page';
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
      },
      {
        path: 'contact',
        element: <HomeRecyclingContactPage />,
      },
    ],
  },
];

export default routes;
