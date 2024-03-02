import { RouteObject } from 'react-router-dom';

import PlacesErrorPage from './error.page';
import PlacesLayout from './places.layout';
import placesLoader from './places.loader';
import PlacesPage from './places.page';

const routes: RouteObject[] = [
  {
    path: '/:postcode/places',
    loader: placesLoader,
    id: 'places',
    errorElement: <PlacesErrorPage />,
    element: <PlacesLayout />,
    children: [
      {
        children: [
          {
            index: true,
            element: <PlacesPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
