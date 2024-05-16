import compact from 'lodash/compact';
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
   * - /material?materials=111&search=Cereal boxes to pre-select a material
   */
  readonly path?: string;
  /**
   * The public URL to load assets from, should end with a /
   * If not provided, jsdelivr CDN will be used
   */
  readonly publicPath?: string;
  /**
   * Sets a preset theme which modifies the primary color
   */
  readonly theme?:
    | 'none'
    | 'green'
    | 'red'
    | 'blue'
    | 'green'
    | 'orange'
    | 'purple'
    | 'brown'
    | 'navy'
    | 'black';
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
  publicPath = config.publicPath,
  theme = 'green',
}: RecyclingLocatorAttributes) {
  const classes = compact([
    `recycling-locator-variant-${variant}`,
    `theme-preset-${theme}`,
    config.testMode ? 'recycling-locator-test-mode' : undefined,
  ]).join(' ');

  return (
    <>
      <link rel="stylesheet" href={`${publicPath}styles.css`} />
      <article className={classes}>
        <Entrypoint
          locale={locale}
          variant={variant}
          basename={basename}
          path={path}
          publicPath={publicPath}
        />
      </article>
    </>
  );
}

register(
  RecyclingLocator,
  'recycling-locator',
  ['locale', 'variant', 'basename', 'path', 'public-path', 'theme'],
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

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'recycling-locator': CustomElement<RecyclingLocatorAttributes>;
    }
  }
}
