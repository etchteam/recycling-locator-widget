import { useRouteError } from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';
import '@/components/canvas/Tip/Tip';
import '@/components/control/LocationInput/LocationInput';
import StartLayout from '@/pages/layout';

import { IndexAside } from './index';

/**
 * Global app error boundary
 */
export default function ErrorPage() {
  const error = useRouteError();
  // TODO: throw sentry error
  console.error(error);

  return (
    <StartLayout aside={<IndexAside />}>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2>Something went wrong</h2>
        </diamond-section>
      </locator-wrap>
    </StartLayout>
  );
}
