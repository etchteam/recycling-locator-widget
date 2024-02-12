import { useTranslation } from 'react-i18next';

import '../../components/LocationInput/LocationInput';

export default function StartPage() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('start.title')}</h2>
      <form>
        <diamond-form-group class="diamond-spacing-bottom-md">
          <label htmlFor="location-input">Where are you?</label>
          <locator-location-input></locator-location-input>
        </diamond-form-group>
        <diamond-button width="full-width" variant="primary">
          <button type="submit">Get started</button>
        </diamond-button>
      </form>
    </>
  );
}
