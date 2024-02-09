import { CustomElement } from '../../types/custom-element';

export interface TipAttributes {
  'text-align'?: 'center';
}

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-tip': CustomElement<TipAttributes>;
    }
  }
}
