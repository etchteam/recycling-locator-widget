import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useSearchParams, Form } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/canvas/Tip/Tip';
import '@/components/canvas/ContextHeader/ContextHeader';
import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/composition/Wrap/Wrap';
import '@/components/content/HeaderTitle/HeaderTitle';
import '@/components/content/Icon/Icon';

import config from '@/config';

import ContainerList from './ContainerList';
import { useHomeRecyclingLoaderData } from './home.loader';

export default function CollectionPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const data = useHomeRecyclingLoaderData();
  const [searchParams] = useSearchParams();
  const scheme = searchParams.get('scheme');
  const search = searchParams.get('search');
  const submitting = useSignal(false);
  const la = data?.localAuthority;

  useEffect(() => {
    submitting.value = false;
  }, [search]);

  return (
    <locator-layout>
      <locator-header slot="layout-header">
        <locator-header-title>
          <diamond-button>
            <Link to={`/${postcode}/home`}>
              <locator-icon icon="arrow-left" label="Back"></locator-icon>
            </Link>
          </diamond-button>
          <div>
            <h2>{t('homeRecycling.collection.title')}</h2>
            {la && <p>{la.name}</p>}
          </div>
        </locator-header-title>
      </locator-header>
      <div slot="layout-main">
        {scheme && (
          <locator-context-header>
            <span className="diamond-text-weight-bold">{scheme}</span>
          </locator-context-header>
        )}
        <diamond-section padding="lg">
          <locator-wrap>
            <h3 id="bin-search-title" className="diamond-spacing-bottom-md">
              {t('homeRecycling.collection.search.label')}
            </h3>

            <Form method="get" onSubmit={() => (submitting.value = true)}>
              <input type="hidden" name="scheme" value={scheme} />
              <locator-material-search-input
                className="diamond-spacing-bottom-sm"
                placeholder={t('components.materialSearchInput.placeholder')}
                inputLabelledBy="bin-search-title"
                defaultValue={search}
                submitting={submitting.value}
              ></locator-material-search-input>
            </Form>

            <ContainerList la={la} search={search} />
          </locator-wrap>
        </diamond-section>
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
