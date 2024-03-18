import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/control/Button/Button';

import LocationInput from '@/components/control/LocationInput/LocationInput';
import useFormValidation from '@/lib/useFormValidation';

export default function LocationForm({
  label,
  cta,
}: {
  readonly label?: string;
  readonly cta?: string;
}) {
  const { t } = useTranslation();
  const form = useFormValidation('location');

  return (
    <Form method="post" onSubmit={form.handleSubmit}>
      <diamond-form-group className="diamond-spacing-bottom-md">
        <label htmlFor="location-input">{label ?? t('start.label')}</label>
        <LocationInput
          handleBlur={form.handleBlur}
          handleInput={form.handleInput}
          valid={form.valid.value}
        ></LocationInput>
      </diamond-form-group>
      <diamond-button width="full-width" variant="primary">
        <button type="submit" disabled={form.submitting.value}>
          {cta ?? t('start.cta')}
        </button>
      </diamond-button>
    </Form>
  );
}
