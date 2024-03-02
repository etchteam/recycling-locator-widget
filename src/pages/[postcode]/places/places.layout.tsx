import { ComponentChildren } from 'preact';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useParams } from 'react-router-dom';
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
        <Outlet />
        {children}
      </div>
    </locator-layout>
  );
}
