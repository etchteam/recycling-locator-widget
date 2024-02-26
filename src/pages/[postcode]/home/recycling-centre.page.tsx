import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/composition/IconText/IconText';
import '@/components/content/Icon/Icon';

export default function HomeRecyclingCentrePage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const tContext = 'homeRecycling.hwrc';

  return (
    <>
      <section className="diamond-spacing-bottom-lg">
        <h3>{t(`${tContext}.title`)}</h3>
        <p>{t(`${tContext}.content`, { count: 1 })}</p>
        <diamond-card className="theme-info" padding="sm" radius>
          <diamond-grid gap="sm">
            <diamond-grid-item>
              <locator-icon icon="info"></locator-icon>
            </diamond-grid-item>
            <diamond-grid-item grow shrink>
              <p className="diamond-text-size-sm">{t(`${tContext}.info`)}</p>
            </diamond-grid-item>
          </diamond-grid>
        </diamond-card>
      </section>

      <section className="diamond-spacing-bottom-lg">
        <h3 className="diamond-spacing-bottom-md">
          {t(`${tContext}.nearbyPlaces.title`)}
        </h3>
        <diamond-card border radius>
          <locator-icon-text className="diamond-spacing-bottom-md">
            <locator-icon-circle variant="positive">
              <locator-icon icon="place"></locator-icon>
            </locator-icon-circle>
            <h3>{t(`${tContext}.nearbyPlaces.content`, { count: 1 })}</h3>
          </locator-icon-text>
          <diamond-button width="full-width">
            <diamond-grid>
              <diamond-grid-item small-mobile="6">
                <diamond-button width="full-width">
                  <Link to={`/${postcode}/places-list?${location.search}`}>
                    {t('actions.listPlaces')}
                  </Link>
                </diamond-button>
              </diamond-grid-item>
              <diamond-grid-item small-mobile="6">
                <diamond-button width="full-width">
                  <Link to={`/${postcode}/places-map?${location.search}`}>
                    {t('actions.showMap')}
                  </Link>
                </diamond-button>
              </diamond-grid-item>
            </diamond-grid>
          </diamond-button>
        </diamond-card>
      </section>
    </>
  );
}
