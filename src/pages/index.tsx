import { useTranslation } from 'react-i18next';
import { Form, redirect, ActionFunctionArgs } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
import '@/components/canvas/Tip/Tip';
import '@/components/control/LocationInput/LocationInput';
import PostCodeResolver from '@/lib/PostcodeResolver';
import StartLayout from '@/pages/layout';

export async function indexAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const location = formData.get('location') as string;
  const postcode = await PostCodeResolver.fromString(location);
  return redirect(`/${postcode}`);
}

function IndexAside() {
  return (
    <locator-tip slot="aside">
      <locator-wrap>
        <p>Use this service to:</p>
        <ul>
          <li>see your nearest places to recycle</li>
          <li>find out how to recycle a specific item</li>
          <li>check what you can recycle at home</li>
        </ul>
        <img src="/images/recycling-technology.webp" alt="" />
      </locator-wrap>
    </locator-tip>
  );
}

export default function IndexPage() {
  const { t } = useTranslation();

  return (
    <StartLayout aside={<IndexAside />}>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2>{t('start.title')}</h2>
          <Form method="post">
            <diamond-form-group class="diamond-spacing-bottom-md">
              <label htmlFor="location-input">Where are you?</label>
              <locator-location-input
                placeholder={t('start.placeholder')}
              ></locator-location-input>
            </diamond-form-group>
            <diamond-button width="full-width" variant="primary">
              <button type="submit">Get started</button>
            </diamond-button>
          </Form>
        </diamond-section>
      </locator-wrap>
    </StartLayout>
  );
}
