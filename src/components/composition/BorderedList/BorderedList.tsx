import { CustomElement } from '@/types/customElement';

export interface BorderedListAttributes {
  size?: 'sm';
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-bordered-list': CustomElement<BorderedListAttributes>;
    }
  }
}
