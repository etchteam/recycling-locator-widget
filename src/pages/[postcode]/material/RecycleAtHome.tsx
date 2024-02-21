import { useTranslation, Trans } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/content/Icon/Icon';
import '@/components/composition/BorderedList/BorderedList';
import '@/components/control/IconLink/IconLink';

import { MaterialLoaderResponse } from './material.loader';

export interface RecycleAtHomeProps {
  readonly schemes: MaterialLoaderResponse['recycleAtHome'];
}

function ManySchemes({
  schemes,
  schemesWithContainers,
}: {
  readonly schemes: MaterialLoaderResponse['recycleAtHome'];
  readonly schemesWithContainers: MaterialLoaderResponse['recycleAtHome'];
}) {
  const { postcode } = useParams();
  const tContext = 'material.recycleAtHome.manySchemes';
  const allSchemesRecycle = schemesWithContainers.length === schemes.length;
  const sortedSchemes = schemes.sort((scheme) => {
    return scheme.containers.length > 0 ? -1 : 1;
  });

  return (
    <>
      <p className="text-size-sm">
        <Trans
          i18nKey={`${tContext}.collection${allSchemesRecycle ? 'All' : 'Some'}`}
          components={{ bold: <strong /> }}
        />
      </p>
      <ul role="list" className="list-style-none diamond-spacing-bottom-md">
        {sortedSchemes.map((scheme) => {
          const safeSchemeName = encodeURIComponent(scheme.name);
          const recyclable = scheme.containers.length > 0;

          return (
            <li key={scheme.name} className="diamond-spacing-bottom-sm">
              <locator-icon-link>
                <Link
                  to={`/${postcode}/home/collection?scheme=${safeSchemeName}`}
                >
                  <locator-icon-circle>
                    <locator-icon
                      icon={recyclable ? 'tick' : 'close'}
                      color={recyclable ? 'positive' : 'negative'}
                    ></locator-icon>
                  </locator-icon-circle>
                  {scheme.name}
                </Link>
              </locator-icon-link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function RecycleAtHome({
  schemes,
}: {
  readonly schemes: MaterialLoaderResponse['recycleAtHome'];
}) {
  const { postcode } = useParams();
  const { t } = useTranslation();
  const schemesWithContainers = schemes.filter(
    (scheme) => scheme.containers.length > 0,
  );
  let type: 'oneScheme' | 'noSchemes' | 'manySchemes' = 'noSchemes';

  if (schemesWithContainers.length === 1) {
    type = 'oneScheme';
  }

  if (schemes.length > 1) {
    type = 'manySchemes';
  }

  return (
    <diamond-card border radius>
      <diamond-grid
        gap="sm"
        align-items="center"
        className="diamond-spacing-bottom-xs"
      >
        <diamond-grid-item>
          <locator-icon-circle
            variant={type === 'noSchemes' ? 'negative' : 'positive'}
          >
            <locator-icon icon="home"></locator-icon>
          </locator-icon-circle>
        </diamond-grid-item>
        <diamond-grid-item grow shrink>
          <h3>{t(`material.recycleAtHome.${type}.title`)}</h3>
        </diamond-grid-item>
      </diamond-grid>

      {type === 'noSchemes' && (
        <p className="text-size-sm">
          {t('material.recycleAtHome.noSchemes.content')}
        </p>
      )}

      {type === 'oneScheme' && <p>Todo</p>}

      {type === 'manySchemes' && (
        <ManySchemes
          schemes={schemes}
          schemesWithContainers={schemesWithContainers}
        />
      )}

      <diamond-button width="full-width">
        <Link to={`/${postcode}/home`}>{t(`material.recycleAtHome.cta`)}</Link>
      </diamond-button>
    </diamond-card>
  );
}
