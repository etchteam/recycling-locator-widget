import register from 'preact-custom-element';

import Entrypoint from './pages/entrypoint';
import { Locale } from './types/locale';

/**
 * The root web component
 * - Registers the recycling-locator-widget custom element
 * - Renders the Preact app within the shadow DOM for style encapsulation
 * - Provides global styles
 */
export default function RecyclingLocatorWidget({
  locale,
}: {
  readonly locale: Locale;
}) {
  return (
    <>
      <link rel="stylesheet" href="/styles.css" />
      <article>
        <Entrypoint locale={locale} />
      </article>
    </>
  );
}

register(RecyclingLocatorWidget, 'recycling-locator-widget', ['locale'], {
  shadow: true,
});

declare global {
  interface HTMLElementTagNameMap {
    'recycling-locator-widget': Record<string, never>;
  }
}
