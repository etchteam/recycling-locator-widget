import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useRouteError } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import PlaceLayout from './place.layout';

export default function PlaceErrorPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const error = useRouteError();
  Sentry.captureException(error, {
    tags: { route: 'Place details error boundary' },
  });

  return (
    <PlaceLayout>
      <h2>{t('error.title')}</h2>
      <p>{t('place.error.message')}</p>
      <p className="diamond-spacing-bottom-md">{t('error.message')}</p>
      <diamond-button width="full-width" variant="primary">
        <Link to={`/${postcode}/places`}>{t('actions.searchAgain')}</Link>
      </diamond-button>
    </PlaceLayout>
  );
}
