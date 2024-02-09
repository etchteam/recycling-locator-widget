declare module '*.svg?react' {
  const PreactComponent: preact.FunctionComponent<
    preact.ComponentProps<'svg'> & { title?: string }
  >;

  export default PreactComponent;
}
