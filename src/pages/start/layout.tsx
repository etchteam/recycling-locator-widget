import { Outlet, Link, useLocation } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/content/Logo/Logo';
import '@/components/content/Icon/Icon';

function InfoButton({ pathname }: { readonly pathname: string }) {
  const open = pathname.includes('/about');
  const previousPath = pathname.replace('/about', '') || '/';
  const aboutPath = `${previousPath === '/' ? '' : previousPath}/about`;
  const to = open ? previousPath : aboutPath;
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
  const location = useLocation();

  return (
    <locator-layout>
      <locator-header slot="header">
        <locator-logo slot="header"></locator-logo>
        <InfoButton pathname={location.pathname} />
      </locator-header>
      <Outlet />
    </locator-layout>
  );
}
