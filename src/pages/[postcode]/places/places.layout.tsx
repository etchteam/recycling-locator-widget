import { useSignal } from '@preact/signals';
import { ComponentChildren } from 'preact';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Layout/Layout';
import '@/components/composition/PlacesHeader/PlacesHeader';
import '@/components/content/HeaderTitle/HeaderTitle';
import '@/components/content/Icon/Icon';
import Menu from '@/components/control/Menu/Menu';

export default function PlacesLayout({
  children,
}: {
  readonly children?: ComponentChildren;
}) {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const [searchParams] = useSearchParams();
  const open = useSignal(false);
  const materialId = searchParams.get('materialId');
  const materialName = searchParams.get('materialName');
  const query = materialId
    ? `?materialId=${materialId}&materialName=${materialName}`
    : '';

  return (
    <locator-layout>
      <locator-header slot="layout-header">
        {open.value ? (
          <locator-header-content>
            <locator-logo></locator-logo>
            <diamond-button width="square" size="sm">
              <button
                type="button"
                aria-expanded="true"
                aria-controls="locator-layout-main"
                onClick={() => (open.value = !open.value)}
              >
                <locator-icon
                  icon="close"
                  label={t('actions.close')}
                  color="primary"
                ></locator-icon>
              </button>
            </diamond-button>
          </locator-header-content>
        ) : (
          <>
            <locator-header-logo>
              <Link to="/">
                <locator-logo type="logo-only"></locator-logo>
              </Link>
            </locator-header-logo>
            <locator-places-header>
              <locator-header-title>
                <diamond-button>
                  <button
                    type="button"
                    aria-expanded="false"
                    aria-controls="locator-layout-main"
                    onClick={() => (open.value = !open.value)}
                  >
                    <locator-icon
                      icon="menu"
                      label={t('actions.menu')}
                    ></locator-icon>
                  </button>
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
          </>
        )}
      </locator-header>
      <div slot="layout-main" id="locator-layout-main">
        {open.value ? (
          <Menu />
        ) : (
          <>
            <Outlet />
            {children}
          </>
        )}
      </div>
    </locator-layout>
  );
}
