import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/content/Img/Img';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/composition/IconText/IconText';
import '@/components/content/Icon/Icon';

import config from '@/config';
import { Location } from '@/types/locatorApi';

function NoPlaces() {
  const { t } = useTranslation();
  const tContext = 'material.nearbyPlaces.noPlaces';

  return (
    <diamond-card border radius>
      <locator-icon-text className="diamond-spacing-bottom-xs">
        <locator-icon-circle variant="negative">
          <locator-icon icon="place"></locator-icon>
        </locator-icon-circle>
        <h3>{t(`${tContext}.title`)}</h3>
      </locator-icon-text>
      <p className="diamond-text-size-sm">{t(`${tContext}.content`)}</p>
      <diamond-button>
        <Link to="/">{t(`${tContext}.cta`)}</Link>
      </diamond-button>
    </diamond-card>
  );
}

function Places({ locations }: { readonly locations: Location[] }) {
  const { t } = useTranslation();
  const tContext = 'material.nearbyPlaces.places';
  const count = locations.length;

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
            i18nKey={`${tContext}.content${count >= 30 ? 'Thirty' : ''}`}
            components={{ bold: <strong /> }}
            values={{ count }}
          />
        </p>
      </diamond-card>
      <diamond-img object-fit="cover" aspectRatio="1.25/1" block responsive>
        <img
          src={`${config.imagePath}map-preview.webp`}
          width="240"
          height="240"
          alt=""
        />
      </diamond-img>
      <diamond-card>
        <diamond-grid>
          <diamond-grid-item small-mobile="6">
            <diamond-button width="full-width">
              <Link to="/">{t(`${tContext}.listCta`)}</Link>
            </diamond-button>
          </diamond-grid-item>
          <diamond-grid-item small-mobile="6">
            <diamond-button width="full-width">
              <Link to="/">{t(`${tContext}.mapCta`)}</Link>
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
  readonly locations: Location[];
}) {
  const hasLocations = locations.length > 0;

  if (hasLocations) {
    return <Places locations={locations} />;
  }

  return <NoPlaces />;
}
