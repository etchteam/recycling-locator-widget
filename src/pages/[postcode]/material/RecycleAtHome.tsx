import '@etchteam/diamond-ui/canvas/Card/Card';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/content/Icon/Icon';
import { Link, useParams } from 'react-router-dom';

import { MaterialLoaderResponse } from './material.loader';

function NoSchemes() {
  const { postcode } = useParams();

  return (
    <diamond-card border radius>
      <diamond-grid
        gap="sm"
        align-items="center"
        className="diamond-spacing-bottom-xs"
      >
        <diamond-grid-item>
          <locator-icon-circle variant="negative">
            <locator-icon icon="search"></locator-icon>
          </locator-icon-circle>
        </diamond-grid-item>
        <diamond-grid-item grow shrink>
          <h3>This item cannot be recycled at home</h3>
        </diamond-grid-item>
      </diamond-grid>
      <p className="text-size-sm">
        Check what you can put in your home recycling bins and if you have a
        food and garden waste collection.
      </p>
      <diamond-button width="full-width">
        <Link to={`/${postcode}/home`}>Check your home collection</Link>
      </diamond-button>
    </diamond-card>
  );
}

export default function RecycleAtHome({
  schemes,
}: {
  readonly schemes: MaterialLoaderResponse['recycleAtHome'];
}) {
  const schemesWithContainers = schemes.filter(
    (scheme) => scheme.containers.length > 0,
  );

  if (schemesWithContainers.length === 0) {
    return <NoSchemes />;
  }

  return null;
}
