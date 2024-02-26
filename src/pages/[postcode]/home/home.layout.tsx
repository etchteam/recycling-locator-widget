import { useTranslation } from 'react-i18next';
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/canvas/Tip/Tip';
import '@/components/composition/Wrap/Wrap';
import '@/components/content/HeaderTitle/HeaderTitle';
import '@/components/content/Icon/Icon';
import '@/components/control/Tabs/Tabs';
import { HomeRecyclingLoaderResponse } from './home.loader';

export default function HomeRecyclingLayout() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { localAuthority } = useLoaderData() as HomeRecyclingLoaderResponse;

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
            <h2>{t('homeRecycling.title')}</h2>
            <p>{localAuthority.name}</p>
          </div>
        </locator-header-title>
      </locator-header>
      <div slot="layout-main">
        <locator-tabs>
          <nav>
            <ul>
              <li>
                <NavLink to={`/${postcode}/home`} end>
                  Collections
                </NavLink>
              </li>
              <li>
                <NavLink to={`/${postcode}/home/recycling-centre`}>
                  Recycling Centre
                </NavLink>
              </li>
              <li>
                <NavLink to={`/${postcode}/home/contact`}>Contact</NavLink>
              </li>
            </ul>
          </nav>
        </locator-tabs>
        <Outlet />
      </div>
      <locator-tip slot="layout-aside">
        <locator-wrap>
          <img src="/images/recycling-technology.webp" alt="" />
          <p>{t('homeRecycling.aside.paragraph')}</p>
          <ul>
            {t('homeRecycling.aside.list').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </locator-wrap>
      </locator-tip>
    </locator-layout>
  );
}
