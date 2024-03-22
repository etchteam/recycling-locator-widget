import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
import '@/components/control/LocationInput/LocationInput';

import StartLayout from '@/pages/start.layout';

import LocationForm from './LocationForm';
import { MaterialStartLoaderResponse } from './material.loader';

export default function MaterialStartPage() {
  const { t } = useTranslation();
  const { name, id } = useLoaderData() as MaterialStartLoaderResponse;

  return (
    <StartLayout>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2>{t('start.material.title', { material: name })}</h2>
          <LocationForm action="/material">
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="name" value={name} />
          </LocationForm>
        </diamond-section>
      </locator-wrap>
    </StartLayout>
  );
}
