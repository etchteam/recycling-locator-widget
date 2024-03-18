import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { useParams, useRouteError } from 'react-router-dom';

import ErrorPage from '@/components/template/ErrorPage/ErrorPage';

import HomeRecyclingLayout from './home.layout';

export default function HomeRecyclingErrorPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const error = useRouteError();
  Sentry.captureException(error, {
    tags: { route: 'Home recycling error boundary' },
  });

  return (
    <HomeRecyclingLayout>
      <ErrorPage
        link={`/${postcode}/home`}
        message={t('homeRecycling.error.message')}
        cta={t('actions.tryAgain')}
      />
    </HomeRecyclingLayout>
  );
}
