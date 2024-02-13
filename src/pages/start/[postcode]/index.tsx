import { Link, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '../../../components/Wrap/Wrap';
import '../../../components/ContextHeader/ContextHeader';
import '../../../components/Icon/Icon';

export default function PostcodePage() {
  const { postcode } = useParams();
  console.log(postcode);
  return (
    <>
      <locator-context-header>
        <diamond-grid>
          <diamond-grid-item grow="grow">{postcode}</diamond-grid-item>
          <diamond-grid-item>
            <diamond-button variant="text" size="sm">
              <Link to="/">
                <locator-icon icon="close" color="primary"></locator-icon>
              </Link>
            </diamond-button>
          </diamond-grid-item>
        </diamond-grid>
      </locator-context-header>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2>What do you need to recycle?</h2>
        </diamond-section>
      </locator-wrap>
    </>
  );
}
