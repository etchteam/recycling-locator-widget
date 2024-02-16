import { ComponentChildren } from 'preact';

export type CustomElement<T = object> = T &
  Omit<preact.JSX.HTMLAttributes, 'size'> &
  ComponentChildren & {
    slot?: string;
  };
