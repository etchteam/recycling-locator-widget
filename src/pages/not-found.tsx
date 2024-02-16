import { useTranslation } from 'react-i18next';
import { Form, useRouteError, ErrorResponse } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
import '@/components/canvas/Tip/Tip';
import '@/components/control/LocationInput/LocationInput';
import PostCodeResolver from '@/lib/PostcodeResolver';
import StartLayout from '@/pages/layout';

function NotFoundAside() {
  return (
    <locator-tip slot="aside">
      <locator-wrap>
        <p>
          Recycling information is available elsewhere for these UK regions:
        </p>
      </locator-wrap>
    </locator-tip>
  );
}

/**
 * This is both an error boundary and a 404 page, so the user could end up here if:
 * - They visit a route that doesn't exist
 * - An exception is thrown in a child route
 */
export default function NotFoundPage() {
  const { t } = useTranslation();
  const error = useRouteError() as ErrorResponse | undefined;

  if (error && error.status !== 404) {
    // If this isn't a 404, bubble the exception up to the generic error boundary
    throw error;
  }

  const notInUk = error?.data === PostCodeResolver.ERROR_NOT_IN_UK;

  return (
    <StartLayout aside={<NotFoundAside />}>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2>
            {t(`start.notFound.title.${notInUk ? 'notInTheUK' : 'default'}`)}
          </h2>
          {notInUk && <p>{t('start.notFound.ukOnly')}</p>}
          <Form method="post">
            <diamond-form-group class="diamond-spacing-bottom-md">
              <label htmlFor="location-input">
                {t('start.notFound.label')}
              </label>
              <locator-location-input
                placeholder={t('start.placeholder')}
              ></locator-location-input>
            </diamond-form-group>
            <diamond-button width="full-width" variant="primary">
              <button type="submit">{t('start.notFound.button')}</button>
            </diamond-button>
          </Form>
        </diamond-section>
      </locator-wrap>
    </StartLayout>
  );
}
