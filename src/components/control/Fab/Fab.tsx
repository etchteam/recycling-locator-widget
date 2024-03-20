import { CustomElement } from '@/types/customElement';

export interface FabAttributes {
  /**
   * Where to place the button, if no position is given it will be placed at the bottom
   */
  position?: 'top';
  /**
   * If the button should scroll with the page
   */
  sticky?: boolean;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-fab': CustomElement<FabAttributes>;
    }
  }
}
