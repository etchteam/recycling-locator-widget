import { useSignal } from '@preact/signals';
import { Suspense, useEffect } from 'preact/compat';
import { useTranslation } from 'react-i18next';
import {
  Await,
  FetcherWithComponents,
  Link,
  useAsyncValue,
  useFetcher,
  useLocation,
  useParams,
  useSearchParams,
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
import PostCodeResolver from '@/lib/PostcodeResolver';
import directions from '@/lib/directions';
import useAnalytics from '@/lib/useAnalytics';
import { Location } from '@/types/locatorApi';

import { PlacesLoaderResponse, usePlacesLoaderData } from './places.loader';

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
  const location = useLocation();
  const { recordEvent } = useAnalytics();
  const loaderData = useAsyncValue() as PlacesLoaderResponse;
  const [searchParams] = useSearchParams();
  const defaultActiveLocationId = searchParams.get('activeLocation');
  const activeLocation = useSignal<Location | null>(null);
  const showSearchThisArea = useSignal(false);
  const page = useSignal(1);
  const radius = useSignal(25);
  const fetcher = useFetcher() as FetcherWithComponents<{
    data: PlacesLoaderResponse;
  }>;
  const lat = useSignal(fetcher.data?.data.latitude ?? loaderData.latitude);
  const lng = useSignal(fetcher.data?.data.longitude ?? loaderData.longitude);

  const latitude = fetcher.data?.data.latitude ?? loaderData.latitude;
  const longitude = fetcher.data?.data.longitude ?? loaderData.longitude;
  const locations = fetcher.data?.data.locations ?? loaderData.locations;
  const activeLocationPostcode = PostCodeResolver.extractPostcodeFromString(
    activeLocation.value?.address,
  );
  const activeLocationName = encodeURIComponent(activeLocation.value?.name);

  useEffect(() => {
    if (defaultActiveLocationId) {
      const location = locations.find(
        (location) => location.id === Number(defaultActiveLocationId),
      );

      if (location) {
        activeLocation.value = location;
      }
    }
  }, [defaultActiveLocationId]);

  useEffect(() => {
    showSearchThisArea.value = false;
  }, [location]);

  const handleMarkerClick = (location: Location) => {
    activeLocation.value = location;
  };

  const handleZoom = (zoom: number) => {
    const zoomLevelMilesMap = {
      9: { zoomRadius: 64, zoomPage: 4 },
      10: { zoomRadius: 54, zoomPage: 3 },
      11: { zoomRadius: 44, zoomPage: 2 },
      12: { zoomRadius: 34, zoomPage: 2 },
      13: { zoomRadius: 24, zoomPage: 1 },
      14: { zoomRadius: 14, zoomPage: 1 },
      15: { zoomRadius: 4, zoomPage: 1 },
    };

    const { zoomRadius, zoomPage } = zoomLevelMilesMap[Math.floor(zoom)];

    if (radius.value !== zoomRadius || page.value !== zoomPage) {
      radius.value = zoomRadius;
      page.value = zoomPage;
      showSearchThisArea.value = true;
    }
  };

  const handleDrag = (geoPoint: H.geo.Point) => {
    const distance = geoPoint.distance({ lat: lat.value, lng: lng.value });

    if (distance > 1500) {
      lat.value = geoPoint.lat;
      lng.value = geoPoint.lng;
      showSearchThisArea.value = true;
    }
  };

  return (
    <diamond-enter type="fade">
      <PlacesMap
        latitude={latitude}
        longitude={longitude}
        locations={locations}
        activeLocationId={activeLocation.value?.id}
        onMarkerClick={handleMarkerClick}
        onZoom={handleZoom}
        onDrag={handleDrag}
      >
        {(showSearchThisArea.value || fetcher.state !== 'idle') && (
          <fetcher.Form
            method="GET"
            action={`/${postcode}/places`}
            onSubmit={() => (showSearchThisArea.value = false)}
          >
            <input type="hidden" name="page" value={page.value} />
            <input type="hidden" name="radius" value={radius.value} />
            <input type="hidden" name="lat" value={lat.value} />
            <input type="hidden" name="lng" value={lng.value} />
            {loaderData.materialId && (
              <input
                type="hidden"
                name="materialId"
                value={loaderData.materialId}
              />
            )}
            <locator-fab position="top">
              <diamond-button>
                <button type="submit" disabled={fetcher.state !== 'idle'}>
                  <locator-icon icon="sync" />
                  {t('places.map.searchThisArea')}
                </button>
              </diamond-button>
            </locator-fab>
          </fetcher.Form>
        )}
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
                  <Link
                    to={`/${postcode}/places/${activeLocationName}/${activeLocationPostcode}`}
                  >
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
                    onClick={() => {
                      recordEvent({
                        category: 'PlacesMap::Directions',
                        action: activeLocation.value.address,
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
  const { data } = usePlacesLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data}>
        <PlacesMapPageContent />
      </Await>
    </Suspense>
  );
}
