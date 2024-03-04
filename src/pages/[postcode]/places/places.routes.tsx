import { RouteObject } from 'react-router-dom';

import PlacesErrorPage from './error.page';
import PlacesLayout from './places.layout';
import placesLoader from './places.loader';
import PlacesPage from './places.page';
import popularSearchLoader from './search/popular.loader';
import PlacesSearchPopularPage from './search/popular.page';
import placesSearchAction from './search/search.action';
import PlacesSearchLayout from './search/search.layout';
import PlacesSearchPage from './search/search.page';

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
  {
    path: '/:postcode/places/search',
    element: <PlacesSearchLayout />,
    errorElement: <PlacesErrorPage />,
    children: [
      {
        index: true,
        element: <PlacesSearchPage />,
        action: placesSearchAction,
      },
      {
        path: 'popular',
        element: <PlacesSearchPopularPage />,
        loader: popularSearchLoader,
      },
    ],
  },
];

export default routes;
