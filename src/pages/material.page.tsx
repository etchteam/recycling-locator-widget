import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
import '@/components/control/LocationInput/LocationInput';

import StartLayout from '@/pages/start.layout';

import LocationForm from './LocationForm';

/**
 * Starting with a pre-filled material search form, the user only has to enter a location to
 * skip straight to the material result page.
 *
 * Examples of valid start paths:
 * - /material?materials=1&search=Plastic drinks bottles
 * - /material?materials=1,2,3search=Plastic wrapping
 * - /material?category=1&search=Cardboard
 * - /material?category=1 (if search is omitted the material name won't display in the title)
 */
export default function MaterialStartPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const materials = searchParams.get('materials');
  const category = searchParams.get('category');

  return (
    <StartLayout>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2>{t('start.material.title', { material: search })}</h2>
          <LocationForm action="/material">
            {search && <input type="hidden" name="search" value={search} />}
            {materials && (
              <input type="hidden" name="materials" value={materials} />
            )}
            {category && (
              <input type="hidden" name="category" value={category} />
            )}
          </LocationForm>
        </diamond-section>
      </locator-wrap>
    </StartLayout>
  );
}
