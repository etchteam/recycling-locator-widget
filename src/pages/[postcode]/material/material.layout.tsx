import { Suspense } from 'preact/compat';
import { useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import {
  Await,
  Link,
  Outlet,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/canvas/ContextHeader/ContextHeader';
import '@/components/canvas/Tip/Tip';
import '@/components/composition/Wrap/Wrap';
import '@/components/content/HeaderTitle/HeaderTitle';
import '@/components/content/Icon/Icon';
import TipContent from '@/components/template/TipContent/TipContent';
import config from '@/config';
import useAnalytics from '@/lib/useAnalytics';

import { useMaterialLoaderData } from './material.loader';

export default function MaterialLayout() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { recordEvent } = useAnalytics();
  const { data } = useMaterialLoaderData();
  const [searchParams] = useSearchParams();
  const materialId = searchParams.get('id');
  const materialName = searchParams.get('name');

  useEffect(() => {
    if (materialName) {
      recordEvent({
        category: 'MaterialResult::MaterialSearch',
        action: materialName,
      });
    }
  }, [materialName]);

  return (
    <locator-layout>
      <locator-header slot="layout-header">
        <locator-header-title>
          <diamond-button>
            <Link to={`/${postcode}`}>
              <locator-icon icon="arrow-left" label="Back"></locator-icon>
            </Link>
          </diamond-button>
          <div>
            <h2>{t('material.title')}</h2>
            <p>{postcode}</p>
          </div>
        </locator-header-title>
      </locator-header>
      <div slot="layout-main">
        {materialId && (
          <Link
            to={`/${postcode}/material/search`}
            className="diamond-text-decoration-none"
          >
            <locator-context-header>
              <div className="diamond-text-weight-bold">{materialName}</div>
              <locator-icon icon="search" color="primary" />
            </locator-context-header>
          </Link>
        )}
        <Outlet />
      </div>
      <locator-tip slot="layout-aside" text-align="center">
        <locator-wrap>
          <img
            className="diamond-spacing-bottom-sm"
            src={config.imagePath + 'material-tip.svg'}
            alt=""
          />
          <Suspense fallback={null}>
            <Await resolve={data}>
              {({ tip }) => <TipContent tip={tip} />}
            </Await>
          </Suspense>
        </locator-wrap>
      </locator-tip>
    </locator-layout>
  );
}
