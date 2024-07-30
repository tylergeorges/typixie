'use client';

import { useEventListener } from '@/hooks/use-event-listener';

export const useWindowResize = (handler: (e: UIEvent) => void) => {
  useEventListener('resize', handler);
};
