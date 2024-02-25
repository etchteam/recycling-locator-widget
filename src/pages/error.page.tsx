import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { Link, useRouteError } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
import StartLayout from '@/pages/start.layout';

/**
 * Global app error boundary
 */
export default function ErrorPage() {
  const { t } = useTranslation();
  const error = useRouteError();
  Sentry.captureException(error, { tags: { route: 'Global error boundary' } });

  return (
    <StartLayout>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2>{t('error.title')}</h2>
          <p className="diamond-spacing-bottom-md">{t('error.message')}</p>
          <diamond-button width="full-width" variant="primary">
            <Link to="/">{t('error.cta')}</Link>
          </diamond-button>
        </diamond-section>
      </locator-wrap>
    </StartLayout>
  );
}
