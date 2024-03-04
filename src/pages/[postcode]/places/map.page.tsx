import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/content/Icon/Icon';
import '@/components/control/Fab/Fab';

export default function PlacesMapPage() {
  const { postcode } = useParams();
  const { t } = useTranslation();

  return (
    <>
      <h3>Map</h3>
      <diamond-enter type="fade" delay={0.25}>
        <locator-fab>
          <diamond-button size="sm" variant="primary">
            <Link to={`/${postcode}/places`}>
              <locator-icon icon="list"></locator-icon>
              {t('actions.showList')}
            </Link>
          </diamond-button>
        </locator-fab>
      </diamond-enter>
    </>
  );
}
