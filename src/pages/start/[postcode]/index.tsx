import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Wrap/Wrap';
import '@/components/canvas/ContextHeader/ContextHeader';
import '@/components/content/Icon/Icon';
import '@/components/composition/BorderedList/BorderedList';
import '@/components/control/IconLink/IconLink';
import { usePostcodeLoaderData } from '@/lib/loaders/postcode';

export default function PostcodePage() {
  const { t } = useTranslation();
  const { postcode, city } = usePostcodeLoaderData();

  return (
    <>
      <locator-context-header>
        <diamond-grid alignItems="center">
          <diamond-grid-item grow>
            <span className="text-weight-bold">{postcode}</span>
            {city && <>&nbsp;&ndash; {city}</>}
          </diamond-grid-item>
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
          <h2>{t('start.location.title')}</h2>

          <locator-bordered-list>
            <nav>
              <ul>
                <li>
                  <locator-icon-link>
                    <Link to={`/${postcode}/home`}>
                      <locator-icon icon="home"></locator-icon>
                      {t('start.location.options.home')}
                    </Link>
                  </locator-icon-link>
                </li>
                <li>
                  <locator-icon-link>
                    <Link to={`/${postcode}/places`}>
                      <locator-icon icon="distance"></locator-icon>
                      {t('start.location.options.nearest')}
                    </Link>
                  </locator-icon-link>
                </li>
              </ul>
            </nav>
          </locator-bordered-list>
        </diamond-section>
      </locator-wrap>
    </>
  );
}
