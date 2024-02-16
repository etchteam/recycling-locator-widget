import { useTranslation } from 'react-i18next';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Wrap/Wrap';

export default function About() {
  const { t } = useTranslation();

  return (
    <locator-wrap slot="main">
      <diamond-section padding="lg">
        <h2>{t('start.about.title')}</h2>
        <p>{t('start.about.intro')}</p>
        <h3 className="diamond-spacing-top-md">
          {t('start.about.becomeAPartner.title')}
        </h3>
        <p>{t('start.about.becomeAPartner.description')}</p>
        <diamond-button width="full-width">
          <a
            href={t('start.about.becomeAPartner.url')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('start.about.becomeAPartner.cta')}
          </a>
        </diamond-button>
        <h3 className="diamond-spacing-top-md">
          {t('start.about.feedback.title')}
        </h3>
        <p>{t('start.about.feedback.description')}</p>
        <diamond-button width="full-width">
          <a
            href={t('start.about.feedback.url')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('start.about.feedback.cta')}
          </a>
        </diamond-button>
      </diamond-section>
    </locator-wrap>
  );
}
