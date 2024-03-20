import { CustomElement } from '@/types/customElement';

export interface WrapAttributes {
  gutter?: 'fluid';
  'max-width'?: 'none';
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-wrap': CustomElement<WrapAttributes>;
    }
  }
}
