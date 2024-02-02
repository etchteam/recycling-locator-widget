import register from 'preact-custom-element';

import config from '../../config';

export default function Logo() {
  return (
    <img
      src={`${config.publicPath}recycling-locator-logo.webp`}
      alt="Recycling Locator"
      width="230"
      height="42"
    />
  );
}

register(Logo, 'locator-logo');

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-logo': preact.JSX.HTMLAttributes;
    }
  }
}
