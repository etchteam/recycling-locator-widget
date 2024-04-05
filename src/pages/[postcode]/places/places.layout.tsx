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
import formatPostcode from '@/lib/formatPostcode';

import { usePlacesLoaderData } from './places.loader';

export default function PlacesLayout({
  children,
}: {
  readonly children?: ComponentChildren;
}) {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { locations: locationsPromise } = usePlacesLoaderData();
  const open = useSignal(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const materialId = searchParams.get('materialId');
  const materialName = searchParams.get('materialName');
  const query = materialId
    ? `?materialId=${materialId}&materialName=${materialName}&autofocus=true`
    : '?autofocus=true';

  const handleResetSearch = () => {
    searchParams.delete('materialId');
    searchParams.delete('materialName');
    setSearchParams(searchParams);
  };

  return (
    <locator-layout>
      <locator-header slot="layout-header">
        {open.value ? (
          <locator-header-content>
            <Link to={`/${postcode}`}>
              <locator-logo></locator-logo>
            </Link>
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
              <Link to={`/${postcode}`}>
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
                  <p>{formatPostcode(postcode)}</p>
                </div>
              </locator-header-title>
              <locator-places-header-search>
                {materialName && (
                  <Suspense fallback={null}>
                    <Await resolve={locationsPromise}>
                      {(locations) => (
                        <diamond-enter type="fade">
                          <locator-tag-button
                            variant={
                              locations?.items.length > 0 &&
                              materialId !== 'undefined'
                                ? 'positive'
                                : 'negative'
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
                <Link
                  to={`/${postcode}/places/search${query}`}
                  unstable_viewTransition
                >
                  {!materialName && t('places.searchPlaceholder')}
                  <locator-icon icon="search" color="primary" />
                </Link>
              </locator-places-header-search>
            </locator-places-header>
          </>
        )}
      </locator-header>
      <div slot="layout-main" id="locator-layout-main">
        {open.value ? (
          <Menu handleClose={() => (open.value = false)} />
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
