import register from 'preact-custom-element';

import Entrypoint from './pages/Entrypoint';

/**
 * The root web component
 * - Registers the recycling-locator-widget custom element
 * - Renders the Preact app within the shadow DOM for style encapsulation
 * - Provides global styles
 */
export default function RecyclingLocatorWidget() {
  return (
    <>
      <link rel="stylesheet" href="/styles.css" />
      <article>
        <Entrypoint />
      </article>
    </>
  );
}

register(RecyclingLocatorWidget, 'recycling-locator-widget', [], {
  shadow: true,
});

declare global {
  interface HTMLElementTagNameMap {
    'recycling-locator-widget': Record<string, never>;
  }
}
