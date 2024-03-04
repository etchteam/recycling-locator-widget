import { useTranslation } from 'react-i18next';
import { Link, useLoaderData, useParams } from 'react-router-dom';

import '@/components/composition/BorderedList/BorderedList';
import { PopularSearchLoaderResponse } from './popular.loader';

export default function PlacesSearchPopularPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { popularMaterials } = useLoaderData() as PopularSearchLoaderResponse;

  return (
    <locator-bordered-list size="sm">
      <h3>{t('common.popularSearches')}</h3>
      <nav>
        <ul>
          {popularMaterials.map(({ id, name }) => (
            <li key={id}>
              <Link
                to={`/${postcode}/places?materialId=${id}&materialName=${encodeURIComponent(name)}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </locator-bordered-list>
  );
}
