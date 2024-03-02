import { CustomElement } from '@/types/customElement';

export interface FabAttributes {
  /**
   * Where to place the button, if no position is given it will be placed at the bottom
   */
  position?: 'top';
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-fab': CustomElement<FabAttributes>;
    }
  }
}
