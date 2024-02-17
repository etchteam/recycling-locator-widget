import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import { RecyclingLocatorAttributes } from '..';

interface AppStateContext extends RecyclingLocatorAttributes {
  startRoute: string;
}

export const AppState = createContext<AppStateContext>(null);

export function createAppState(
  attributes: RecyclingLocatorAttributes,
): AppStateContext {
  const { postcode } = attributes;
  const startRoute = postcode ? `/${postcode}` : '/';

  return {
    ...attributes,
    startRoute,
  };
}

export function useAppState() {
  return useContext(AppState);
}
