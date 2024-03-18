import { RouteObject } from 'react-router-dom';

import PlacesErrorPage from './error.page';
import PlacesMapPage from './map.page';
import PlaceDetailsPage from './place/details.page';
import PlaceErrorPage from './place/error.page';
import PlaceLayout from './place/place.layout';
import placeLoader from './place/place.loader';
import PlacePage from './place/place.page';
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
    children: [
      {
        element: <PlacesLayout />,
        errorElement: <PlacesErrorPage />,
        children: [
          {
            index: true,
            element: <PlacesPage />,
          },
          {
            path: 'map',
            element: <PlacesMapPage />,
          },
        ],
      },
      {
        path: 'search',
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
    ],
  },
  {
    // TODO(WRAP-207): Move to /:postcode/places/:id
    path: '/:postcode/places/:placeName/:placePostcode',
    element: <PlaceLayout />,
    errorElement: <PlaceErrorPage />,
    loader: placeLoader,
    id: 'place',
    children: [
      {
        index: true,
        element: <PlacePage />,
      },
      {
        path: 'details',
        element: <PlaceDetailsPage />,
      },
    ],
  },
];

export default routes;
