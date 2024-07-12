"use client";

import { useEventListener } from "@/hooks/use-event-listener";

export const useKeyDown = (handler: (e: KeyboardEvent) => void) => {
  useEventListener("keydown", handler);
};
