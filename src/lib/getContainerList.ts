import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';

import { Container, LocalAuthorityProperty } from '@/types/locatorApi';

export interface ContainerList {
  Dry?: LocalAuthorityProperty[];
  Garden?: Container[];
  Food?: Container[];
}

function containerHasMaterial(container: Container, search: string): boolean {
  return container.materials?.some(
    (material) => material.name.toLowerCase() === search.toLowerCase(),
  );
}

export function searchContainerList(
  containerList: ContainerList,
  search?: string,
): {
  containerList: ContainerList;
  containerCount?: number;
  searchResult?: 'positive' | 'negative';
} {
  if (!search) {
    return { containerList };
  }

  const filteredContainerList: ContainerList = {};

  filteredContainerList.Dry = containerList.Dry.map((scheme) => ({
    ...scheme,
    containers: scheme.containers.filter((container) =>
      containerHasMaterial(container, search),
    ),
  })).filter((scheme) => scheme.containers.length > 0);

  ['Garden', 'Food'].forEach((streamType) => {
    if (
      !containerList[streamType] ||
      !containerHasMaterial(containerList[streamType][0], search)
    ) {
      return;
    }

    filteredContainerList[streamType] = containerList[streamType];
  });

  const containerCount =
    filteredContainerList.Dry.length +
    (filteredContainerList.Garden?.length ?? 0) +
    (filteredContainerList.Food?.length ?? 0);

  if (containerCount === 0) {
    return { containerList, containerCount, searchResult: 'negative' };
  }

  return {
    containerList: filteredContainerList,
    containerCount,
    searchResult: 'positive',
  };
}

export default function getContainerList(
  property: LocalAuthorityProperty[],
): ContainerList {
  const containerList: ContainerList = {};

  // Group the schemes by type
  const streamType = groupBy(property, 'type');

  containerList.Dry = streamType.Dry ?? [];

  // Create a list of unique containers for garden and food
  ['Garden', 'Food'].forEach((type) => {
    if (!streamType[type]) {
      return;
    }

    const streamTypeContainers = streamType[type].flatMap(
      (scheme) => scheme.containers,
    );

    containerList[type] = uniqBy(streamTypeContainers, (container) => {
      return `${container.name}-${container.bodyColour}-${container.lidColour}`;
    });
  });

  return containerList;
}
