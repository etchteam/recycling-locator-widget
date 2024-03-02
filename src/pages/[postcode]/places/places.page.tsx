import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Wrap/Wrap';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/composition/IconText/IconText';
import '@/components/content/Icon/Icon';
import '@/components/content/PlaceSummary/PlaceSummary';
import { usePlacesLoaderData } from './places.loader';

export default function PlacesPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { locations } = usePlacesLoaderData();
  const count = locations.length;

  return (
    <diamond-section padding="md">
      <diamond-wrap>
        <section className="diamond-spacing-bottom-lg">
          <p>{t('places.count', { count })}</p>
          <diamond-grid wrap="wrap">
            {count > 0 &&
              locations.map((location) => (
                <diamond-grid-item
                  key={`${location.id}`}
                  small-mobile="12"
                  small-tablet="6"
                  small-desktop="4"
                >
                  <Link to={`/${postcode}/places/${location.id}`}>
                    <diamond-card border radius>
                      <locator-place-summary>
                        <h4>{location.name}</h4>
                        <p>{location.address}</p>
                        <dl>
                          <dd>{location.distance}</dd>
                          <dt>{t('common.miles')}</dt>
                          <dd>{location.materials.length}</dd>
                          <dt>{t('common.materialsAccepted')}</dt>
                        </dl>
                      </locator-place-summary>
                    </diamond-card>
                  </Link>
                </diamond-grid-item>
              ))}
          </diamond-grid>
        </section>

        <section>Tip</section>
      </diamond-wrap>
    </diamond-section>
  );
}
