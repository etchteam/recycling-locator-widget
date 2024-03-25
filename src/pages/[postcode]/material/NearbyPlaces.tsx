import { useTranslation, Trans } from 'react-i18next';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/content/Img/Img';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/composition/IconText/IconText';
import '@/components/content/Icon/Icon';
import PlacesMap from '@/components/control/PlacesMap/PlacesMap';
import { LocationsResponse } from '@/types/locatorApi';

function NoPlaces() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const tContext = 'material.nearbyPlaces.noPlaces';

  return (
    <diamond-card border radius>
      <locator-icon-text className="diamond-spacing-bottom-xs">
        <locator-icon-circle variant="negative">
          <locator-icon icon="place"></locator-icon>
        </locator-icon-circle>
        <h3>{t(`${tContext}.title`)}</h3>
      </locator-icon-text>
      <p className="diamond-text-size-sm">
        {t(`${tContext}.content`, { postcode })}
      </p>
      <diamond-button width="full-width">
        <Link to={`/${postcode}/material/search`}>
          {t('actions.searchAgain')}
        </Link>
      </diamond-button>
    </diamond-card>
  );
}

function Places({ locations }: { readonly locations: LocationsResponse }) {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const [searchParams] = useSearchParams();
  const materialId = searchParams.get('id');
  const materialName = searchParams.get('name');
  const tContext = 'material.nearbyPlaces.places';
  const count = locations.items.length;

  return (
    <diamond-card padding="none" border radius>
      <diamond-card>
        <locator-icon-text className="diamond-spacing-bottom-xs">
          <locator-icon-circle variant="positive">
            <locator-icon icon="place"></locator-icon>
          </locator-icon-circle>
          <h3>{t(`${tContext}.title`)}</h3>
        </locator-icon-text>
        <p className="diamond-text-size-sm">
          <Trans
            i18nKey={`${tContext}.content${count >= 30 ? 'ThirtyPlus' : ''}`}
            components={{ bold: <strong /> }}
            values={{ count }}
          />
        </p>
      </diamond-card>
      <locator-places-map-wrapper>
        <PlacesMap
          latitude={locations.meta.latitude}
          longitude={locations.meta.longitude}
          locations={locations.items}
          static
        />
      </locator-places-map-wrapper>
      <diamond-card>
        <diamond-grid>
          <diamond-grid-item small-mobile="6">
            <diamond-button width="full-width">
              <Link
                to={`/${postcode}/places?materialId=${materialId}&materialName=${materialName}`}
              >
                {t('actions.listPlaces')}
              </Link>
            </diamond-button>
          </diamond-grid-item>
          <diamond-grid-item small-mobile="6">
            <diamond-button width="full-width">
              <Link
                to={`/${postcode}/places/map?materialId=${materialId}&materialName=${materialName}`}
              >
                {t('actions.showMap')}
              </Link>
            </diamond-button>
          </diamond-grid-item>
        </diamond-grid>
      </diamond-card>
    </diamond-card>
  );
}

export default function NearbyPlaces({
  locations,
}: {
  readonly locations: LocationsResponse;
}) {
  const hasLocations = locations.items.length > 0;

  if (hasLocations) {
    return <Places locations={locations} />;
  }

  return <NoPlaces />;
}
