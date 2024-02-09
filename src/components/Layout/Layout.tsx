import type { ComponentChildren } from 'preact';
import register from 'preact-custom-element';

import { CustomElement } from '../../types/custom-element';

export default function Layout({
  header,
  main,
  aside,
}: Readonly<{
  header: ComponentChildren;
  main: ComponentChildren;
  aside: ComponentChildren;
}>) {
  return (
    <>
      <header part="header">{header}</header>
      <div part="main">{main}</div>
      <aside part="aside">{aside}</aside>
    </>
  );
}

register(Layout, 'locator-layout', [], { shadow: true });

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-layout': CustomElement;
    }
  }
}
