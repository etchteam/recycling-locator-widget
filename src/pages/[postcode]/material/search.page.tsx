import { Suspense } from 'preact/compat';
import { useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import {
  Await,
  Form,
  useLoaderData,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/composition/Wrap/Wrap';
import '@/components/composition/BorderedList/BorderedList';
import MaterialSearchInput from '@/components/control/MaterialSearchInput/MaterialSearchInput';
import PopularMaterials from '@/components/template/PopularMaterials/PopularMaterials';
import TipContent from '@/components/template/TipContent/TipContent';
import config from '@/config';
import useFormValidation from '@/lib/useFormValidation';
import { Material } from '@/types/locatorApi';

import { MaterialSearchLoaderResponse } from './search.loader';

export default function MaterialSearchPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const form = useFormValidation('search');
  const [searchParams] = useSearchParams();
  const materialName = searchParams.get('name');
  const { popularMaterials: popularMaterialsPromise, tip: tipPromise } =
    useLoaderData() as MaterialSearchLoaderResponse;

  useEffect(() => {
    form.submitting.value = false;
  }, [materialName]);

  function generatePopularMaterialPath(material: Material) {
    return `/${postcode}/material?id=${material.id}&name=${encodeURIComponent(
      material.name,
    )}`;
  }

  return (
    <>
      <div slot="layout-main">
        <locator-wrap>
          <diamond-section padding="lg">
            <diamond-enter type="fade" className="layer-one">
              {materialName && (
                <h3>
                  {t('material.search.notFound')}{' '}
                  <span className="diamond-text-weight-bold">
                    {materialName.toLocaleLowerCase()}
                  </span>
                </h3>
              )}
              <Form method="post" onSubmit={form.handleSubmit}>
                <diamond-form-group>
                  <label htmlFor="locator-material-input">
                    {t('actions.searchAgain')}
                  </label>
                  <MaterialSearchInput
                    handleBlur={form.handleBlur}
                    handleInput={form.handleInput}
                    submitting={form.submitting.value}
                    valid={form.valid.value}
                  ></MaterialSearchInput>
                  <p className="diamond-text-size-sm">
                    {t('material.search.help')}
                  </p>
                </diamond-form-group>
              </Form>
            </diamond-enter>

            <Suspense fallback={/* No loading UI necessary */ null}>
              <Await resolve={popularMaterialsPromise}>
                {(popularMaterials) => (
                  <PopularMaterials
                    materials={popularMaterials}
                    generatePath={generatePopularMaterialPath}
                  />
                )}
              </Await>
            </Suspense>
          </diamond-section>
        </locator-wrap>
      </div>
      <locator-tip slot="layout-aside" text-align="center">
        <locator-wrap>
          <img
            className="diamond-spacing-bottom-sm"
            src={config.imagePath + 'material-tip.svg'}
            alt=""
          />
          <Suspense fallback={null}>
            <Await resolve={tipPromise}>
              {(tip) => <TipContent tip={tip} />}
            </Await>
          </Suspense>
        </locator-wrap>
      </locator-tip>
    </>
  );
}
