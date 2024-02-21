import { CustomElement } from '@/types/customElement';

export interface IconCircleAttributes {
  variant?: 'positive' | 'negative';
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-icon-circle': CustomElement<IconCircleAttributes>;
    }
  }
}
