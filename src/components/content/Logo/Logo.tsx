import register from 'preact-custom-element';

import { CustomElement } from '@/types/customElement';

import LogoSvg from './logo.svg?react';

export interface LogoAttributes {
  readonly type?: 'logo-only';
}

export default function Logo() {
  return <LogoSvg />;
}

register(Logo, 'locator-logo', ['type']);

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-logo': CustomElement<LogoAttributes>;
    }
  }
}
