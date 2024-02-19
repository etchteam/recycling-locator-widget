import { Outlet, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/canvas/Tip/Tip';
import '@/components/composition/Wrap/Wrap';

export default function MaterialLayout() {
  const { postcode } = useParams();

  return (
    <locator-layout>
      <locator-header slot="header">
        <h2>Recycle a specific item</h2>
        <p>{postcode}</p>
      </locator-header>
      <div slot="main">
        <Outlet />
      </div>
      <locator-tip slot="aside" text-align="center">
        <locator-wrap>
          <img src="/images/recycling-technology.webp" alt="" />
          <p className="text-weight-bold">Hints and tips</p>
          <h2>How to check if your electricals can be recycled</h2>
          <p>
            Any items that have a plug, use batteries, need charging or have a
            picture of a crossed out wheelie bin on, are known as Waste
            Electrical and Electronic Equipment (WEEE). These items should not
            be sent to landfill and should be recycled at Recycling Centres,
            electrical item bring banks or via electrical retailers
          </p>
        </locator-wrap>
      </locator-tip>
    </locator-layout>
  );
}
