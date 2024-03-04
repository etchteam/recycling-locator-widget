import { Suspense } from 'preact/compat';
import { useTranslation } from 'react-i18next';
import {
  Await,
  FetcherWithComponents,
  Link,
  useAsyncValue,
  useFetcher,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Wrap/Wrap';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/composition/Enter/Enter';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/canvas/LoadingCard/LoadingCard';
import '@/components/composition/IconText/IconText';
import '@/components/content/Icon/Icon';
import '@/components/content/PlaceSummary/PlaceSummary';
import '@/components/control/Fab/Fab';
import { PlacesLoaderResponse } from './places.loader';

function Loading() {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="diamond-text-size-md diamond-spacing-bottom-md">
        {t('places.loading')}
      </h3>
      <locator-places-grid>
        <ul>
          <li>
            <diamond-enter type="fade-in-up">
              <locator-loading-card></locator-loading-card>
            </diamond-enter>
          </li>
          <li>
            <diamond-enter type="fade-in-up" delay={0.5}>
              <locator-loading-card></locator-loading-card>
            </diamond-enter>
          </li>
          <li>
            <diamond-enter type="fade-in-up" delay={1}>
              <locator-loading-card></locator-loading-card>
            </diamond-enter>
          </li>
        </ul>
      </locator-places-grid>
    </>
  );
}

function Places() {
  const { postcode } = useParams();
  const { t } = useTranslation();
  const loaderData = useAsyncValue() as PlacesLoaderResponse;
  const fetcher = useFetcher() as FetcherWithComponents<PlacesLoaderResponse>;

  // The loader is used initially then the fetcher is used to load more
  const count = fetcher.data?.locations.length ?? loaderData.locations.length;
  const allLocations = fetcher.data?.locations ?? loaderData.locations;
  const showLoadMore = !fetcher.data?.max && !loaderData.max;
  const currentPage = fetcher.data?.page ?? loaderData.page;

  return (
    <diamond-enter type="fade">
      <h3
        id="places-count"
        className="diamond-text-size-md diamond-spacing-bottom-md"
      >
        {t('places.count', { count })}
      </h3>
      {count > 0 && (
        <locator-places-grid className="diamond-spacing-bottom-lg">
          <nav aria-labelledby="places-count">
            <ul>
              {allLocations.map((location) => (
                <li key={`${location.id}`}>
                  <Link to={`/${postcode}/places/${location.id}`}>
                    <diamond-card border radius>
                      <locator-place-summary>
                        <h4>{location.name}</h4>
                        <p>{location.address}</p>
                        <dl>
                          <dd>{location.distance}</dd>
                          <dt>
                            {t('common.miles', {
                              count: location.distance,
                            })}
                          </dt>
                          <dd>{location.materials.length}</dd>
                          <dt>
                            {t('common.materialsAccepted', {
                              count: location.materials.length,
                            })}
                          </dt>
                        </dl>
                      </locator-place-summary>
                    </diamond-card>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </locator-places-grid>
      )}
      {showLoadMore && (
        <diamond-grid justify-content="center">
          <diamond-grid-item
            small-mobile="12"
            small-tablet="6"
            large-tablet="4"
          >
            <fetcher.Form method="GET">
              <input type="hidden" name="page" value={currentPage + 1} />
              {loaderData.materialId && (
                <input
                  type="hidden"
                  name="materialId"
                  value={loaderData.materialId}
                />
              )}
              <diamond-button width="full-width">
                <button type="submit" disabled={fetcher.state !== 'idle'}>
                  {t('actions.loadMore')}
                </button>
              </diamond-button>
            </fetcher.Form>
          </diamond-grid-item>
        </diamond-grid>
      )}
    </diamond-enter>
  );
}

export default function PlacesPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { data } = useRouteLoaderData('places') as {
    data: Promise<PlacesLoaderResponse>;
  };

  return (
    <>
      <diamond-section padding="md">
        <diamond-wrap>
          <section className="diamond-spacing-bottom-lg">
            <Suspense fallback={<Loading />}>
              <Await resolve={data}>
                <Places />
              </Await>
            </Suspense>
          </section>
        </diamond-wrap>
      </diamond-section>
      <section>
        <locator-tip text-align="center" wrap="wrap">
          {/* TODO(WRAP-232): swap this out for the proper tip once we have content */}
          <img src="/images/recycling-technology.webp" alt="" />
          <locator-tip-content>
            <p className="diamond-text-weight-bold">Did you know?</p>
            <h2>Putting the right stuff in the right bin is important.</h2>
            <p className="diamond-spacing-bottom-md">
              Most of us are getting it right, however, when too much
              contaminated material is collected it can prevent the whole lorry
              load of material from being recycled.
            </p>
            <diamond-button>
              <button>Tips to reduce contamination</button>
            </diamond-button>
            {/** Space for the fab */}
            <div className="diamond-spacing-bottom-xl"></div>
          </locator-tip-content>
        </locator-tip>
      </section>
      <diamond-enter type="fade" delay={0.25}>
        <locator-fab>
          <diamond-button size="sm" variant="primary">
            <Link to={`/${postcode}/places/map`}>
              <locator-icon icon="map"></locator-icon>
              {t('actions.showMap')}
            </Link>
          </diamond-button>
        </locator-fab>
      </diamond-enter>
    </>
  );
}
