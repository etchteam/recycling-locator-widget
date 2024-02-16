import { RouteObject } from 'react-router-dom';

import NotFoundPage from './not-found.page';
import startAction from './start.action';
import StartPage from './start.page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <StartPage />,
    action: startAction,
    errorElement: <NotFoundPage />,
  },
];

export default routes;
