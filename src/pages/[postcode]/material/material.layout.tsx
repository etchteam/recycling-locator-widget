import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/canvas/ContextHeader/ContextHeader';
import '@/components/canvas/Tip/Tip';
import '@/components/composition/Wrap/Wrap';
import '@/components/content/HeaderTitle/HeaderTitle';
import '@/components/content/Icon/Icon';

export default function MaterialLayout() {
  const { postcode } = useParams();
  const [searchParams] = useSearchParams();
  const materialId = searchParams.get('id');
  const materialName = searchParams.get('name');

  return (
    <locator-layout>
      <locator-header slot="header">
        <locator-header-title>
          <diamond-button>
            <Link to={`/${postcode}`}>
              <locator-icon icon="arrow-left" label="Back"></locator-icon>
            </Link>
          </diamond-button>
          <div>
            <h2>Recycle a specific item</h2>
            <p>{postcode}</p>
          </div>
        </locator-header-title>
      </locator-header>
      <div slot="main">
        {materialId && (
          <locator-context-header>
            <Link to={`/${postcode}/search`}>
              <diamond-grid alignItems="center">
                <diamond-grid-item grow shrink>
                  <span className="text-weight-bold">{materialName}</span>
                </diamond-grid-item>
                <diamond-grid-item>
                  <locator-icon icon="search" color="primary" />
                </diamond-grid-item>
              </diamond-grid>
            </Link>
          </locator-context-header>
        )}
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
