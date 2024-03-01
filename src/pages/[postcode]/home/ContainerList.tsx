import '@/components/composition/Container/Container';
import '@/components/content/ContainerSvg/ContainerSvg';
import groupBy from 'lodash/groupBy';
import '@etchteam/diamond-ui/canvas/Card/Card';

import '@/components/control/Details/Details';
import containerName from '@/lib/containerName';
import {
  Container,
  LocalAuthority,
  OrganicStreamContainer,
} from '@/types/locatorApi';

export default function ContainerList({ la }: { readonly la: LocalAuthority }) {
  // TODO(WRAP-308): filter by scheme once the new API response is available
  const containers: (Container | OrganicStreamContainer)[] = [
    ...la.dryStreams.flatMap((scheme) => scheme.containers),
    ...la.organicStreams.flatMap((scheme) => scheme.containers),
  ];

  return (
    <>
      {containers.map((container) => {
        const materialCategories = groupBy(
          container.materials,
          'category.name',
        );

        return (
          <section className="diamond-spacing-bottom-lg" key={container.name}>
            <locator-container className="diamond-spacing-bottom-md">
              <locator-container-svg
                name={container.name}
                body-colour={container.bodyColour}
                lid-colour={container.lidColour}
              />
              {containerName(container)}
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
