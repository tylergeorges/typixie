import { useIsomorphicLayoutEffect } from "@hooks/use-isomorphic-layout-effect";
import { useRef } from "react";

export const useCachedHandler = <Fn extends (...args: never[]) => unknown>(
  fn: Fn
) => {
  const ref = useRef(fn);

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  });

  const proxy = useRef((...args: Parameters<Fn>) => {
    return ref.current == null ? undefined : ref.current.apply(this, args);
  });

  return proxy;
};
