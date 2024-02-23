import type { ComponentChildren } from 'preact';
import register from 'preact-custom-element';

import { CustomElement } from '@/types/customElement';

export default function Layout({
  'layout-header': header,
  'layout-main': main,
  'layout-aside': aside,
}: Readonly<{
  'layout-header': ComponentChildren;
  'layout-main': ComponentChildren;
  'layout-aside': ComponentChildren;
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

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-layout': CustomElement;
    }
  }
}
