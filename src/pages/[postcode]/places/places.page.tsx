import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Wrap/Wrap';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/composition/IconText/IconText';
import '@/components/content/Icon/Icon';
import '@/components/content/PlaceSummary/PlaceSummary';
import '@/components/control/Fab/Fab';
import { usePlacesLoaderData } from './places.loader';

export default function PlacesPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { locations } = usePlacesLoaderData();
  const count = locations.length;

  return (
    <>
      <diamond-section padding="md">
        <diamond-wrap>
          <section className="diamond-spacing-bottom-lg">
            <p id="places-count">{t('places.count', { count })}</p>
            {count > 0 && (
              <locator-places-grid>
                <nav aria-labelledby="places-count">
                  <ul>
                    {locations.map((location) => (
                      <li key={`${location.id}`}>
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
                      </li>
                    ))}
                  </ul>
                </nav>
              </locator-places-grid>
            )}
          </section>
        </diamond-wrap>
      </diamond-section>
      <locator-tip text-align="center" wrap="wrap">
        {/* TODO(WRAP-232): swap this out for the proper tip once we have content */}
        <img src="/images/recycling-technology.webp" alt="" />
        <locator-tip-content>
          <p className="diamond-text-weight-bold">Did you know?</p>
          <h2>Putting the right stuff in the right bin is important.</h2>
          <p className="diamond-spacing-bottom-md">
            Most of us are getting it right, however, when too much contaminated
            material is collected it can prevent the whole lorry load of
            material from being recycled.
          </p>
          <diamond-button>
            <button>Tips to reduce contamination</button>
          </diamond-button>
          {/** Space for the fab */}
          <div className="diamond-spacing-bottom-xl"></div>
        </locator-tip-content>
      </locator-tip>
      <locator-fab>
        <diamond-button size="sm" variant="primary">
          <Link to={`/${postcode}/places/map`}>
            <locator-icon icon="map"></locator-icon>
            Show map
          </Link>
        </diamond-button>
      </locator-fab>
    </>
  );
}
