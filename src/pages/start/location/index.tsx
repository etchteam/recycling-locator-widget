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

  return (
    <>
      <h2>{t('start.title')}</h2>
      <Form method="post">
        <diamond-form-group class="diamond-spacing-bottom-md">
          <label htmlFor="location-input">Where are you?</label>
          <locator-location-input></locator-location-input>
        </diamond-form-group>
        <diamond-button width="full-width" variant="primary">
          <button type="submit">Get started</button>
        </diamond-button>
      </Form>
    </>
  );
}
