import { RouteObject } from 'react-router-dom';

import HomeRecyclingStartPage from './home-recycling.page';
import MaterialStartPage from './material.page';
import NotFoundPage from './not-found.page';
import startAction, {
  homeRecyclingStartAction,
  materialStartAction,
} from './start.action';
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
  {
    path: '/material',
    element: <MaterialStartPage />,
    action: materialStartAction,
    errorElement: <NotFoundPage />,
  },
];

export default routes;
