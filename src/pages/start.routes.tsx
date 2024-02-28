import { RouteObject } from 'react-router-dom';

import HomeRecyclingStartPage from './home-recycling.page';
import NotFoundPage from './not-found.page';
import startAction, { homeRecyclingStartAction } from './start.action';
import StartPage from './start.page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <StartPage />,
    action: startAction,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/home-recycling',
    element: <HomeRecyclingStartPage />,
    action: homeRecyclingStartAction,
    errorElement: <NotFoundPage />,
  },
];

export default routes;
