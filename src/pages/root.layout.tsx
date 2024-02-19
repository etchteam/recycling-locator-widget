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
  const currentPath = location.pathname;

  useEffect(() => {
    if (loadedStartPath.value !== startPath && startPath !== currentPath) {
      console.log('navigating to start path', startPath);
      navigateTo(startPath);
    }

    if (currentPath === startPath) {
      loadedStartPath.value = startPath;
    }
  }, [startPath, currentPath]);

  if (!loadedStartPath.value) {
    return null;
  }

  return <Outlet />;
}
