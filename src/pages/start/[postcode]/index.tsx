import { useTranslation } from 'react-i18next';
import { ActionFunctionArgs, Link, redirect, Form } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Wrap/Wrap';
import '@/components/canvas/ContextHeader/ContextHeader';
import '@/components/content/Icon/Icon';
import '@/components/composition/BorderedList/BorderedList';
import '@/components/control/IconLink/IconLink';
import WidgetApi from '@/lib/WidgetApi';
import { usePostcodeLoaderData } from '@/lib/loaders/postcode';
import { MaterialSearchResponse } from '@/types/widgetApi';

export async function postcodeAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const materials = await WidgetApi.post<MaterialSearchResponse[]>(
    'materials',
    formData,
  );
  const { name, id } = materials?.[0] ?? {};
  const postcode = params.postcode;

  if (name === formData.get('search')) {
    const safeName = encodeURIComponent(name);
    return redirect(`/${postcode}/material?id=${id}&name=${safeName}`);
  }

  return redirect(`/${postcode}/material/not-found`);
}

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
          <h2
            id="material-search-title"
            className="text-size-h3 diamond-spacing-bottom-md"
          >
            {t('start.location.title')}
          </h2>

          <Form method="post">
            <locator-material-search-input
              className="diamond-spacing-bottom-lg"
              placeholder={t('start.location.placeholder')}
              inputLabelledBy="material-search-title"
            ></locator-material-search-input>
          </Form>

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
