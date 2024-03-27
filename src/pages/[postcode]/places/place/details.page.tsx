import nl2br from 'nl2br';
import { useTranslation } from 'react-i18next';
import { useRouteLoaderData } from 'react-router-dom';

import '@/components/composition/BorderedList/BorderedList';
import { PlaceLoaderResponse } from './place.loader';

export default function PlaceDetailsPage() {
  const { t } = useTranslation();
  const { location } = useRouteLoaderData('place') as PlaceLoaderResponse;

  return (
    <>
      <h3 className="diamond-spacing-bottom-md">{t('place.details.title')}</h3>
      <locator-bordered-list size="sm">
        <dl>
          <div>
            <dt>{t('place.details.address')}</dt>
            <dd>{location.address}</dd>
          </div>
          {location.telephone && (
            <div>
              <dt>{t('place.details.phone')}</dt>
              <dd>{location.telephone}</dd>
            </div>
          )}
          {location.website && (
            <div>
              <dt>{t('place.details.website')}</dt>
              <dd>
                <a
                  href={location.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {location.website}
                </a>
              </dd>
            </div>
          )}
          {location.openingHours && (
            <div>
              <dt>{t('place.details.openingHours')}</dt>
              <dd>{nl2br(location.openingHours)}</dd>
            </div>
          )}
          {location.collectionDetails && (
            <div>
              <dt>{t('place.details.collectionDetails')}</dt>
              <dd>{nl2br(location.collectionDetails)}</dd>
            </div>
          )}
          {location.notes && (
            <div>
              <dt>{t('place.details.notes')}</dt>
              <dd>{nl2br(location.notes)}</dd>
            </div>
          )}
        </dl>
      </locator-bordered-list>
    </>
  );
}
