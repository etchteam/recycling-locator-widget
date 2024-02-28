import { useSignal } from '@preact/signals';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';

export default function LocationForm({
  label,
  cta,
}: {
  readonly label?: string;
  readonly cta?: string;
}) {
  const { t } = useTranslation();
  const submitting = useSignal(false);

  return (
    <Form method="post" onSubmit={() => (submitting.value = true)}>
      <diamond-form-group class="diamond-spacing-bottom-md">
        <label htmlFor="location-input">{label ?? t('start.label')}</label>
        <locator-location-input
          placeholder={t('components.locationInput.placeholder')}
        ></locator-location-input>
      </diamond-form-group>
      <diamond-button width="full-width" variant="primary">
        <button type="submit" disabled={submitting.value}>
          {cta ?? t('start.cta')}
        </button>
      </diamond-button>
    </Form>
  );
}
