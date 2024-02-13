import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';

import '../../components/Wrap/Wrap';

export default function StartLocationPage() {
  const { t } = useTranslation();

  return (
    <>
      <locator-wrap slot="main">
        <diamond-section padding="lg">
          <Outlet />
        </diamond-section>
      </locator-wrap>
      <div slot="aside">
        <diamond-button>
          <button>{t('start.location.exploreTheMap')}</button>
        </diamond-button>
      </div>
    </>
  );
}
