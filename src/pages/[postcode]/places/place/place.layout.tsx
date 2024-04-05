import { ComponentChildren } from 'preact';
import { Suspense } from 'preact/compat';
import { useRef } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { Await, Link, NavLink, Outlet, useParams } from 'react-router-dom';
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
import useScrollRestoration from '@/lib/useScrollRestoration';

import { usePlaceLoaderData } from './place.loader';

export default function PlaceLayout({
  children,
}: {
  readonly children?: ComponentChildren;
}) {
  const { t } = useTranslation();
  const { postcode, placeName, placePostcode } = useParams();
  const { location: locationPromise } = usePlaceLoaderData();
  const { recordEvent } = useAnalytics();
  const layoutRef = useRef();
  useScrollRestoration(layoutRef);
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
              <Link to={`/${postcode}/places`} unstable_viewTransition>
                <locator-icon icon="arrow-left" label="Back"></locator-icon>
              </Link>
            </diamond-button>
            <div>
              <h2>{placeName}</h2>
              <p>{placePostcode !== 'null' ? placePostcode : ''}</p>
            </div>
          </locator-header-title>
        </locator-header-content>
      </locator-header>
      <div slot="layout-main" ref={layoutRef}>
        <locator-nav-bar>
          <nav>
            <ul>
              <li>
                <NavLink
                  to={`/${postcode}/places/${safePlaceName}/${placePostcode}`}
                  unstable_viewTransition
                  end
                >
                  {t('place.nav.recycle')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${postcode}/places/${safePlaceName}/${placePostcode}/details`}
                  unstable_viewTransition
                >
                  {t('place.nav.details')}
                </NavLink>
              </li>
            </ul>
          </nav>
        </locator-nav-bar>
        <diamond-section padding="lg">
          <locator-wrap>
            <Outlet />
            {children}
          </locator-wrap>
        </diamond-section>
      </div>
      <div slot="layout-aside" className="display-contents">
        <Suspense fallback={null}>
          <Await resolve={locationPromise}>
            {(location) =>
              location?.latitude ? (
                <PlacesMap
                  latitude={location.latitude}
                  longitude={location.longitude}
                  locations={[location]}
                  activeLocationId={location.id}
                  static
                >
                  <Link
                    to={`/${postcode}/places/map?lat=${location.latitude}&lng=${location.longitude}&activeLocation=${location.id}`}
                    aria-label={t('actions.showMap')}
                  >
                    <locator-places-map-scrim />
                  </Link>
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
              ) : (
                <locator-map-svg></locator-map-svg>
              )
            }
          </Await>
        </Suspense>
      </div>
    </locator-layout>
  );
}
