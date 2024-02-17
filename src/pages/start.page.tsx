import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { Form, useNavigate } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
import '@/components/control/LocationInput/LocationInput';
import { useAppState } from '@/lib/AppState';
import StartLayout from '@/pages/layout';

export default function StartPage() {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const { startRoute } = useAppState();
  const submitting = useSignal(false);
  const finishedLoading = useSignal(false);

  useEffect(() => {
    if (!finishedLoading.value && startRoute !== '/') {
      navigateTo(startRoute);
    } else {
      finishedLoading.value = true;
    }
  }, [startRoute]);

  if (finishedLoading.value !== true) {
    return null;
  }

  return (
    <StartLayout>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2>{t('start.title')}</h2>
          <Form method="post" onSubmit={() => (submitting.value = true)}>
            <diamond-form-group class="diamond-spacing-bottom-md">
              <label htmlFor="location-input">{t('start.label')}</label>
              <locator-location-input
                placeholder={t('components.locationInput.placeholder')}
              ></locator-location-input>
            </diamond-form-group>
            <diamond-button width="full-width" variant="primary">
              <button type="submit" disabled={submitting.value}>
                {t('start.cta')}
              </button>
            </diamond-button>
          </Form>
        </diamond-section>
      </locator-wrap>
    </StartLayout>
  );
}
