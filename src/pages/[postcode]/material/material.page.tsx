import { Suspense } from 'preact/compat';
import { useTranslation } from 'react-i18next';
import { useAsyncValue, Await } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/canvas/Loading/Loading';
import '@/components/content/Icon/Icon';
import '@/components/canvas/LoadingCard/LoadingCard';
import '@/components/canvas/Hero/Hero';
import '@/components/composition/Wrap/Wrap';
import getPropertiesByMaterial from '@/lib/getPropertiesByMaterial';

import NearbyPlaces from './NearbyPlaces';
import RecycleAtHome from './RecycleAtHome';
import {
  MaterialLoaderResponse,
  useMaterialLoaderData,
} from './material.loader';

function Loading() {
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

function MaterialPageContent() {
  const { t } = useTranslation();
  const { localAuthority, locations, materialId } =
    useAsyncValue() as MaterialLoaderResponse;
  const propertiesCollectingThisMaterial = getPropertiesByMaterial(
    materialId,
    localAuthority.properties,
  );
  const recyclableAtHome = propertiesCollectingThisMaterial !== undefined;
  const recyclableNearby = locations.length > 0;
  const recyclable = recyclableAtHome || recyclableNearby;

  return (
    <diamond-enter type="fade">
      <locator-hero variant={recyclable ? 'positive' : 'negative'}>
        <locator-wrap>
          <locator-icon icon={recyclable ? 'tick-circle' : 'cross-circle'} />
          <h3>{t(`material.hero.${recyclable ? 'yes' : 'no'}`)}</h3>
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
  const { data } = useMaterialLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data}>
        <MaterialPageContent />
      </Await>
    </Suspense>
  );
}
