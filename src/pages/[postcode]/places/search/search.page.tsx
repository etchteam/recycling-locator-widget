import { Suspense } from 'preact/compat';
import { useTranslation } from 'react-i18next';
import {
  Await,
  Form,
  useLoaderData,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';

import MaterialSearchInput from '@/components/control/MaterialSearchInput/MaterialSearchInput';
import PopularMaterials from '@/components/template/PopularMaterials/PopularMaterials';
import useFormValidation from '@/lib/useFormValidation';
import { Material } from '@/types/locatorApi';

import { PlacesSearchLoaderResponse } from './search.loader';

export default function PlacesSearchPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { data } = useLoaderData() as {
    data: Promise<PlacesSearchLoaderResponse>;
  };
  const [searchParams] = useSearchParams();
  const autofocus = searchParams.get('autofocus') === 'true';
  const form = useFormValidation('search');

  function generatePopularMaterialPath(material: Material) {
    return `/${postcode}/places?materialId=${material.id}&materialName=${encodeURIComponent(
      material.name,
    )}`;
  }

  return (
    <>
      <h3 id="places-search-label">{t('places.search.label')}</h3>
      <Form method="post" onSubmit={form.handleSubmit}>
        <diamond-form-group>
          <MaterialSearchInput
            inputLabelledBy="places-search-label"
            autofocus={autofocus}
            handleBlur={form.handleBlur}
            handleInput={form.handleInput}
            submitting={form.submitting.value}
            valid={form.valid.value}
          ></MaterialSearchInput>
        </diamond-form-group>
      </Form>
      <Suspense fallback={/* No loading UI necessary */ null}>
        <Await resolve={data}>
          {({ popularMaterials }) => (
            <PopularMaterials
              materials={popularMaterials}
              generatePath={generatePopularMaterialPath}
            />
          )}
        </Await>
      </Suspense>
    </>
  );
}
