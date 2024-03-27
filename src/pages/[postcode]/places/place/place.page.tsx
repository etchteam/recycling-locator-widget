import { useSignal } from '@preact/signals';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';
import { Form, useRouteLoaderData } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/content/Icon/Icon';
import MaterialSearchInput from '@/components/control/MaterialSearchInput/MaterialSearchInput';
import '@/components/control/Details/Details';
import useAnalytics from '@/lib/useAnalytics';
import useFormValidation from '@/lib/useFormValidation';

import { PlaceLoaderResponse } from './place.loader';

export default function PlacePage() {
  const { t } = useTranslation();
  const { location } = useRouteLoaderData('place') as PlaceLoaderResponse;
  const { recordEvent } = useAnalytics();
  const form = useFormValidation('search');
  const search = useSignal<string>('');
  const materials = location.locations?.flatMap((l) => l.materials);
  const materialCategories = groupBy(materials, 'category.name');
  const hasSearchedForMaterial =
    search.value &&
    materials.some((material) =>
      material.name.toLowerCase().includes(search.value.toLowerCase()),
    );

  const handleSearch = (event) => {
    event.preventDefault();
    const value = new FormData(event.submitter.form).get('search') as string;

    if (value) {
      recordEvent({
        category: 'PlaceDetails::MaterialSearch',
        action: value,
      });

      search.value = value;
    }
  };

  return (
    <>
      <h3 id="material-search-title" className="diamond-spacing-bottom-md">
        {t('place.recycle.title')}
      </h3>

      <Form method="get" onSubmit={handleSearch}>
        <MaterialSearchInput
          inputLabelledBy="material-search-title"
          handleBlur={form.handleBlur}
          handleInput={form.handleInput}
          valid={form.valid.value}
        ></MaterialSearchInput>
      </Form>

      <div className="diamond-spacing-top-sm diamond-spacing-bottom-md">
        {search.value && (
          <diamond-enter type="fade">
            <diamond-card
              className={`theme-${hasSearchedForMaterial ? 'positive' : 'negative'}`}
              padding="sm"
              radius
            >
              <locator-icon-text>
                <locator-icon
                  icon={`${hasSearchedForMaterial ? 'tick' : 'cross'}-circle`}
                ></locator-icon>
                <p className="diamond-text-size-sm">
                  {t(
                    `place.recycle.search.${hasSearchedForMaterial ? 'positive' : 'negative'}`,
                  )}
                </p>
              </locator-icon-text>
            </diamond-card>
          </diamond-enter>
        )}
      </div>

      {Object.keys(materialCategories).map((category) => (
        <locator-details key={category} className="diamond-spacing-bottom-sm">
          <details>
            <summary>
              {upperFirst(category)}
              <locator-icon icon="expand" />
            </summary>
            <ul className="diamond-text-size-sm">
              {uniqBy(materialCategories[category], 'name').map((material) => (
                <li key={material.name}>{material.name}</li>
              ))}
            </ul>
          </details>
        </locator-details>
      ))}
    </>
  );
}
