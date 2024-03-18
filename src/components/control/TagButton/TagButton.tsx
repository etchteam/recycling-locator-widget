import { CustomElement } from '@/types/customElement';

export interface TagButtonAttributes {
  readonly variant?: 'positive' | 'negative';
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-tag-button': CustomElement<TagButtonAttributes>;
    }
  }
}
