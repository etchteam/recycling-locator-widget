import groupBy from 'lodash/groupBy';
import uniqueId from 'lodash/uniqueId';
import { useTranslation } from 'react-i18next';
import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/content/Container/Container';
import '@/components/control/Details/Details';
import containerName from '@/lib/containerName';
import { LocalAuthorityProperty, Container } from '@/types/locatorApi';

function useContainers(
  property: LocalAuthorityProperty[],
  search: string,
): {
  containers: Container[];
  allContainers: Container[];
  filteredContainers: Container[];
} {
  const allContainers = property.flatMap((scheme) => scheme.containers);

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
                {container.cost && (
                  <locator-container-subscription>
                    {t('components.container.subscription', {
                      cost: container.cost,
                    })}
                  </locator-container-subscription>
                )}
                {container.notes && (
                  <locator-container-notes>
                    {container.notes}
                  </locator-container-notes>
                )}
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
          </section>
        );
      })}
    </>
  );
}
