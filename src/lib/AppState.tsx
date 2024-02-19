import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import { RecyclingLocatorAttributes } from '..';

import getStartPath from './getStartPath';

interface AppStateContext extends RecyclingLocatorAttributes {
  startPath: string;
}

export const AppState = createContext<AppStateContext>(null);

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
