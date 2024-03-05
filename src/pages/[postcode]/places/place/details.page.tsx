import { useTranslation } from 'react-i18next';
import { useRouteLoaderData } from 'react-router-dom';

import '@/components/composition/BorderedList/BorderedList';
import { PlaceLoaderResponse } from './place.loader';

export default function PlaceDetailsPage() {
  const { t } = useTranslation();
  const { location } = useRouteLoaderData('place') as PlaceLoaderResponse;

  return (
    <>
      <h3 id="material-search-title" className="diamond-spacing-bottom-md">
        {t('place.details.title')}
      </h3>
      <locator-bordered-list size="sm">
        <dl>
          <div>
            <dt>Address</dt>
            <dd>{location.address}</dd>
          </div>
        </dl>
      </locator-bordered-list>
    </>
  );
}
