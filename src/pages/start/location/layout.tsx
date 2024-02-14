import { Outlet } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '../../../components/Wrap/Wrap';
import '../../../components/Tip/Tip';

export default function LocationLayout() {
  return (
    <>
      <locator-wrap slot="main">
        <diamond-section padding="lg">
          <Outlet />
        </diamond-section>
      </locator-wrap>
      <locator-tip slot="aside">
        <locator-wrap>
          <p>Use this service to:</p>
          <ul>
            <li>see your nearest places to recycle</li>
            <li>find out how to recycle a specific item</li>
            <li>check what you can recycle at home</li>
          </ul>
          <img src="/images/recycling-technology.webp" alt="" />
        </locator-wrap>
      </locator-tip>
    </>
  );
}
