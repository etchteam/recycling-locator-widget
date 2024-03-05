import { useSignal } from '@preact/signals';
import { Suspense } from 'preact/compat';
import { useTranslation } from 'react-i18next';
import {
  Await,
  Link,
  useAsyncValue,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/content/Icon/Icon';
import '@/components/control/Fab/Fab';
import PlacesMap from '@/components/control/PlacesMap/PlacesMap';
import Place from '@/components/template/Place/Place';
import directions from '@/lib/directions';
import { Location } from '@/types/locatorApi';

import { PlacesLoaderResponse } from './places.loader';

function Loading() {
  const { t } = useTranslation();

  return (
    <locator-loading>
      <locator-hero>
        <locator-icon icon="distance" color="muted" />
        <h3>{t('places.loading')}</h3>
      </locator-hero>
    </locator-loading>
  );
}

export function PlacesMapPageContent() {
  const { postcode } = useParams();
  const { t } = useTranslation();
  const loaderData = useAsyncValue() as PlacesLoaderResponse;
  const activeLocation = useSignal<Location | null>(null);

  const handleMarkerClick = (location: Location) => {
    activeLocation.value = location;
  };

  return (
    <diamond-enter type="fade">
      <PlacesMap
        latitude={loaderData.latitude}
        longitude={loaderData.longitude}
        locations={loaderData.locations}
        onMarkerClick={handleMarkerClick}
      >
        {activeLocation.value ? (
          <locator-places-map-card>
            <diamond-grid>
              <diamond-grid-item grow shrink>
                <Place location={activeLocation.value} withAddress={false} />
              </diamond-grid-item>
              <diamond-grid-item>
                <diamond-button variant="text">
                  <button
                    type="button"
                    onClick={() => (activeLocation.value = null)}
                  >
                    <locator-icon
                      icon="close"
                      color="primary"
                      label={t('actions.close')}
                    />
                  </button>
                </diamond-button>
              </diamond-grid-item>
            </diamond-grid>
            <diamond-grid>
              <diamond-grid-item small-mobile="6">
                <diamond-button width="full-width" variant="primary" size="sm">
                  <Link to={`/${postcode}/places/${activeLocation.value.id}`}>
                    {t('actions.viewDetails')}
                  </Link>
                </diamond-button>
              </diamond-grid-item>
              <diamond-grid-item small-mobile="6">
                <diamond-button width="full-width" size="sm">
                  <a
                    href={directions(postcode, activeLocation.value.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('actions.directions')}
                    <locator-icon icon="external" />
                  </a>
                </diamond-button>
              </diamond-grid-item>
            </diamond-grid>
          </locator-places-map-card>
        ) : (
          <diamond-enter type="fade" delay={0.5}>
            <locator-fab>
              <diamond-button size="sm" variant="primary">
                <Link to={`/${postcode}/places`}>
                  <locator-icon icon="list"></locator-icon>
                  {t('actions.showList')}
                </Link>
              </diamond-button>
            </locator-fab>
          </diamond-enter>
        )}
      </PlacesMap>
    </diamond-enter>
  );
}

export default function PlacesMapPage() {
  const { data } = useRouteLoaderData('places') as {
    data: Promise<PlacesLoaderResponse>;
  };

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data}>
        <PlacesMapPageContent />
      </Await>
    </Suspense>
  );
}
