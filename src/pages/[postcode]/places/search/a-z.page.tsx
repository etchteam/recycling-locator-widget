import groupBy from 'lodash/groupBy';
import { useTranslation } from 'react-i18next';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';

import '@/components/composition/Wrap/Wrap';
import '@/components/control/AlphabetNav/AlphabetNav';
import '@/components/composition/BorderedList/BorderedList';
import '@/components/content/Icon/Icon';
import tArray from '@/lib/tArray';

import { PlacesMaterialsLoaderResponse } from './materials.loader';

export default function AtoZPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { materials } = useLoaderData() as PlacesMaterialsLoaderResponse;
  const groupedMaterials = groupBy(materials, (material) =>
    material.name[0].toUpperCase(),
  );
  const availableLetters = Object.keys(groupedMaterials);

  function scrollToLetter(event: Event, letter: string) {
    event?.preventDefault();
    const element = (event.currentTarget as HTMLAnchorElement)
      ?.closest('locator-wrap')
      ?.querySelector(`#letter-${letter}`);

    if (element?.hasAttribute('disabled')) {
      return;
    }

    element?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function backToTop(event: Event) {
    event?.preventDefault();
    const element = (event.currentTarget as HTMLAnchorElement)
      ?.closest('locator-wrap')
      ?.querySelector('locator-alphabet-nav');

    element?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  return (
    <>
      <locator-alphabet-nav className="diamond-spacing-bottom-lg">
        <nav>
          <ul>
            {tArray('places.search.aToZ.alphabet').map((letter) => (
              <li key={letter}>
                <diamond-button width="square">
                  <Link
                    to={`#letter-${letter}`}
                    disabled={!availableLetters.includes(letter)}
                    aria-hidden={!availableLetters.includes(letter)}
                    onClick={(event) => scrollToLetter(event, letter)}
                  >
                    {letter}
                  </Link>
                </diamond-button>
              </li>
            ))}
          </ul>
        </nav>
      </locator-alphabet-nav>
      {availableLetters.map((letter) => (
        <>
          <diamond-grid>
            <diamond-grid-item grow shrink>
              <h3
                className="diamond-text-weight-bold diamond-text-size-h4"
                id={`letter-${letter}`}
              >
                {letter}
              </h3>
            </diamond-grid-item>
            <diamond-grid-item>
              <diamond-button variant="text" width="square" size="sm">
                <button type="button" onClick={backToTop}>
                  <locator-icon
                    icon="arrow-up"
                    label={t('places.search.aToZ.backToTop')}
                    color="primary"
                  />
                </button>
              </diamond-button>
            </diamond-grid-item>
          </diamond-grid>
          <locator-bordered-list
            className="diamond-spacing-bottom-md"
            size="sm"
          >
            <nav>
              <ul>
                {groupedMaterials[letter].map((material) => (
                  <li key={material.id}>
                    <Link
                      to={`/${postcode}/places?materialId=${material.id}&materialName=${encodeURIComponent(material.name)}`}
                    >
                      {material.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </locator-bordered-list>
        </>
      ))}
    </>
  );
}
