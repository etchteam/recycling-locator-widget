import { ComponentChildren } from 'preact';
import register from 'preact-custom-element';

import { useAppState } from '@/lib/AppState';
import { CustomElement } from '@/types/customElement';

export default function MapSvg({
  children,
}: Readonly<{ children: ComponentChildren }>) {
  const { publicPath } = useAppState();

  return (
    <>
      <img part="image" src={`${publicPath}images/map.svg`} alt="" />
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
