import { ComponentChildren } from 'preact';
import { useTranslation } from 'react-i18next';
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/composition/Wrap/Wrap';
import '@/components/content/HeaderTitle/HeaderTitle';
import '@/components/content/Icon/Icon';
import '@/components/control/NavBar/NavBar';
import '@/components/canvas/MapSvg/MapSvg';
import PlacesMap from '@/components/control/PlacesMap/PlacesMap';
import directions from '@/lib/directions';
import useAnalytics from '@/lib/useAnalytics';

import { PlaceLoaderResponse } from './place.loader';

export default function PlaceLayout({
  children,
}: {
  readonly children?: ComponentChildren;
}) {
  const { t } = useTranslation();
  const { postcode, placeName, placePostcode } = useParams();
  const loaderData = useRouteLoaderData('place') as PlaceLoaderResponse;
  const { recordEvent } = useAnalytics();
  const location = loaderData?.location;
  const safePlaceName = encodeURIComponent(placeName);

  return (
    <locator-layout>
      <locator-header slot="layout-header">
        <locator-header-logo>
          <Link to={`/${postcode}`}>
            <locator-logo type="logo-only"></locator-logo>
          </Link>
        </locator-header-logo>
        <locator-header-content>
          <locator-header-title>
            <diamond-button>
              <Link to={`/${postcode}/places`}>
                <locator-icon icon="arrow-left" label="Back"></locator-icon>
              </Link>
            </diamond-button>
            <div>
              <h2>{placeName}</h2>
              <p>{placePostcode}</p>
            </div>
          </locator-header-title>
        </locator-header-content>
      </locator-header>
      <div slot="layout-main">
        {location && (
          <locator-nav-bar>
            <nav>
              <ul>
                <li>
                  <NavLink
                    to={`/${postcode}/places/${safePlaceName}/${placePostcode}`}
                    end
                  >
                    {t('place.nav.recycle')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/${postcode}/places/${safePlaceName}/${placePostcode}/details`}
                  >
                    {t('place.nav.details')}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </locator-nav-bar>
        )}
        <diamond-section padding="lg">
          <locator-wrap>
            <Outlet />
            {children}
          </locator-wrap>
        </diamond-section>
      </div>
      {location && (
        <div slot="layout-aside">
          <PlacesMap
            latitude={location.latitude}
            longitude={location.longitude}
            locations={[location]}
            activeLocationId={location.id}
            static
          >
            <locator-places-map-card>
              <diamond-grid>
                <diamond-grid-item small-mobile="6">
                  <diamond-button width="full-width" size="sm">
                    <Link
                      to={`/${postcode}/places/map?lat=${location.latitude}&lng=${location.longitude}&activeLocation=${location.id}`}
                    >
                      <locator-icon icon="map" />
                      {t('actions.showMap')}
                    </Link>
                  </diamond-button>
                </diamond-grid-item>
                <diamond-grid-item small-mobile="6">
                  <diamond-button width="full-width" size="sm">
                    <a
                      href={directions(postcode, location.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        recordEvent({
                          category: 'PlaceDetails::Directions',
                          action: location.address,
                        });
                      }}
                    >
                      {t('actions.directions')}
                      <locator-icon icon="external" />
                    </a>
                  </diamond-button>
                </diamond-grid-item>
              </diamond-grid>
            </locator-places-map-card>
          </PlacesMap>
        </div>
      )}
    </locator-layout>
  );
}
