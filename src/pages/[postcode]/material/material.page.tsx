import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';

import '@/components/composition/Wrap/Wrap';
import { MaterialLoaderResponse } from './material.loader';

export default function MaterialPage() {
  const { t } = useTranslation();
  const { recycleAtHome, locations } =
    useLoaderData() as MaterialLoaderResponse;
  const recyclableAtHome = recycleAtHome.schemes.some(
    (scheme) => scheme.containers.length > 0,
  );
  const recyclableNearby = locations.length > 0;
  const recyclable = recyclableAtHome || recyclableNearby;

  return (
    <locator-hero variant={recyclable ? 'positive' : 'negative'}>
      <locator-wrap>
        <locator-icon icon={recyclable ? 'tick-circle' : 'cross-circle'} />
        <h3>{t(`material.hero.${recyclable ? 'yes' : 'no'}`)}</h3>
      </locator-wrap>
    </locator-hero>
  );
}
