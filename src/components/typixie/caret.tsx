'use client';

import { useRef } from 'react';

import { cn } from '@/utils/cn';
import { set } from '@/utils/style-helpers';
import { wpm } from '@/utils/wpm';

import { useAppActions, useAppStore } from '@/lib/state';
import { useKeyDown } from '@/hooks/use-key-down';
import { useKeyUp } from '@/hooks/use-key-up';

export const Caret = () => {
  const caretRef = useRef<HTMLDivElement | null>(null);

  const { setCaret, back, keydown, setIsTyping } = useAppActions();

  const totalCharsTyped = useAppStore(state => state.totalCharsTyped);
  const lastCharTypedTime = useAppStore(state => state.lastCharTypedTime);

  const setCaretStyle = (styles: React.CSSProperties | string) => {
    const caret = caretRef.current;

    if (!caret) return;

    set(caret, styles);
  };

  useKeyDown(e => {
    const isBackspace = e.key === 'Backspace';
    const isSpacebar = e.key === ' ';

    if (!isBackspace && !isSpacebar && e.key.length !== 1) return;

    if (isBackspace) {
      back(e.ctrlKey);
    } else {
      keydown(e.key);
    }
  });

  useKeyUp(() => {
    setCaretStyle('animate-cursor-blink');
    setIsTyping(false);
  });

  const wpmSpeed = wpm(totalCharsTyped, lastCharTypedTime);

  return (
    <>
      <span className="absolute -top-10 text-primary">{wpmSpeed} wpm</span>

      <div
        ref={el => {
          if (el) {
            setCaret(el);
            caretRef.current = el;
          }
        }}
        className={cn(
          `absolute top-0 -z-10 hidden bg-primary p-[.03em] text-center leading-[1.3] text-transparent`
        )}
      >
        \
      </div>
    </>
  );
};
