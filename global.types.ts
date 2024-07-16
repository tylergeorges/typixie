import { VariantProps } from 'tailwind-variants';

declare global {
  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};

  type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

  type VariantOmit<V extends VariantProps<any>, P> = Omit<P, keyof V> & V;
}

export {};
