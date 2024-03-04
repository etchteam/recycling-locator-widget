import { ComponentChildren } from 'preact';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Layout/Layout';
import '@/components/composition/PlacesHeader/PlacesHeader';
import '@/components/content/HeaderTitle/HeaderTitle';
import '@/components/content/Icon/Icon';

export default function PlacesLayout({
  children,
}: {
  readonly children?: ComponentChildren;
}) {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const [searchParams] = useSearchParams();
  const materialId = searchParams.get('materialId');
  const materialName = searchParams.get('materialName');
  const query = materialId
    ? `?materialId=${materialId}&materialName=${materialName}`
    : '';

  return (
    <locator-layout>
      <locator-places-header slot="layout-header">
        <locator-header-title>
          <diamond-button>
            <Link to={`/${postcode}`}>
              <locator-icon icon="arrow-left" label="Back"></locator-icon>
            </Link>
          </diamond-button>
          <div>
            <h2>{t('places.title')}</h2>
            <p>{postcode}</p>
          </div>
        </locator-header-title>
        <locator-places-header-search active={Boolean(materialName)}>
          <Link to={`/${postcode}/places/search${query}`}>
            {materialName ?? t('places.searchPlaceholder')}
            <locator-icon icon="search" color="primary" />
          </Link>
        </locator-places-header-search>
      </locator-places-header>
      <div slot="layout-main">
        <Outlet />
        {children}
      </div>
    </locator-layout>
  );
}
