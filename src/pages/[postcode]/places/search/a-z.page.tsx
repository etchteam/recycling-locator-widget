import groupBy from 'lodash/groupBy';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';

import tArray from '@/lib/tArray';

import { PlacesMaterialsLoaderResponse } from './materials.loader';

export default function AtoZPage() {
  const { postcode } = useParams();
  const { materials } = useLoaderData() as PlacesMaterialsLoaderResponse;
  const groupedMaterials = groupBy(materials, (material) =>
    material.name[0].toUpperCase(),
  );
  const availableLetters = Object.keys(groupedMaterials);

  function scrollToLetter(event, letter: string) {
    event?.preventDefault();
    const element = event.currentTarget
      ?.closest('locator-wrap')
      ?.querySelector(`#letter-${letter}`);

    if (element?.hasAttribute('disabled')) {
      return;
    }

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
          <h3 className="diamond-text-weight-bold" id={`letter-${letter}`}>
            {letter}
          </h3>
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
