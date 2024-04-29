import uniqueId from 'lodash/uniqueId';
import { useTranslation } from 'react-i18next';

import '@/components/content/Container/Container';
import containerName from '@/lib/containerName';
import { Container } from '@/types/locatorApi';

export default function SchemeContainerSummary({
  containers,
  limit = 2,
}: {
  readonly containers: Container[];
  readonly limit?: number;
}) {
  const { t } = useTranslation();
  const firstContainers = containers.slice(0, limit);
  const remainingContainers = containers.slice(limit);

  return (
    <ul role="list" className="list-style-none diamond-spacing-bottom-md">
      {firstContainers.map((container) => (
        <li
          key={uniqueId(container.name)}
          className="diamond-spacing-bottom-sm"
        >
          <locator-container>
            <locator-container-svg
              name={container.name}
              body-colour={container.bodyColour}
              lid-colour={container.lidColour}
            />
            <locator-container-content>
              <locator-container-name>
                {containerName(container)}
              </locator-container-name>
            </locator-container-content>
          </locator-container>
        </li>
      ))}
      {remainingContainers.length > 0 && (
        <li>
          {t('components.schemeContainerSummary.otherContainers', {
            count: remainingContainers.length,
          })}
        </li>
      )}
    </ul>
  );
}
