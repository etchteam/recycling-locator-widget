import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';

import RecycleAtHome from './RecycleAtHome';
import { MaterialLoaderResponse } from './material.loader';

export default function MaterialPage() {
  const { t } = useTranslation();
  const { recycleAtHome, locations } =
    useLoaderData() as MaterialLoaderResponse;
  const recyclableAtHome = recycleAtHome.some(
    (scheme) => scheme.containers.length > 0,
  );
  const recyclableNearby = locations.length > 0;
  const recyclable = recyclableAtHome || recyclableNearby;

  return (
    <>
      <locator-hero variant={recyclable ? 'positive' : 'negative'}>
        <locator-wrap>
          <locator-icon icon={recyclable ? 'tick-circle' : 'cross-circle'} />
          <h3>{t(`material.hero.${recyclable ? 'yes' : 'no'}`)}</h3>
        </locator-wrap>
      </locator-hero>
      <locator-wrap>
        <RecycleAtHome schemes={recycleAtHome} />
      </locator-wrap>
    </>
  );
}
