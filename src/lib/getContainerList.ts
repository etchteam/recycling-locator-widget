import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';

import { Container, LocalAuthorityProperty } from '@/types/locatorApi';

interface ContainerList {
  Dry?: LocalAuthorityProperty[];
  Residual?: Container[];
  Garden?: Container[];
  Food?: Container[];
}

export default function getContainerList(
  property: LocalAuthorityProperty[],
): ContainerList {
  const containerList: ContainerList = {};

  // Group the schemes by type
  const streamType = groupBy(property, 'type');

  // Create a list of unique containers for residual, garden and food
  ['Residual', 'Garden', 'Food'].forEach((type) => {
    if (!streamType[type]) {
      return;
    }

    const streamTypeContainers = streamType[type].flatMap(
      (scheme) => scheme.containers,
    );

    containerList[type] = uniqBy(streamTypeContainers, (container) => {
      return `${container.displayName}-${container.bodyColour}-${container.lidColour}`;
    });
  });

  return containerList;
}
