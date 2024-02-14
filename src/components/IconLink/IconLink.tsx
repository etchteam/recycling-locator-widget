import { CustomElement } from '../../types/custom-element';

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-icon-link': CustomElement<TipAttributes>;
    }
  }
}
