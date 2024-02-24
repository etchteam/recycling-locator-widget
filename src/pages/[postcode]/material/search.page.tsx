import { useSignal } from '@preact/signals';
import { Suspense } from 'preact/compat';
import { useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import {
  Await,
  Form,
  Link,
  useAsyncValue,
  useLoaderData,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/composition/Wrap/Wrap';
import '@/components/control/MaterialSearchInput/MaterialSearchInput';

import { MaterialSearchLoaderResponse } from './search.loader';

function PopularMaterials() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { popularMaterials } = useAsyncValue() as MaterialSearchLoaderResponse;

  if (popularMaterials.length === 0) {
    return null;
  }

  return (
    <diamond-enter type="fade-in-up">
      <locator-bordered-list size="sm" className="diamond-spacing-top-lg">
        <h3>{t('material.search.popular')}</h3>
        <nav>
          <ul>
            {popularMaterials.map(({ id, name }) => (
              <li key={id}>
                <Link
                  to={`/${postcode}/material?id=${id}&name=${encodeURIComponent(name)}`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </locator-bordered-list>
    </diamond-enter>
  );
}

export default function MaterialSearchPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { data } = useLoaderData() as {
    data: Promise<MaterialSearchLoaderResponse>;
  };
  const materialName = searchParams.get('name');
  const submitting = useSignal(false);

  useEffect(() => {
    submitting.value = false;
  }, [materialName]);

  return (
    <locator-wrap>
      <diamond-section padding="lg">
        {materialName && (
          <h3>
            {t('material.search.notFound')}{' '}
            <span className="diamond-text-weight-bold">
              {materialName.toLocaleLowerCase()}
            </span>
          </h3>
        )}
        <Form method="post" onSubmit={() => (submitting.value = true)}>
          <diamond-form-group>
            <label htmlFor="locator-material-input">
              {t('actions.searchAgain')}
            </label>
            <locator-material-search-input
              placeholder={t('components.materialSearchInput.placeholder')}
              submitting={submitting.value}
            ></locator-material-search-input>
            <p className="diamond-text-size-sm">{t('material.search.help')}</p>
          </diamond-form-group>
        </Form>

        <Suspense fallback={/* No loading UI necessary */ null}>
          <Await resolve={data}>
            <PopularMaterials />
          </Await>
        </Suspense>
      </diamond-section>
    </locator-wrap>
  );
}
