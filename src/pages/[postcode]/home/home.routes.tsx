import { RouteObject } from 'react-router-dom';

import HomeRecyclingLayout from './home.layout';
import homeRecyclingLoader from './home.loader';
import HomeRecyclingPage from './home.page';

const routes: RouteObject[] = [
  {
    path: '/:postcode/home',
    element: <HomeRecyclingLayout />,
    loader: homeRecyclingLoader,
    children: [{ index: true, element: <HomeRecyclingPage /> }],
  },
];

export default routes;
