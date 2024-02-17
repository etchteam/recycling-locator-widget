import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import { RecyclingLocatorAttributes } from '..';

interface AppStateContext extends RecyclingLocatorAttributes {
  startPath: string;
}

export const AppState = createContext<AppStateContext>(null);

function getStartPath(attributes: RecyclingLocatorAttributes): string {
  const { postcode } = attributes;

  if (attributes.path) {
    return attributes.path;
  } else if (attributes.postcode) {
    return `/${postcode}`;
  }

  return '/';
}

export function createAppState(
  attributes: RecyclingLocatorAttributes,
): AppStateContext {
  return {
    ...attributes,
    startPath: getStartPath(attributes),
  };
}

export function useAppState() {
  return useContext(AppState);
}
