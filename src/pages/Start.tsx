import { useTranslation } from 'react-i18next';

import '../components/Layout/Layout';
import '../components/Logo/Logo';
import '../components/Tip/Tip';
import '../components/LocationInput/LocationInput';

export default function StartPage() {
  const { t } = useTranslation();

  return (
    <locator-layout>
      <locator-logo slot="header"></locator-logo>
      <diamond-wrap slot="main">
        <h2>{t('start.title')}</h2>
        <form>
          <label htmlFor="location-input">Where are you?</label>
          <locator-location-input></locator-location-input>
          <diamond-button width="full-width" variant="primary">
            <button type="submit">Get started</button>
          </diamond-button>
        </form>
      </diamond-wrap>
      <locator-tip slot="aside">
        <p>Use this service to:</p>
        <ul>
          <li>see your nearest places to recycle</li>
          <li>find out how to recycle a specific item</li>
          <li>check what you can recycle at home</li>
        </ul>
        <img src="/images/recycling-technology.webp" alt="" />
      </locator-tip>
    </locator-layout>
  );
}
