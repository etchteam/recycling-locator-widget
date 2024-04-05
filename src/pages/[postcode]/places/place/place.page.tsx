import { useSignal } from '@preact/signals';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import upperFirst from 'lodash/upperFirst';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Await, Form } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/content/Icon/Icon';
import MaterialSearchInput from '@/components/control/MaterialSearchInput/MaterialSearchInput';
import '@/components/control/Details/Details';
import useAnalytics from '@/lib/useAnalytics';
import useFormValidation from '@/lib/useFormValidation';
import { Location } from '@/types/locatorApi';

import { usePlaceLoaderData } from './place.loader';

function Loading() {
  return (
    <diamond-enter type="fade-in-up">
      <locator-loading-card />
    </diamond-enter>
  );
}

function PlacePageContent({ location }: { readonly location: Location }) {
  const { t } = useTranslation();
  const form = useFormValidation('search');
  const { recordEvent } = useAnalytics();
  const search = useSignal<string>('');
  const materials = location.locations?.flatMap((l) => l.materials);
  const materialCategories = groupBy(materials, 'category.name');
  const hasSearchedForMaterial =
    search.value &&
    materials.some((material) =>
      material.name.toLowerCase().includes(search.value.toLowerCase()),
    );

  if (location.error) {
    throw new Error(location.error);
  }

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
      <diamond-enter type="fade" className="layer-one">
        <Form method="get" onSubmit={handleSearch}>
          <MaterialSearchInput
            inputLabelledBy="material-search-title"
            handleBlur={form.handleBlur}
            handleInput={form.handleInput}
            valid={form.valid.value}
          ></MaterialSearchInput>
        </Form>
      </diamond-enter>

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

      <diamond-enter type="fade-in-up" delay={0.25}>
        {Object.keys(materialCategories).map((category) => (
          <locator-details key={category} className="diamond-spacing-bottom-sm">
            <details>
              <summary>
                {upperFirst(category)}
                <locator-icon icon="expand" />
              </summary>
              <ul className="diamond-text-size-sm">
                {uniqBy(materialCategories[category], 'name').map(
                  (material) => (
                    <li key={material.name}>{material.name}</li>
                  ),
                )}
              </ul>
            </details>
          </locator-details>
        ))}
      </diamond-enter>
    </>
  );
}

export default function PlacePage() {
  const { t } = useTranslation();
  const { location: locationPromise } = usePlaceLoaderData();

  return (
    <>
      <h3 id="material-search-title" className="diamond-spacing-bottom-md">
        {t('place.recycle.title')}
      </h3>

      <Suspense fallback={<Loading />}>
        <Await resolve={locationPromise}>
          {(location) => <PlacePageContent location={location} />}
        </Await>
      </Suspense>
    </>
  );
}
