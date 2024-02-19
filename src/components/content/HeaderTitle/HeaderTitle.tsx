import { CustomElement } from '@/types/customElement';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-header-title': CustomElement;
    }
  }
}
