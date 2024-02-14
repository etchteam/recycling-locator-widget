import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Wrap/Wrap';
import '@/components/content/Icon/Icon';
import '@/components/canvas/MapSvg/MapSvg';
import { usePostcodeLoaderData } from '@/lib/loaders/postcode';

export default function PostcodeLayout() {
  const { t } = useTranslation();
  const { postcode } = usePostcodeLoaderData();

  return (
    <>
      <div slot="main">
        <Outlet />
      </div>
      <locator-map-svg slot="aside">
        <diamond-button width="full-width">
          <Link to={`/${postcode}/places/map`}>
            {t('start.location.exploreTheMap')}
            <locator-icon icon="map" color="primary"></locator-icon>
          </Link>
        </diamond-button>
      </locator-map-svg>
    </>
  );
}
