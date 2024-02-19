import { useSignal } from '@preact/signals';
import { ComponentChildren } from 'preact';
import { useTranslation } from 'react-i18next';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/content/Logo/Logo';
import '@/components/content/Icon/Icon';
import '@/components/canvas/Tip/Tip';
import '@/components/composition/Wrap/Wrap';

import '@etchteam/diamond-ui/canvas/Section/Section';

function About() {
  const { t } = useTranslation();

  return (
    <locator-wrap slot="main" data-testid="about-content">
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
      </diamond-section>
    </locator-wrap>
  );
}

export function DefaultAside() {
  const { t } = useTranslation();

  return (
    <locator-tip slot="aside">
      <locator-wrap>
        <p>{t('start.aside.paragraph')}</p>
        <ul>
          {t('start.aside.list').map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <img src="/images/recycling-technology.webp" alt="" />
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
  const open = useSignal(false);

  return (
    <locator-layout>
      <locator-header slot="header">
        <locator-logo></locator-logo>
        <diamond-button variant="text">
          <button
            type="button"
            data-testid="about-button"
            onClick={() => (open.value = !open.value)}
          >
            <locator-icon
              icon={open.value ? 'close' : 'info'}
              color="primary"
            ></locator-icon>
          </button>
        </diamond-button>
      </locator-header>
      <div slot="main">{open.value ? <About /> : children}</div>
      <div slot="aside" className="display-contents">
        {aside ?? <DefaultAside />}
      </div>
    </locator-layout>
  );
}