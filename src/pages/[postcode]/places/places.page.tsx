import { Suspense, useEffect } from 'preact/compat';
import { useTranslation } from 'react-i18next';
import {
  Await,
  FetcherWithComponents,
  Link,
  useAsyncValue,
  useFetcher,
  useParams,
  useSearchParams,
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
import '@/components/control/Fab/Fab';
import Place from '@/components/template/Place/Place';
import TipContent from '@/components/template/TipContent/TipContent';
import config from '@/config';
import PostCodeResolver from '@/lib/PostcodeResolver';
import formatPostcode from '@/lib/formatPostcode';
import useAnalytics from '@/lib/useAnalytics';

import { PlacesLoaderResponse, usePlacesLoaderData } from './places.loader';

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
  const fetcher = useFetcher() as FetcherWithComponents<{
    data: PlacesLoaderResponse;
  }>;
  const [searchParams, setSearchParams] = useSearchParams();

  // The loader is used initially then the fetcher is used to load more
  const count =
    fetcher.data?.data.locations?.length ?? loaderData.locations.length;
  const allLocations = fetcher.data?.data.locations ?? loaderData.locations;
  const showLocations = count > 0 && loaderData.materialId !== 'undefined';
  const showLoadMore =
    showLocations && !fetcher.data?.data.max && !loaderData.max;
  const currentPage = fetcher.data?.data.page ?? loaderData.page;

  const handleResetSearch = () => {
    searchParams.delete('materialId');
    searchParams.delete('materialName');
    setSearchParams(searchParams);
  };

  return (
    <diamond-enter type="fade">
      {showLocations ? (
        <>
          <h3
            id="places-count"
            className="diamond-text-size-md diamond-spacing-bottom-md"
          >
            {t('places.count', { count })}
          </h3>
          <locator-places-grid className="diamond-spacing-bottom-lg">
            <nav aria-labelledby="places-count">
              <ul>
                {allLocations.map((location) => {
                  const locationPostcode =
                    PostCodeResolver.extractPostcodeFromString(
                      location.address,
                    );
                  const locationName = encodeURIComponent(location.name);

                  return (
                    <li key={`${location.id}`}>
                      <Link
                        to={`/${postcode}/places/${locationName}/${locationPostcode}`}
                      >
                        <diamond-card border radius>
                          <Place location={location} />
                        </diamond-card>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </locator-places-grid>
        </>
      ) : (
        <locator-wrap>
          <diamond-card className="diamond-spacing-top-md" border radius>
            <locator-icon-text className="diamond-spacing-bottom-xs">
              <locator-icon-circle variant="negative">
                <locator-icon icon="place"></locator-icon>
              </locator-icon-circle>
              <h3>{t('material.nearbyPlaces.noPlaces.title')}</h3>
            </locator-icon-text>
            <p>
              {t('material.nearbyPlaces.noPlaces.content', {
                postcode: formatPostcode(postcode),
              })}
            </p>
            <diamond-button
              width="full-width"
              className="diamond-spacing-bottom-sm"
            >
              <Link to={`/${postcode}/places/search`}>
                {t('actions.searchAgain')}
              </Link>
            </diamond-button>
            <diamond-button width="full-width">
              <button type="button" onClick={handleResetSearch}>
                {t('places.viewAll')}
              </button>
            </diamond-button>
          </diamond-card>
        </locator-wrap>
      )}
      {showLoadMore && (
        <diamond-grid justify-content="center">
          <diamond-grid-item
            small-mobile="12"
            small-tablet="6"
            large-tablet="4"
          >
            <fetcher.Form method="GET" action={`/${postcode}/places`}>
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
  const { recordEvent } = useAnalytics();
  const { data } = usePlacesLoaderData();
  const [searchParams] = useSearchParams();
  const materialName = searchParams.get('materialName');

  useEffect(() => {
    recordEvent({
      category: 'PlacesList::MaterialSearch',
      action: materialName,
    });
  }, [materialName]);

  return (
    <>
      <diamond-section padding="md">
        <locator-wrap max-width="none" gutter="fluid">
          <section className="diamond-spacing-bottom-lg">
            <Suspense fallback={<Loading />}>
              <Await resolve={data}>
                <Places />
              </Await>
            </Suspense>
          </section>
        </locator-wrap>
      </diamond-section>
      <section>
        <Suspense fallback={null}>
          <Await resolve={data}>
            {({ tip }) => (
              <diamond-enter type="fade-in-up">
                <locator-tip text-align="center" wrap="wrap">
                  <img src={config.imagePath + 'material-tip.svg'} alt="" />
                  <locator-tip-content>
                    <TipContent tip={tip} ctaWidth="full-width-mobile" />
                    {/** Space for the fab */}
                    <div className="diamond-spacing-bottom-xl"></div>
                  </locator-tip-content>
                </locator-tip>
              </diamond-enter>
            )}
          </Await>
        </Suspense>
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
