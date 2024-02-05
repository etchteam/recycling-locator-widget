declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-tip': preact.JSX.HTMLAttributes & {
        'text-align'?: 'center';
      };
    }
  }
}
