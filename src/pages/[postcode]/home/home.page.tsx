import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';

import containerName from '@/lib/containerName';
import '@/components/composition/Container/Container';
import '@/components/content/ContainerSvg/ContainerSvg';

import { useHomeRecyclingLoaderData } from './home.loader';

export default function HomeRecyclingPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { localAuthority } = useHomeRecyclingLoaderData();

  return (
    <section className="diamond-spacing-bottom-lg">
      <h3>{t('homeRecycling.collections.title')}</h3>
      <p>{t('homeRecycling.collections.help')}</p>
      {localAuthority.dryStreams.map((scheme) => {
        // TODO (WRAP-309): separate schemes by property type once the api is in place
        const safeSchemeName = encodeURIComponent(scheme.name);

        return (
          <Link
            to={`/${postcode}/home/collection?scheme=${safeSchemeName}`}
            key={safeSchemeName}
          >
            <diamond-card border radius>
              <h4 className="diamond-spacing-bottom-md">{scheme.name}</h4>
              <ul role="list" className="list-style-none">
                {scheme.containers.map((container) => (
                  <li
                    key={container.name}
                    className="diamond-spacing-bottom-sm"
                  >
                    <locator-container>
                      <locator-container-svg
                        name={container.name}
                        body-colour={container.bodyColour}
                        lid-colour={container.lidColour}
                      />
                      {containerName(container)}
                    </locator-container>
                  </li>
                ))}
              </ul>
            </diamond-card>
          </Link>
        );
      })}
    </section>
  );
}
