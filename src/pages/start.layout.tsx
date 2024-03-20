import { useSignal } from '@preact/signals';
import { ComponentChildren } from 'preact';
import { useTranslation } from 'react-i18next';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/canvas/Section/Section';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/content/Logo/Logo';
import '@/components/content/Icon/Icon';
import '@/components/canvas/Tip/Tip';
import '@/components/composition/Wrap/Wrap';
import Footer from '@/components/content/Footer/Footer';
import config from '@/config';
import useAnalytics from '@/lib/useAnalytics';

function About() {
  const { t } = useTranslation();

  return (
    <locator-wrap>
      <diamond-section padding="lg">
        <h2>{t('about.title')}</h2>
        <p>{t('about.intro')}</p>
        <h3 className="diamond-spacing-top-md">
          {t('about.becomeAPartner.title')}
        </h3>
        <p>{t('about.becomeAPartner.description')}</p>
        <diamond-button width="full-width">
          <a
            href={t('about.becomeAPartner.url')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('about.becomeAPartner.cta')}
          </a>
        </diamond-button>
        <h3 className="diamond-spacing-top-md">{t('about.feedback.title')}</h3>
        <p>{t('about.feedback.description')}</p>
        <diamond-button width="full-width">
          <a
            href={t('about.feedback.url')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('about.feedback.cta')}
          </a>
        </diamond-button>
        <hr className="diamond-spacing-bottom-md diamond-spacing-top-lg" />
        <Footer />
      </diamond-section>
    </locator-wrap>
  );
}

export function DefaultAside() {
  return (
    <locator-tip slot="layout-aside" type="image">
      <locator-wrap>
        <img src={config.imagePath + 'general-tip.svg'} alt="" />
      </locator-wrap>
    </locator-tip>
  );
}

export default function StartLayout({
  children,
  aside,
}: {
  readonly children: ComponentChildren;
  readonly aside?: ComponentChildren;
}) {
  const { t } = useTranslation();
  const { recordEvent } = useAnalytics();
  const open = useSignal(false);

  open.subscribe((value) => {
    recordEvent({
      category: 'About',
      action: value ? 'Open' : 'Close',
    });
  });

  return (
    <locator-layout>
      <locator-header slot="layout-header">
        <locator-header-content>
          <locator-logo></locator-logo>
          <diamond-button variant="text" width="square">
            <button
              type="button"
              data-testid="about-button"
              aria-expanded={open.value}
              aria-controls="locator-layout-main"
              onClick={() => (open.value = !open.value)}
            >
              <locator-icon
                icon={open.value ? 'close' : 'info'}
                label={t(`about.button.${open.value ? 'close' : 'view'}`)}
                color="primary"
              ></locator-icon>
            </button>
          </diamond-button>
        </locator-header-content>
      </locator-header>
      <div slot="layout-main" id="locator-layout-main">
        {open.value ? <About /> : children}
      </div>
      <div slot="layout-aside" className="display-contents">
        {aside ?? <DefaultAside />}
      </div>
    </locator-layout>
  );
}
