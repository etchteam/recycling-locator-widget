import { CustomElement } from '../../types/custom-element';

export interface TipAttributes {
  'text-align'?: 'center';
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-tip': CustomElement<TipAttributes>;
    }
  }
}
