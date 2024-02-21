import { useSignal } from '@preact/signals';
import { useTranslation } from 'react-i18next';
import { Link, Form } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Wrap/Wrap';
import '@/components/canvas/ContextHeader/ContextHeader';
import '@/components/canvas/MapSvg/MapSvg';
import '@/components/canvas/IconCircle/IconCircle';
import '@/components/content/Icon/Icon';
import '@/components/composition/BorderedList/BorderedList';
import '@/components/control/IconLink/IconLink';
import '@/components/control/MaterialSearchInput/MaterialSearchInput';
import StartLayout from '@/pages/start.layout';

import { usePostcodeLoaderData } from './postcode.loader';

function Aside({ postcode }: { readonly postcode: string }) {
  const { t } = useTranslation();

  return (
    <locator-map-svg slot="aside">
      <diamond-button width="full-width">
        <Link to={`/${postcode}/places/map`}>
          {t('postcode.exploreTheMap')}
          <locator-icon icon="map" color="primary"></locator-icon>
        </Link>
      </diamond-button>
    </locator-map-svg>
  );
}

export default function PostcodePage() {
  const { t } = useTranslation();
  const { postcode, city } = usePostcodeLoaderData();
  const submitting = useSignal(false);

  return (
    <StartLayout aside={<Aside postcode={postcode} />}>
      <locator-context-header>
        <div>
          <span className="text-weight-bold">{postcode}</span>
          {city && <>&nbsp;&ndash; {city}</>}
        </div>
        <diamond-button variant="text" size="sm">
          <Link to="/">
            <locator-icon icon="close" color="primary"></locator-icon>
          </Link>
        </diamond-button>
      </locator-context-header>
      <locator-wrap>
        <diamond-section padding="lg">
          <h2
            id="material-search-title"
            className="text-size-h3 diamond-spacing-bottom-md"
          >
            {t('postcode.title')}
          </h2>

          <Form method="post" onSubmit={() => (submitting.value = true)}>
            <locator-material-search-input
              className="diamond-spacing-bottom-lg"
              placeholder={t('components.materialSearchInput.placeholder')}
              inputLabelledBy="material-search-title"
              submitting={submitting.value}
            ></locator-material-search-input>
          </Form>

          <locator-bordered-list>
            <nav>
              <ul>
                <li>
                  <locator-icon-link>
                    <Link to={`/${postcode}/home`}>
                      <locator-icon-circle>
                        <locator-icon icon="home"></locator-icon>
                      </locator-icon-circle>
                      {t('postcode.options.home')}
                    </Link>
                  </locator-icon-link>
                </li>
                <li>
                  <locator-icon-link>
                    <Link to={`/${postcode}/places`}>
                      <locator-icon-circle>
                        <locator-icon icon="distance"></locator-icon>
                      </locator-icon-circle>
                      {t('postcode.options.nearest')}
                    </Link>
                  </locator-icon-link>
                </li>
              </ul>
            </nav>
          </locator-bordered-list>
        </diamond-section>
      </locator-wrap>
    </StartLayout>
  );
}
