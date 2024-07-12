"use client";

import { useEventListener } from "@/hooks/use-event-listener";

export const useKeyUp = (handler: (e: KeyboardEvent) => void) => {
  useEventListener("keyup", handler);
};
