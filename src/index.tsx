import register from 'preact-custom-element';

import config from './config';
import Entrypoint from './pages/entrypoint';
import { CustomElement } from './types/customElement';
import { Locale } from './types/locale';

export interface RecyclingLocatorAttributes {
  /**
   * The language to use currently only Welsh and English are supported
   */
  readonly locale?: Locale;
  /**
   * How to render
   * - Widget will render as an embed within a page
   * - Standalone will render as a full page and change the browser history upon navigation
   */
  readonly variant?: 'widget' | 'standalone';
  /**
   * The base path for the standalone variant
   */
  readonly basename?: string;
  /**
   * The initial path to load
   * - /{postcode} to pre-fill the location
   * - /home-recycling for home recycling embeds
   * - /material?name={materialName} to pre-select a material
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
  variant = 'widget',
  basename = '/',
  path,
}: RecyclingLocatorAttributes) {
  return (
    <>
      <link rel="stylesheet" href={`${config.publicPath}styles.css`} />
      <article className={`recycling-locator-variant-${variant}`}>
        <Entrypoint
          locale={locale}
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
