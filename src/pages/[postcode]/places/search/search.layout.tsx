import { ComponentChildren } from 'preact';
import { useTranslation } from 'react-i18next';
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/composition/Wrap/Wrap';
import '@/components/content/HeaderTitle/HeaderTitle';
import '@/components/content/Icon/Icon';
import '@/components/control/NavBar/NavBar';

export default function PlacesSearchLayout({
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
      <locator-header slot="layout-header">
        <locator-header-title>
          <h2>{t('places.search.title')}</h2>
        </locator-header-title>
        <diamond-button width="square" size="sm">
          <Link to={`/${postcode}/places${query}`}>
            <locator-icon
              icon="close"
              color="primary"
              label={t('actions.close')}
            />
          </Link>
        </diamond-button>
      </locator-header>
      <div slot="layout-main">
        <locator-nav-bar>
          <nav>
            <ul>
              <li>
                <NavLink to={`/${postcode}/places/search`} end>
                  {t('places.search.nav.search')}
                </NavLink>
              </li>
              <li>
                <NavLink to={`/${postcode}/places/search/popular`}>
                  {t('places.search.nav.popular')}
                </NavLink>
              </li>
            </ul>
          </nav>
        </locator-nav-bar>
        <diamond-section padding="lg">
          <locator-wrap>
            <Outlet />
            {children}
          </locator-wrap>
        </diamond-section>
      </div>
    </locator-layout>
  );
}
