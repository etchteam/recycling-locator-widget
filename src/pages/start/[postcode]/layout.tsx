import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';

import '../../../components/Wrap/Wrap';

export default function PostcodeLayout() {
  const { t } = useTranslation();

  return (
    <>
      <div slot="main">
        <Outlet />
      </div>
      <div slot="aside">
        <diamond-button>
          <button>{t('start.location.exploreTheMap')}</button>
        </diamond-button>
      </div>
    </>
  );
}
