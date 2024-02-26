import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useRouteError } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';

export default function MaterialErrorPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const error = useRouteError();
  Sentry.captureException(error, {
    tags: { route: 'Material result error boundary' },
  });

  return (
    <locator-wrap>
      <diamond-section padding="lg">
        <h2>{t('error.title')}</h2>
        <p>{t('material.error.message')}</p>
        <p className="diamond-spacing-bottom-md">{t('error.message')}</p>
        <diamond-button width="full-width" variant="primary">
          <Link to={`/${postcode}/material/search`}>
            {t('actions.searchAgain')}
          </Link>
        </diamond-button>
      </diamond-section>
    </locator-wrap>
  );
}
