import { useTranslation } from 'react-i18next';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/composition/IconText/IconText';
import '@/components/content/Icon/Icon';
import '@/components/content/PlaceSummary/PlaceSummary';
import { HomeRecyclingCentreLoaderResponse } from './recycling-centre.loader';

export default function HomeRecyclingCentrePage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { locations } = useLoaderData() as HomeRecyclingCentreLoaderResponse;
  const tContext = 'homeRecycling.hwrc';
  const hwrcLocations = locations.filter((location) => location.is_hwrc);
  const hwrcLocationsCount = hwrcLocations.length;
  const otherLocations = locations.filter((location) => !location.is_hwrc);
  const otherLocationsCount = otherLocations.length;

  return (
    <>
      <section className="diamond-spacing-bottom-lg">
        <h3>{t(`${tContext}.title`)}</h3>
        <p>
          {t(
            `${tContext}.content${hwrcLocationsCount >= 30 ? 'ThirtyPlus' : ''}`,
            { count: hwrcLocationsCount },
          )}
        </p>
        {hwrcLocationsCount > 0 && (
          <>
            <diamond-card
              className="theme-info diamond-spacing-bottom-md"
              padding="sm"
              radius
            >
              <locator-icon-text>
                <locator-icon icon="info"></locator-icon>
                <p className="diamond-text-size-sm">{t(`${tContext}.info`)}</p>
              </locator-icon-text>
            </diamond-card>

            {hwrcLocations.map((location) => (
              <Link to={`/${postcode}/places/${location.id}`} key={location.id}>
                <diamond-card
                  className="diamond-spacing-bottom-sm"
                  border
                  radius
                >
                  <locator-place-summary>
                    <h4>{location.name}</h4>
                    <p>{location.address}</p>
                    <dl>
                      <dd>{location.distance}</dd>
                      <dt>{t('common.miles', { count: location.distance })}</dt>
                      <dd>{location.materials.length}</dd>
                      <dt>
                        {t('common.materialsAccepted', {
                          count: location.materials.length,
                        })}
                      </dt>
                    </dl>
                  </locator-place-summary>
                </diamond-card>
              </Link>
            ))}
          </>
        )}
      </section>

      <section className="diamond-spacing-bottom-lg">
        <h3 className="diamond-spacing-bottom-md">
          {t(`${tContext}.nearbyPlaces.title`)}
        </h3>
        <diamond-card border radius>
          <locator-icon-text className="diamond-spacing-bottom-md">
            <locator-icon-circle
              variant={otherLocationsCount === 0 ? 'negative' : 'positive'}
            >
              <locator-icon icon="place"></locator-icon>
            </locator-icon-circle>
            <h3>
              {t(
                `${tContext}.nearbyPlaces.content${otherLocationsCount >= 30 ? 'ThirtyPlus' : ''}`,
                {
                  count: otherLocationsCount,
                },
              )}
            </h3>
          </locator-icon-text>
          <diamond-button width="full-width">
            <diamond-grid>
              <diamond-grid-item small-mobile="6">
                <diamond-button width="full-width">
                  <Link to={`/${postcode}/places`}>
                    {t('actions.listPlaces')}
                  </Link>
                </diamond-button>
              </diamond-grid-item>
              <diamond-grid-item small-mobile="6">
                <diamond-button width="full-width">
                  <Link to={`/${postcode}/places?view=map`}>
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
