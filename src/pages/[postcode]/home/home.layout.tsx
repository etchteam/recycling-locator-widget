import { useTranslation } from 'react-i18next';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
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
import '@/components/control/NavBar/NavBar';

import tArray from '@/lib/tArray';

import { useHomeRecyclingLoaderData } from './home.loader';

export default function HomeRecyclingLayout() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { localAuthority } = useHomeRecyclingLoaderData();

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
        <locator-nav-bar>
          <nav>
            <ul>
              <li>
                <NavLink to={`/${postcode}/home`} end>
                  {t('homeRecycling.nav.collections')}
                </NavLink>
              </li>
              <li>
                <NavLink to={`/${postcode}/home/recycling-centre`}>
                  {t('homeRecycling.nav.hwrc')}
                </NavLink>
              </li>
              <li>
                <NavLink to={`/${postcode}/home/contact`}>
                  {t('homeRecycling.nav.contact')}
                </NavLink>
              </li>
            </ul>
          </nav>
        </locator-nav-bar>
        <diamond-section padding="lg">
          <locator-wrap>
            <Outlet />
          </locator-wrap>
        </diamond-section>
      </div>
      <locator-tip slot="layout-aside">
        <locator-wrap>
          <img src="/images/recycling-technology.webp" alt="" />
          <p>{t('homeRecycling.aside.paragraph')}</p>
          <ul>
            {tArray('homeRecycling.aside.list').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </locator-wrap>
      </locator-tip>
    </locator-layout>
  );
}
