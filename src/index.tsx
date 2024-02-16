import register from 'preact-custom-element';

import Entrypoint from './pages/entrypoint';
import { CustomElement } from './types/custom-element';
import { Locale } from './types/locale';

export interface RecyclingLocatorWidgetAttributes {
  /**
   * The language to use currently only Welsh and English are supported
   */
  readonly locale?: Locale;
  /**
   * How to render the widget
   * - Widget will render as an embed within a page
   * - Standalone will render as a full page and change the browser history upon navigation
   */
  readonly variant?: 'widget' | 'standalone';
  /**
   * The base URL for the standalone variant
   */
  readonly basename?: string;
}

/**
 * The root web component
 * - Registers the recycling-locator-widget custom element
 * - Renders the Preact app within the shadow DOM for style encapsulation
 * - Provides global styles
 */
export default function RecyclingLocatorWidget({
  locale,
  variant = 'widget',
  basename = '/',
}: RecyclingLocatorWidgetAttributes) {
  return (
    <>
      <link rel="stylesheet" href="/styles.css" />
      <article className={variant}>
        <Entrypoint locale={locale} variant={variant} basename={basename} />
      </article>
    </>
  );
}

register(
  RecyclingLocatorWidget,
  'recycling-locator-widget',
  ['locale', 'variant', 'basename'],
  {
    shadow: true,
  },
);

declare global {
  interface HTMLElementTagNameMap {
    'recycling-locator-widget': CustomElement<RecyclingLocatorWidgetAttributes>;
  }
}
