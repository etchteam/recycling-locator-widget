import { CustomElement } from '../../types/custom-element';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-context-header': CustomElement;
    }
  }
}
