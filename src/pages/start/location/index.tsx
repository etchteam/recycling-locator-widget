import { useSignal } from '@preact/signals';
import { useTranslation } from 'react-i18next';
import { Form, redirect, ActionFunctionArgs } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';

import '@/components/control/LocationInput/LocationInput';
import PostCodeResolver from '@/lib/PostcodeResolver';

export async function locationAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const location = formData.get('location') as string;
  const postcode = await PostCodeResolver.fromString(location);
  return redirect(`/${postcode}`);
}

export default function Location() {
  const { t } = useTranslation();
  const submitting = useSignal(false);

  return (
    <>
      <h2>{t('start.title')}</h2>
      <Form method="post" onSubmit={() => (submitting.value = true)}>
        <diamond-form-group class="diamond-spacing-bottom-md">
          <label htmlFor="location-input">Where are you?</label>
          <locator-location-input
            placeholder={t('start.placeholder')}
          ></locator-location-input>
        </diamond-form-group>
        <diamond-button width="full-width" variant="primary">
          <button type="submit" disabled={submitting.value}>
            Get started
          </button>
        </diamond-button>
      </Form>
    </>
  );
}
