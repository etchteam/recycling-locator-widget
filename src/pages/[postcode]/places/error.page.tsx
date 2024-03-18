import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { useParams, useRouteError } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
import ErrorPage from '@/components/template/ErrorPage/ErrorPage';

import PlacesLayout from './places.layout';

export default function PlacesErrorPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const error = useRouteError();
  Sentry.captureException(error, {
    tags: { route: 'Places error boundary' },
  });

  return (
    <PlacesLayout>
      <locator-wrap>
        <diamond-section padding="lg">
          <ErrorPage
            link={`/${postcode}/places`}
            message={t('places.error.message')}
            cta={t('actions.tryAgain')}
          />
        </diamond-section>
      </locator-wrap>
    </PlacesLayout>
  );
}
