import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
import '@/components/control/LocationInput/LocationInput';

import LocatorApi from '@/lib/LocatorApi';
import StartLayout from '@/pages/start.layout';
import { MaterialWithCategory } from '@/types/locatorApi';

import LocationForm from './LocationForm';

async function getMaterialsOrCategoryNameById(
  materials: string,
  category: string,
): Promise<string> {
  try {
    const materialData =
      await LocatorApi.get<MaterialWithCategory[]>('materials');

    if (category) {
      const materialWithCategory = materialData.find(
        (m) => m.category.id == category,
      );
      return materialWithCategory.category.name;
    }

    // The user can pass multiple materials separated by commas
    // But we have no way to form a sensible search term from that
    // So we'll just use the first material instead
    const materialId = materials.split(',')[0];
    const material = materialData.find((m) => materialId == m.id);
    return material.name;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { component: 'MaterialStartPage' },
    });
  }
}

/**
 * Starting with a pre-filled material search form, the user only has to enter a location to
 * skip straight to the material result page.
 *
 * Examples of valid start paths:
 * - /material?materials=1&search=Plastic drinks bottles
 * - /material?materials=1,2,3search=Plastic wrapping
 * - /material?category=1&search=Cardboard
 * - /material?category=1 (The search term will be resolved if none is provided)
 */
export default function MaterialStartPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const materials = searchParams.get('materials');
  const category = searchParams.get('category');
  const [search, setSearch] = useState(searchParams.get('search'));

  useEffect(() => {
    async function findMaterialSearchTerm() {
      const searchTerm = await getMaterialsOrCategoryNameById(
        materials,
        category,
      );

      setSearch(searchTerm);
    }

    if (!search && (materials || category)) {
      // We haven't been given a search term so we'll have to do some work to find it
      findMaterialSearchTerm();
    }
  }, [search]);

  return (
    <StartLayout>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2>
            {t('start.material.title', {
              material: search?.toLocaleLowerCase(),
            })}
          </h2>
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
