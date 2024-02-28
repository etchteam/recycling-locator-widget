import { useTranslation } from 'react-i18next';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
import '@/components/control/LocationInput/LocationInput';
import StartLayout from '@/pages/start.layout';

import LocationForm from './LocationForm';

export default function StartPage() {
  const { t } = useTranslation();

  return (
    <StartLayout>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2>{t('start.title')}</h2>
          <LocationForm />
        </diamond-section>
      </locator-wrap>
    </StartLayout>
  );
}
