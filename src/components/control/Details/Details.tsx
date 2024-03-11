import { CustomElement } from '@/types/customElement';

export interface DetailsAttributes {
  readonly menu?: boolean;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-details': CustomElement<DetailsAttributes>;
    }
  }
}
