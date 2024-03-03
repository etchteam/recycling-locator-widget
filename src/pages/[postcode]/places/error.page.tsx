import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useRouteError } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
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
      <diamond-section padding="lg">
        <locator-wrap>
          <h2>{t('error.title')}</h2>
          <p>{t('places.error.message')}</p>
          <p className="diamond-spacing-bottom-md">{t('error.message')}</p>
          <diamond-button width="full-width" variant="primary">
            <Link to={`/${postcode}/places`}>{t('actions.tryAgain')}</Link>
          </diamond-button>
        </locator-wrap>
      </diamond-section>
    </PlacesLayout>
  );
}
