import { useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
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
import config from '@/config';
import useAnalytics from '@/lib/useAnalytics';

export default function MaterialLayout() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { recordEvent } = useAnalytics();
  const [searchParams] = useSearchParams();
  const materialId = searchParams.get('id');
  const materialName = searchParams.get('name');

  useEffect(() => {
    if (materialName) {
      recordEvent({
        category: 'MaterialResult::MaterialSearch',
        action: materialName,
      });
    }
  }, [materialName]);

  return (
    <locator-layout>
      <locator-header slot="layout-header">
        <locator-header-title>
          <diamond-button>
            <Link to={`/${postcode}`}>
              <locator-icon icon="arrow-left" label="Back"></locator-icon>
            </Link>
          </diamond-button>
          <div>
            <h2>{t('material.title')}</h2>
            <p>{postcode}</p>
          </div>
        </locator-header-title>
      </locator-header>
      <div slot="layout-main">
        {materialId && (
          <Link
            to={`/${postcode}/material/search`}
            className="diamond-text-decoration-none"
          >
            <locator-context-header>
              <div className="diamond-text-weight-bold">{materialName}</div>
              <locator-icon icon="search" color="primary" />
            </locator-context-header>
          </Link>
        )}
        <Outlet />
      </div>
      <locator-tip slot="layout-aside" text-align="center">
        {/* TODO(WRAP-232): swap this out for the proper tip once we have content */}
        <locator-wrap>
          <img src={`${config.imagePath}recycling-technology.webp`} alt="" />
          <p className="diamond-text-weight-bold">Hints and tips</p>
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
