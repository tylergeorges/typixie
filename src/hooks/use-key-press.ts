"use client";

import { useEventListener } from "@/hooks/use-event-listener";

export const useKeyPress = (handler: (e: KeyboardEvent) => void) => {
  useEventListener("keypress", handler);
};
