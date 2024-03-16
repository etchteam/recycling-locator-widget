import { useSignal } from '@preact/signals';
import { ComponentChildren } from 'preact';
import { Suspense } from 'preact/compat';
import { useTranslation } from 'react-i18next';
import {
  Await,
  Link,
  Outlet,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Layout/Layout';
import '@/components/composition/PlacesHeader/PlacesHeader';
import '@/components/content/HeaderTitle/HeaderTitle';
import '@/components/content/Icon/Icon';
import '@/components/control/TagButton/TagButton';
import Menu from '@/components/control/Menu/Menu';
import { formatPostcode } from '@/lib/format';

import { usePlacesLoaderData } from './places.loader';

export default function PlacesLayout({
  children,
}: {
  readonly children?: ComponentChildren;
}) {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { data } = usePlacesLoaderData();
  const open = useSignal(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const materialId = searchParams.get('materialId');
  const materialName = searchParams.get('materialName');
  const query = materialId
    ? `?materialId=${materialId}&materialName=${materialName}`
    : '';

  const handleResetSearch = () => {
    searchParams.delete('materialId');
    searchParams.delete('materialName');
    setSearchParams(searchParams);
  };

  return (
    <locator-layout>
      {open.value ? (
        <locator-header slot="layout-header">
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
        </locator-header>
      ) : (
        <locator-places-header slot="layout-header">
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
              <p>{formatPostcode(postcode)}</p>
            </div>
          </locator-header-title>
          <locator-places-header-search>
            {materialName && (
              <Suspense fallback={null}>
                <Await resolve={data}>
                  {({ locations }) => (
                    <diamond-enter type="fade">
                      <locator-tag-button
                        variant={
                          locations?.length > 0 ? 'positive' : 'negative'
                        }
                      >
                        <button type="button" onClick={handleResetSearch}>
                          {materialName}
                          <locator-icon
                            icon="close"
                            label={t('actions.resetSearch')}
                          />
                        </button>
                      </locator-tag-button>
                    </diamond-enter>
                  )}
                </Await>
              </Suspense>
            )}
            <Link to={`/${postcode}/places/search${query}`}>
              {!materialName && t('places.searchPlaceholder')}
              <locator-icon icon="search" color="primary" />
            </Link>
          </locator-places-header-search>
        </locator-places-header>
      )}
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
