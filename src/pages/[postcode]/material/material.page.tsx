import { Suspense } from 'preact/compat';
import { useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { Await, Link, useLoaderData, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/canvas/Loading/Loading';
import '@/components/content/Icon/Icon';
import '@/components/canvas/LoadingCard/LoadingCard';
import '@/components/canvas/Hero/Hero';
import '@/components/composition/Wrap/Wrap';
import TipContent from '@/components/template/TipContent/TipContent';
import getPropertiesByMaterial from '@/lib/getPropertiesByMaterial';
import useAnalytics from '@/lib/useAnalytics';

import NearbyPlaces from './NearbyPlaces';
import RecycleAtHome from './RecycleAtHome';
import {
  DeferredMaterialLoaderResponse,
  AwaitedMaterialLoaderResponse,
} from './material.loader';

export function Loading() {
  const { t } = useTranslation();

  return (
    <locator-loading>
      <locator-hero>
        <locator-icon icon="distance" color="muted" />
        <h3 className="diamond-spacing-bottom-lg">{t('material.loading')}</h3>
        <diamond-enter type="fade-in-up" className="diamond-spacing-bottom-md">
          <locator-loading-card />
        </diamond-enter>
        <diamond-enter type="fade-in-up" delay={1}>
          <locator-loading-card />
        </diamond-enter>
      </locator-hero>
    </locator-loading>
  );
}

function MaterialPageContent({
  localAuthority,
  locations,
  materialId,
}: Partial<AwaitedMaterialLoaderResponse>) {
  const { t } = useTranslation();
  const propertiesCollectingThisMaterial = getPropertiesByMaterial(
    materialId,
    localAuthority.properties,
  );
  const recyclableAtHome = propertiesCollectingThisMaterial !== undefined;
  const recyclableNearby = locations.items.length > 0;
  const recyclable = recyclableAtHome || recyclableNearby;

  return (
    <diamond-enter type="fade">
      <locator-hero variant={recyclable ? 'positive' : 'negative'}>
        <locator-wrap>
          <diamond-enter type="fade" delay={0.4}>
            <locator-icon icon={recyclable ? 'tick-circle' : 'cross-circle'} />
            <h3>{t(`material.hero.${recyclable ? 'yes' : 'no'}`)}</h3>
          </diamond-enter>
        </locator-wrap>
      </locator-hero>
      <diamond-enter type="fade-in-up" delay={0.25}>
        <locator-wrap>
          <section className="diamond-spacing-bottom-lg">
            <RecycleAtHome
              materialId={materialId}
              allProperties={localAuthority.properties}
              propertiesCollectingThisMaterial={
                propertiesCollectingThisMaterial
              }
            />
          </section>
          <section className="diamond-spacing-bottom-lg">
            <NearbyPlaces locations={locations} />
          </section>
        </locator-wrap>
      </diamond-enter>
    </diamond-enter>
  );
}

export default function MaterialPage() {
  const { postcode } = useParams();
  const { recordEvent } = useAnalytics();
  const {
    materialId,
    materialName,
    tip: tipPromise,
    localAuthority: localAuthorityPromise,
    locations: locationsPromise,
  } = useLoaderData() as DeferredMaterialLoaderResponse;

  useEffect(() => {
    if (materialName) {
      recordEvent({
        category: 'MaterialResult::MaterialSearch',
        action: materialName,
      });
    }
  }, [materialName]);

  return (
    <>
      <div slot="layout-main">
        {materialId && (
          <Link
            to={`/${postcode}/material/search`}
            className="diamond-text-decoration-none"
          >
            <locator-context-header>
              <div className="diamond-text-weight-bold">{materialName}</div>
              <locator-icon icon="search" color="primary" />
            </locator-context-header>
          </Link>
        )}
        <Suspense fallback={<Loading />}>
          <Await
            resolve={Promise.all([localAuthorityPromise, locationsPromise])}
          >
            {([localAuthority, locations]) => {
              return (
                <MaterialPageContent
                  localAuthority={localAuthority}
                  locations={locations}
                  materialId={materialId}
                />
              );
            }}
          </Await>
        </Suspense>
      </div>
      <locator-tip slot="layout-aside" text-align="center">
        <locator-wrap>
          <Suspense fallback={null}>
            <Await resolve={tipPromise}>
              {(tip) => <TipContent tip={tip} />}
            </Await>
          </Suspense>
        </locator-wrap>
      </locator-tip>
    </>
  );
}
