import { CustomElement } from '@/types/customElement';

export interface HeroAttributes {
  variant?: 'positive' | 'negative' | 'hazardous';
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-hero': CustomElement<HeroAttributes>;
    }
  }
}
