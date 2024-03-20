import { useTranslation } from 'react-i18next';

import { CustomElement } from '@/types/customElement';

import LogoSvg from './recycle-logo.svg?react';

export default function Footer() {
  const { t } = useTranslation();
  const tContext = 'components.footer';

  const links = ['privacy', 'cookies', 'accessibility'].map((item) => ({
    href: t(`${tContext}.${item}Link`) as string,
    label: t(`${tContext}.${item}Label`),
  }));

  return (
    <locator-footer>
      <h2 className="locator-footer-title">
        {t(`${tContext}.poweredBy`)}{' '}
        <LogoSvg title={t(`${tContext}.recycleNow`)} />
      </h2>
      <p>{t(`${tContext}.inPartnership`)} Valpak</p>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} rel="noopener noreferrer" target="_blank">
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
