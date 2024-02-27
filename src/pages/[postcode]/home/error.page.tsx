import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useRouteError } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
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
      <h2>{t('error.title')}</h2>
      <p>{t('homeRecycling.error.message')}</p>
      <p className="diamond-spacing-bottom-md">{t('error.message')}</p>
      <diamond-button width="full-width" variant="primary">
        <Link to={`/${postcode}/home`}>{t('actions.tryAgain')}</Link>
      </diamond-button>
    </HomeRecyclingLayout>
  );
}
