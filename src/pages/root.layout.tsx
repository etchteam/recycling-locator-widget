import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAppState } from '@/lib/AppState';

/**
 * The root layout wraps every route in the app.
 * It's responsible for navigating to the correct start path.
 */
export default function RootLayout() {
  const { startPath } = useAppState();
  const navigateTo = useNavigate();
  const location = useLocation();
  const loadedStartPath = useSignal<string>('');
  const currentHref = `${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    if (loadedStartPath.value !== startPath && startPath !== currentHref) {
      navigateTo(startPath);
    }

    if (currentHref === startPath) {
      loadedStartPath.value = startPath;
    }
  }, [startPath, currentHref]);

  if (!loadedStartPath.value) {
    return null;
  }

  return <Outlet />;
}
