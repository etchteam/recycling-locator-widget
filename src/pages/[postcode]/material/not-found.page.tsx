import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Link,
  useLoaderData,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';

import '@/components/composition/Wrap/Wrap';
import '@/components/control/MaterialSearchInput/MaterialSearchInput';
import { NotFoundLoaderResponse } from './not-found.loader';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const [searchParams] = useSearchParams();
  const { popularMaterials } = useLoaderData() as NotFoundLoaderResponse;
  const materialName = searchParams.get('name');
  const submitting = useSignal(false);

  useEffect(() => {
    submitting.value = false;
  }, [materialName]);

  return (
    <locator-wrap>
      <diamond-section padding="lg">
        <h3>
          {t('material.notFound.title')}{' '}
          <span className="text-weight-bold">
            {materialName.toLocaleLowerCase()}
          </span>
        </h3>
        <Form method="post" onSubmit={() => (submitting.value = true)}>
          <diamond-form-group>
            <label htmlFor="locator-material-input">
              {t('material.notFound.label')}
            </label>
            <locator-material-search-input
              placeholder={t('components.materialSearchInput.placeholder')}
              submitting={submitting.value}
            ></locator-material-search-input>
            <p className="text-size-sm">{t('material.notFound.help')}</p>
          </diamond-form-group>
        </Form>

        {popularMaterials.length > 0 && (
          <locator-bordered-list size="sm" className="diamond-spacing-top-lg">
            <h3>{t('material.notFound.popular')}</h3>
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
        )}
      </diamond-section>
    </locator-wrap>
  );
}
