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
      <h2>{t('error.title')}</h2>
      <p>{t('places.error.message')}</p>
      <p className="diamond-spacing-bottom-md">{t('error.message')}</p>
      <diamond-button width="full-width" variant="primary">
        <Link to={`/${postcode}/places`}>{t('actions.tryAgain')}</Link>
      </diamond-button>
      <locator-tip slot="layout-aside" text-align="center">
        {/* TODO(WRAP-232): swap this out for the proper tip once we have content */}
        <locator-wrap>
          <img src="/images/recycling-technology.webp" alt="" />
          <p className="diamond-text-weight-bold">Hints and tips</p>
          <h2>How to check if your electricals can be recycled</h2>
          <p>
            Any items that have a plug, use batteries, need charging or have a
            picture of a crossed out wheelie bin on, are known as Waste
            Electrical and Electronic Equipment (WEEE). These items should not
            be sent to landfill and should be recycled at Recycling Centres,
            electrical item bring banks or via electrical retailers
          </p>
        </locator-wrap>
      </locator-tip>
    </PlacesLayout>
  );
}
