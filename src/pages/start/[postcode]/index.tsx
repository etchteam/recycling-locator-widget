import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Section/Section';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';

import '../../../components/Wrap/Wrap';
import '../../../components/ContextHeader/ContextHeader';
import '../../../components/Icon/Icon';

import PostCodeResolver from '../../../lib/PostcodeResolver';

export default function PostcodePage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const city = useSignal<string>('');

  useEffect(() => {
    // Get the city and validate geo data again in case the user has navigated
    // directly to this page
    async function setCity() {
      const geocode = await PostCodeResolver.getValidGeocodeData(postcode);
      city.value = geocode.items[0].address.city;
    }
    setCity();
  }, [postcode]);

  return (
    <>
      <locator-context-header>
        <diamond-grid>
          <diamond-grid-item grow>
            <span className="text-weight-bold">{postcode}</span>
            {city.value && <>&nbsp;&ndash; {city.value}</>}
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
