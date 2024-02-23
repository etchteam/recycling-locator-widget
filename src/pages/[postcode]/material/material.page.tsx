import { Suspense } from 'preact/compat';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useAsyncValue, Await } from 'react-router-dom';

import '@/components/canvas/Loading/Loading';
import '@/components/content/Icon/Icon';
import getDryContainersByMaterial from '@/lib/getDryContainersByMaterial';

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
  const { home, materialId } = useAsyncValue() as MaterialLoaderResponse;
  console.log(home);
  const schemes = getDryContainersByMaterial(materialId, home.dryStreams);

  const recyclable = schemes.some((scheme) => scheme.containers.length > 0);

  return (
    <locator-hero variant={recyclable ? 'positive' : 'negative'}>
      <locator-wrap>
        <locator-icon icon={recyclable ? 'tick-circle' : 'cross-circle'} />
        <h3>{t(`material.hero.${recyclable ? 'yes' : 'no'}`)}</h3>
      </locator-wrap>
    </locator-hero>
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
