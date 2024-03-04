import { useSignal } from '@preact/signals';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';

import '@/components/control/MaterialSearchInput/MaterialSearchInput';

export default function PlacesSearchPage() {
  const { t } = useTranslation();
  const submitting = useSignal(false);

  return (
    <>
      <h3 id="places-search-label">{t('places.search.label')}</h3>
      <Form method="post" onSubmit={() => (submitting.value = true)}>
        <diamond-form-group>
          <locator-material-search-input
            placeholder={t('components.materialSearchInput.placeholder')}
            inputLabelledBy="places-search-label"
            submitting={submitting.value}
          ></locator-material-search-input>
        </diamond-form-group>
      </Form>
    </>
  );
}
