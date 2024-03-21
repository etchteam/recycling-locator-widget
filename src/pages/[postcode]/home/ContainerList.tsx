import groupBy from 'lodash/groupBy';
import uniqueId from 'lodash/uniqueId';
import nl2br from 'nl2br';
import { useTranslation } from 'react-i18next';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/content/Container/Container';
import '@/components/control/Details/Details';
import containerName from '@/lib/containerName';
import { LocalAuthorityProperty, Container } from '@/types/locatorApi';

type ContainerWithSchemeType = Container & {
  schemeType: 'Dry' | 'Food' | 'Garden' | 'Residual';
};

function useContainers(
  property: LocalAuthorityProperty[],
  search: string,
): {
  containers: ContainerWithSchemeType[];
  allContainers: ContainerWithSchemeType[];
  filteredContainers: ContainerWithSchemeType[];
} {
  const allContainers = property.flatMap((scheme) => {
    return scheme.containers.map((container) => ({
      ...container,
      schemeType: scheme.type,
    }));
  });

  const filteredContainers = search
    ? allContainers.filter((container) =>
        container.materials?.some(
          (material) => material.name.toLowerCase() === search.toLowerCase(),
        ),
      )
    : allContainers;

  const containers =
    filteredContainers.length > 0 ? filteredContainers : allContainers;

  return { containers, allContainers, filteredContainers };
}

function useSearchResultType(
  filteredContainerCount: number,
  search: string,
): 'positive' | 'negative' | undefined {
  if (search && filteredContainerCount === 0) {
    return 'negative';
  }

  if (search && filteredContainerCount > 0) {
    return 'positive';
  }

  return undefined;
}

export default function ContainerList({
  property,
  search,
}: {
  readonly property: LocalAuthorityProperty[];
  readonly search: string;
}) {
  const { t } = useTranslation();
  const { containers, filteredContainers } = useContainers(property, search);
  const filteredContainerCount = filteredContainers.length;
  const searchResultType = useSearchResultType(filteredContainerCount, search);

  return (
    <>
      <div className="diamond-spacing-bottom-lg">
        {searchResultType && (
          <diamond-enter type="fade">
            <diamond-card
              className={`theme-${searchResultType}`}
              padding="sm"
              radius
            >
              <locator-icon-text>
                <locator-icon
                  icon={`${searchResultType === 'positive' ? 'tick' : 'cross'}-circle`}
                ></locator-icon>
                <p className="diamond-text-size-sm">
                  {t(`homeRecycling.collection.search.${searchResultType}`, {
                    count: filteredContainerCount,
                  })}
                </p>
              </locator-icon-text>
            </diamond-card>
          </diamond-enter>
        )}
      </div>

      {containers.map((container) => {
        const materialCategories = groupBy(
          container.materials,
          'category.name',
        );

        return (
          <section
            className="diamond-spacing-bottom-lg"
            key={uniqueId(container.name)}
          >
            <locator-container className="diamond-spacing-bottom-md">
              <locator-container-svg
                name={container.name}
                body-colour={container.bodyColour}
                lid-colour={container.lidColour}
              />
              <locator-container-content>
                <locator-container-name>
                  <h4>{containerName(container)}</h4>
                </locator-container-name>
                {container.cost ? (
                  <locator-container-subscription>
                    {t('components.container.subscription', {
                      cost: container.cost,
                    })}
                  </locator-container-subscription>
                ) : null}
              </locator-container-content>
            </locator-container>
            {Object.keys(materialCategories)?.map((category) => (
              <locator-details
                key={category}
                className="diamond-spacing-bottom-sm"
              >
                <details>
                  <summary>
                    {category}
                    <locator-icon icon="expand" />
                  </summary>
                  <ul className="diamond-text-size-sm">
                    {materialCategories[category].map((material) => (
                      <li key={material.name}>{material.name}</li>
                    ))}
                  </ul>
                </details>
              </locator-details>
            ))}
            {container.schemeType === 'Residual' && (
              <locator-details className="diamond-spacing-bottom-sm">
                <details>
                  <summary>
                    {t('components.container.residualWaste')}
                    <locator-icon icon="expand" />
                  </summary>
                  <p className="diamond-text-size-sm">
                    {t('components.container.residualWasteDescription')}
                  </p>
                </details>
              </locator-details>
            )}
            {container.notes?.length > 0 && (
              <locator-details className="diamond-spacing-bottom-sm">
                <details>
                  <summary>
                    <locator-details-summary-content>
                      <span className="diamond-text-size-sm">
                        {t('components.container.notes')}
                      </span>
                      <locator-details-summary-preview>
                        {container.notes}
                      </locator-details-summary-preview>
                    </locator-details-summary-content>
                    <locator-icon icon="expand" />
                  </summary>
                  <p
                    className="diamond-text-size-sm"
                    dangerouslySetInnerHTML={{
                      __html: nl2br(container.notes.join('\n\n')),
                    }}
                  />
                </details>
              </locator-details>
            )}
          </section>
        );
      })}
    </>
  );
}
