import { ComponentChildren } from 'preact';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
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
  const materialName = searchParams.get('materialName');

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
            <h2>{t('places.title')}</h2>
            <p>{postcode}</p>
          </div>
        </locator-header-title>
      </locator-header>
      <div slot="layout-main">
        <Link
          to={`/${postcode}/material/search`}
          className="diamond-text-decoration-none"
        >
          <locator-context-header>
            {materialName ? (
              <span className="diamond-text-weight-bold">{materialName}</span>
            ) : (
              t('places.searchPlaceholder')
            )}
            <locator-icon icon="search" color="primary" />
          </locator-context-header>
        </Link>
        <Outlet />
        {children}
      </div>
    </locator-layout>
  );
}
