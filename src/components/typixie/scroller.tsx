'use client';

import { useAppActions } from '@/lib/state';
import { cn } from '@/utils/cn';

export const Scroller = ({ children }: React.PropsWithChildren) => {
  const { setScroller } = useAppActions();

  return (
    <div
      ref={el => {
        if (el) {
          setScroller(el);
        }
      }}
      style={{ '--depth': '0px', '--top-offset': '2em' } as React.CSSProperties}
      className={cn(
        `translate-y-[calc(var(--depth, 0px) + var(--top-offset))] relative transition duration-300`
      )}
    >
      {children}
    </div>
  );
};
