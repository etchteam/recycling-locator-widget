import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { useParams, useRouteError } from 'react-router-dom';

import ErrorPage from '@/components/template/ErrorPage/ErrorPage';

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
      <ErrorPage
        link={`/${postcode}/places`}
        message={t('place.error.message')}
        cta={t('actions.tryAgain')}
      />
    </PlaceLayout>
  );
}
