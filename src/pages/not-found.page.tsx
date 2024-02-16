import { useSignal } from '@preact/signals';
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

function Aside() {
  const { t } = useTranslation();

  const links = [
    {
      href: 'https://www.gov.im/categories/home-and-neighbourhood/recycling/recycling-locations/',
      label: t('notFound.aside.isleOfMan'),
    },
    {
      href: 'https://www.gov.je/Environment/WasteReduceReuseRecycle/pages/default.aspx',
      label: t('notFound.aside.jersey'),
    },
    {
      href: 'https://www.gov.gg/recycling',
      label: t('notFound.aside.guernsey'),
    },
  ];

  return (
    <locator-tip slot="aside">
      <locator-wrap>
        <p>{t('notFound.aside.content')}</p>
        <ul>
          {links.map(({ href, label }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            </li>
          ))}
        </ul>
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
  const submitting = useSignal(false);

  if (error && error.status !== 404) {
    // If this isn't a 404, bubble the exception up to the generic error boundary
    throw error;
  }

  const notInUk = error?.data === PostCodeResolver.ERROR_NOT_IN_UK;

  return (
    <StartLayout aside={<Aside />}>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2>{t(`notFound.title.${notInUk ? 'notInTheUK' : 'default'}`)}</h2>
          {notInUk && <p>{t('notFound.ukOnly')}</p>}
          <Form method="post" onSubmit={() => (submitting.value = true)}>
            <diamond-form-group class="diamond-spacing-bottom-md">
              <label htmlFor="location-input">{t('notFound.label')}</label>
              <locator-location-input
                placeholder={t('components.locationInput.placeholder')}
              ></locator-location-input>
            </diamond-form-group>
            <diamond-button width="full-width" variant="primary">
              <button type="submit" disabled={submitting.value}>
                {t('notFound.cta')}
              </button>
            </diamond-button>
          </Form>
        </diamond-section>
      </locator-wrap>
    </StartLayout>
  );
}
