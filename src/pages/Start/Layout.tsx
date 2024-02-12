import { Outlet, Link, useHref } from 'react-router-dom';

import '../../components/Layout/Layout';
import '../../components/Logo/Logo';
import '../../components/Icon/Icon';
import '../../components/Header/Header';
import '../../components/Tip/Tip';
import '../../components/Wrap/Wrap';

function InfoButton({ open }: { readonly open: boolean }) {
  const to = open ? '/' : '/about';
  const icon = open ? 'close' : 'info';

  return (
    <diamond-button variant="text">
      <Link to={to}>
        <locator-icon icon={icon} color="primary"></locator-icon>
      </Link>
    </diamond-button>
  );
}

export default function StartLayout() {
  const path = useHref();

  return (
    <locator-layout>
      <locator-header slot="header">
        <locator-logo slot="header"></locator-logo>
        <InfoButton open={path === '/about'} />
      </locator-header>
      <locator-wrap slot="main">
        <diamond-section padding="lg">
          <Outlet />
        </diamond-section>
      </locator-wrap>
      <locator-tip slot="aside">
        <locator-wrap>
          <p>Use this service to:</p>
          <ul>
            <li>see your nearest places to recycle</li>
            <li>find out how to recycle a specific item</li>
            <li>check what you can recycle at home</li>
          </ul>
          <img src="/images/recycling-technology.webp" alt="" />
        </locator-wrap>
      </locator-tip>
    </locator-layout>
  );
}
