import { CustomElement } from '@/types/customElement';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-header': CustomElement;
      'locator-header-content': CustomElement;
      'locator-header-logo': CustomElement;
    }
  }
}
