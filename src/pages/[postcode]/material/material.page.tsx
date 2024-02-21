import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';

import { MaterialLoaderResponse } from './material.loader';

export default function MaterialPage() {
  const { t } = useTranslation();
  const { recycleAtHome } = useLoaderData() as MaterialLoaderResponse;
  const recyclable = recycleAtHome.schemes.some(
    (scheme) => scheme.containers.length > 0,
  );

  return (
    <locator-hero variant={recyclable ? 'positive' : 'negative'}>
      <locator-wrap>
        <locator-icon icon={recyclable ? 'tick-circle' : 'cross-circle'} />
        <h3>{t(`material.hero.${recyclable ? 'yes' : 'no'}`)}</h3>
      </locator-wrap>
    </locator-hero>
  );
}
