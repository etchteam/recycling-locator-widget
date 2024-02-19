import register from 'preact-custom-element';

import Entrypoint from './pages/entrypoint';
import { CustomElement } from './types/customElement';
import { Locale } from './types/locale';

export interface RecyclingLocatorAttributes {
  /**
   * The language to use currently only Welsh and English are supported
   */
  readonly locale?: Locale;
  /**
   * Prefill the postcode to skip the start view
   */
  readonly postcode?: string;
  /**
   * How to render
   * - Widget will render as an embed within a page
   * - Standalone will render as a full page and change the browser history upon navigation
   */
  readonly variant?: 'widget' | 'standalone';
  /**
   * The base URL for the standalone variant
   */
  readonly basename?: string;
  /**
   * The path to load
   */
  readonly path?: string;
}

/**
 * The root web component
 * - Registers the recycling-locator custom element
 * - Renders the Preact app within the shadow DOM for style encapsulation
 * - Provides global styles
 */
export default function RecyclingLocator({
  locale,
  postcode,
  variant = 'widget',
  basename = '/',
  path,
}: RecyclingLocatorAttributes) {
  return (
    <>
      <link rel="stylesheet" href="/styles.css" />
      <article className={`recycling-locator-variant-${variant}`}>
        <Entrypoint
          locale={locale}
          postcode={postcode}
          variant={variant}
          basename={basename}
          path={path}
        />
      </article>
    </>
  );
}

register(
  RecyclingLocator,
  'recycling-locator',
  ['locale', 'postcode', 'variant', 'basename', 'path'],
  {
    shadow: true,
  },
);

declare global {
  interface HTMLElementTagNameMap {
    'recycling-locator': EventSource &
      CustomElement<RecyclingLocatorAttributes>;
  }
}
