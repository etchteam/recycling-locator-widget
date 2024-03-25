import { useTranslation } from 'react-i18next';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/composition/IconText/IconText';
import '@/components/content/Icon/Icon';
import Place from '@/components/template/Place/Place';
import PostCodeResolver from '@/lib/PostcodeResolver';

import { HomeRecyclingCentreLoaderResponse } from './recycling-centre.loader';

export default function HomeRecyclingCentrePage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { locations } = useLoaderData() as HomeRecyclingCentreLoaderResponse;
  const tContext = 'homeRecycling.hwrc';
  const hwrcLocations = locations.filter((location) =>
    location.locations.some((l) => l.locationType === 'HWRC'),
  );
  const hwrcLocationsCount = hwrcLocations.length;
  const otherLocationsCount = locations.length;

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

            {hwrcLocations.map((location) => {
              const locationPostcode =
                PostCodeResolver.extractPostcodeFromString(location.address);
              const locationName = encodeURIComponent(location.name);

              return (
                <Link
                  to={`/${postcode}/places/${locationName}/${locationPostcode}`}
                  key={location.id}
                >
                  <diamond-card
                    className="diamond-spacing-bottom-sm"
                    border
                    radius
                  >
                    <Place location={location} />
                  </diamond-card>
                </Link>
              );
            })}
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
                  <Link to={`/${postcode}/places/map`}>
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
