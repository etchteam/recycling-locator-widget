import { CustomElement } from '@/types/customElement';

export interface DetailsAttributes {
  readonly menu?: boolean;
  readonly flush?: boolean;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-details': CustomElement<DetailsAttributes>;
      'locator-details-summary-content': CustomElement;
      'locator-details-summary-preview': CustomElement;
    }
  }
}
