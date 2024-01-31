import { ComponentChildren } from 'preact';
import register from 'preact-custom-element';

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
      <div part="header">{header}</div>
      <div part="main">{main}</div>
      <div part="aside">{aside}</div>
    </>
  );
}

register(Layout, 'locator-layout', [], { shadow: true });

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-layout': preact.JSX.HTMLAttributes;
    }
  }
}
