import { Suspense } from 'preact/compat';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useAsyncValue, Await } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/canvas/Loading/Loading';
import '@/components/content/Icon/Icon';
import getDryContainersByMaterial from '@/lib/getDryContainersByMaterial';

import '@/components/composition/Wrap/Wrap';
import '@/components/canvas/Hero/Hero';
import NearbyPlaces from './NearbyPlaces';
import RecycleAtHome from './RecycleAtHome';
import { MaterialLoaderResponse } from './material.loader';

function Loading() {
  const { t } = useTranslation();

  return (
    <locator-loading>
      <locator-hero>
        <locator-icon icon="distance" color="muted" />
        <h3>{t('material.loading')}</h3>
      </locator-hero>
    </locator-loading>
  );
}

function MaterialPageContent() {
  const { t } = useTranslation();
  const { home, locations, materialId } =
    useAsyncValue() as MaterialLoaderResponse;
  const schemes = getDryContainersByMaterial(materialId, home.dryStreams);
  const recyclableAtHome = schemes.some(
    (scheme) => scheme.containers.length > 0,
  );
  const recyclableNearby = locations.length > 0;
  const recyclable = recyclableAtHome || recyclableNearby;

  return (
    <diamond-enter>
      <locator-hero variant={recyclable ? 'positive' : 'negative'}>
        <locator-wrap>
          <locator-icon icon={recyclable ? 'tick-circle' : 'cross-circle'} />
          <h3>{t(`material.hero.${recyclable ? 'yes' : 'no'}`)}</h3>
        </locator-wrap>
      </locator-hero>
      <diamond-enter type="fade-in-up" delay={0.25}>
        <locator-wrap>
          <section className="diamond-spacing-bottom-lg">
            <RecycleAtHome schemes={schemes} />
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
  const { data } = useLoaderData() as { data: Promise<MaterialLoaderResponse> };

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data}>
        <MaterialPageContent />
      </Await>
    </Suspense>
  );
}
