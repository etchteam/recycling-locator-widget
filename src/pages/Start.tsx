import { useTranslation } from 'react-i18next';

import '../components/Layout/Layout';
import '../components/Logo/Logo';

export default function StartPage() {
  const { t } = useTranslation();

  return (
    <locator-layout>
      <header slot="header">
        <locator-logo></locator-logo>
      </header>
      <div slot="main">
        <h2>{t('start.title')}</h2>
        <form>
          <label htmlFor="location">Where are you?</label>
          <input type="text" name="location" id="location" />
          <button type="submit">Get started</button>
        </form>
      </div>
      <aside slot="aside">
        <p>Use this service to:</p>
        <ul>
          <li>see your nearest places to recycle</li>
          <li>find out how to recycle a specific item</li>
          <li>check what you can recycle at home</li>
        </ul>
      </aside>
    </locator-layout>
  );
}