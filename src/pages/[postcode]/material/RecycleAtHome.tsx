import { useTranslation, Trans } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/content/Icon/Icon';
import '@/components/composition/BorderedList/BorderedList';
import '@/components/composition/Container/Container';
import '@/components/control/IconLink/IconLink';
import '@/components/content/ContainerSvg/ContainerSvg';

import containerName from '@/lib/containerName';
import { DryScheme } from '@/types/locatorApi';

function ManySchemes({
  schemes,
  schemesCollectingThisMaterial,
}: {
  readonly schemes: DryScheme[];
  readonly schemesCollectingThisMaterial: DryScheme[];
}) {
  const { postcode } = useParams();
  const tContext = 'material.recycleAtHome.manySchemes';
  const allSchemesRecycle =
    schemesCollectingThisMaterial.length === schemes.length;
  const sortedSchemes = schemes.toSorted((scheme) => {
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

function OneScheme({ scheme }: { readonly scheme: DryScheme }) {
  const { t } = useTranslation();
  const tContext = 'material.recycleAtHome.oneScheme';
  const firstTwoContainers = scheme.containers.slice(0, 2);
  const remainingContainers = scheme.containers.slice(2);

  return (
    <>
      <p className="text-size-sm">
        {t(`${tContext}.collection`, { count: scheme.containers.length })}
      </p>
      <ul role="list" className="list-style-none diamond-spacing-bottom-md">
        {firstTwoContainers.map((container) => (
          <li key={container.name} className="diamond-spacing-bottom-sm">
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
        {remainingContainers.length > 0 && (
          <li>
            {t(`${tContext}.otherContainers`, {
              count: remainingContainers.length,
            })}
          </li>
        )}
      </ul>
    </>
  );
}

export default function RecycleAtHome({
  schemes,
}: {
  readonly schemes: DryScheme[];
}) {
  const { postcode } = useParams();
  const { t } = useTranslation();
  const schemesCollectingThisMaterial = schemes.filter(
    (scheme) => scheme.containers.length > 0,
  );
  let type: 'oneScheme' | 'noSchemes' | 'manySchemes' = 'noSchemes';

  if (schemes.length === 1 && schemesCollectingThisMaterial.length === 1) {
    type = 'oneScheme';
  }

  if (schemes.length > 1 && schemesCollectingThisMaterial.length >= 1) {
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

      {type === 'oneScheme' && <OneScheme scheme={schemes[0]} />}

      {type === 'manySchemes' && (
        <ManySchemes
          schemes={schemes}
          schemesCollectingThisMaterial={schemesCollectingThisMaterial}
        />
      )}

      <diamond-button width="full-width">
        <Link to={`/${postcode}/home`}>{t(`material.recycleAtHome.cta`)}</Link>
      </diamond-button>
    </diamond-card>
  );
}