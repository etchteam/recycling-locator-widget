import 'preact';

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      // Tell Typescript to accept any HTML custom element
      [key: string]: preact.JSX.HTMLAttributes<any>;
    }
  }
}
