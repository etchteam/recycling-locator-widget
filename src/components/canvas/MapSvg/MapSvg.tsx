import { ComponentChildren } from 'preact';
import register from 'preact-custom-element';

import config from '@/config';
import { CustomElement } from '@/types/customElement';

export default function MapSvg({
  children,
}: Readonly<{
  children: ComponentChildren;
}>) {
  return (
    <>
      <img part="image" src={`${config.publicPath}images/map.svg`} alt="" />
      <div part="content">{children}</div>
    </>
  );
}

register(MapSvg, 'locator-map-svg', [], { shadow: true });

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-map-svg': CustomElement;
    }
  }
}
