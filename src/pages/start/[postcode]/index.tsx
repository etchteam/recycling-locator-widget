import { useTranslation } from 'react-i18next';
import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '../../../components/Wrap/Wrap';
import '../../../components/ContextHeader/ContextHeader';
import '../../../components/Icon/Icon';

import PostCodeResolver from '../../../lib/PostcodeResolver';

interface PostcodeLoaderResponse {
  postcode: string;
  city: string;
}

export async function postcodeLoader({
  params,
}: LoaderFunctionArgs): Promise<PostcodeLoaderResponse> {
  const postcode = params.postcode;
  const geocode = await PostCodeResolver.getValidGeocodeData(postcode);

  return {
    postcode,
    city: geocode.items[0].address.city,
  };
}

export default function PostcodePage() {
  const { t } = useTranslation();
  const { postcode, city } = useLoaderData() as PostcodeLoaderResponse;

  return (
    <>
      <locator-context-header>
        <diamond-grid>
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
        </diamond-section>
      </locator-wrap>
    </>
  );
}
