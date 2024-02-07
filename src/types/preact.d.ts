import 'preact';

/**
 * Tell Preact to stop complaining about unknown elements.
 * Diamond components should be added in here for typing.
 */
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: { [key: string]: unknown } & preact.JSX.HTMLAttributes;
    }
  }
}
