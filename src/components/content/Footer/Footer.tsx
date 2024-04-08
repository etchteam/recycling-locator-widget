import { Suspense, lazy } from 'preact/compat';
import { useTranslation } from 'react-i18next';

import i18n from '@/lib/i18n';
import { CustomElement } from '@/types/customElement';

export default function Footer() {
  const { t } = useTranslation();
  const locale = i18n.language;
  const logoPath = locale === 'cy' ? 'wales-recycles-logo' : 'recycle-logo';
  const LogoSvg = lazy(() => import(`./${logoPath}.svg?react`));

  const links = ['privacy', 'cookies', 'accessibility'].map((item) => ({
    href: t(`components.footer.nav.${item}Link`),
    label: t(`components.footer.nav.${item}Label`),
  }));

  return (
    <locator-footer>
      <h2 className="locator-footer-title">
        {t('components.footer.poweredBy')}{' '}
        <Suspense fallback={null}>
          <LogoSvg title={t('components.footer.recycleNow')} />
        </Suspense>
      </h2>
      <p>{t('components.footer.inPartnership')} Valpak</p>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href as string}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </locator-footer>
  );
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-footer': CustomElement;
    }
  }
}
