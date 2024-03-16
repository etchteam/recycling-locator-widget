import { useSignal } from '@preact/signals';
import { Suspense } from 'preact/compat';
import { useEffect, useRef } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useParams,
  useSearchParams,
  Form,
  useLocation,
  useLoaderData,
  Await,
} from 'react-router-dom';
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

import TipContent from '@/components/template/TipContent/TipContent';
import config from '@/config';
import getPropertyDisplayName from '@/lib/getPropertyDisplayName';
import useAnalytics from '@/lib/useAnalytics';

import ContainerList from './ContainerList';
import { HomeCollectionLoaderResponse } from './collection.loader';
import { useHomeRecyclingLoaderData } from './home.loader';

export default function CollectionPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { localAuthority, properties } = useHomeRecyclingLoaderData();
  const { data } = useLoaderData() as {
    data: Promise<HomeCollectionLoaderResponse>;
  };
  const location = useLocation();
  const { recordEvent } = useAnalytics();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const propertyTypes = Object.keys(properties);
  const propertyType = searchParams.get('propertyType') ?? propertyTypes[0];
  const property = properties[propertyType];
  const menuOpen = useSignal(false);
  const submitting = useSignal(false);
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (search) {
      recordEvent({
        category: 'HomeRecyclingBins::MaterialSearch',
        action: search,
      });
    }

    submitting.value = false;
  }, [search]);

  useEffect(() => {
    // Force close the menu after navigation
    menuRef.current?.removeAttribute('open');
    menuOpen.value = false;
  }, [location]);

  return (
    <locator-layout>
      <div slot="layout-header">
        <locator-header>
          <locator-header-logo>
            <Link to="/">
              <locator-logo type="logo-only"></locator-logo>
            </Link>
          </locator-header-logo>
          <locator-header-content>
            <locator-header-title>
              <diamond-button>
                <Link to={`/${postcode}/home`}>
                  <locator-icon icon="arrow-left" label="Back"></locator-icon>
                </Link>
              </diamond-button>
              <div>
                <h2>{t('homeRecycling.collection.title')}</h2>
                {localAuthority && <p>{localAuthority.name}</p>}
              </div>
            </locator-header-title>
          </locator-header-content>
        </locator-header>
      </div>
      <div slot="layout-main">
        <locator-context-header>
          {propertyTypes.length > 1 ? (
            <locator-details menu>
              <details ref={menuRef}>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <summary onClick={() => (menuOpen.value = !menuOpen.value)}>
                  {menuOpen.value
                    ? 'Collections in this area'
                    : getPropertyDisplayName(property)}
                  <locator-icon icon="expand" />
                </summary>
                <nav>
                  <ul>
                    {propertyTypes.map((type) => (
                      <li key={type}>
                        <Link
                          to={`/${postcode}/home/collection?propertyType=${type}`}
                        >
                          <diamond-grid align-items="center" gap="xs">
                            <diamond-grid-item grow shrink>
                              {getPropertyDisplayName(properties[type])}
                            </diamond-grid-item>
                            <diamond-grid-item>
                              <locator-icon icon="arrow-right" />
                            </diamond-grid-item>
                          </diamond-grid>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </details>
            </locator-details>
          ) : (
            <span className="diamond-text-weight-bold">
              {getPropertyDisplayName(property)}
            </span>
          )}
        </locator-context-header>
        <diamond-section padding="lg">
          <locator-wrap>
            <h3 id="bin-search-title" className="diamond-spacing-bottom-md">
              {t('homeRecycling.collection.search.label')}
            </h3>

            <Form method="get" onSubmit={() => (submitting.value = true)}>
              <input type="hidden" name="propertyType" value={propertyType} />
              <locator-material-search-input
                className="diamond-spacing-bottom-sm"
                placeholder={t('components.materialSearchInput.placeholder')}
                inputLabelledBy="bin-search-title"
                defaultValue={search}
                submitting={submitting.value}
              ></locator-material-search-input>
            </Form>

            <ContainerList property={property} search={search} />
          </locator-wrap>
        </diamond-section>
      </div>
      <locator-tip slot="layout-aside" text-align="center">
        <locator-wrap>
          <img src={config.imagePath + 'general-tip.svg'} alt="" />
          <Suspense fallback={null}>
            <Await resolve={data}>
              {({ tip }) => <TipContent tip={tip} />}
            </Await>
          </Suspense>
        </locator-wrap>
      </locator-tip>
    </locator-layout>
  );
}
