import { CursorPos } from '@/components/typixie/types';
import { clamp } from '@/utils/clamp';
import { useRef, useState } from 'react';

export const useCaret = (input: string) => {
  const ref = useRef<HTMLDivElement>(null);

  const [cachedInput] = useState(() => ({
    content: input,
    len: input.length - 1
  }));

  const [caretPosition, setCaretPosition] = useState(0);

  const peek = (idx?: number) => {
    return cachedInput.content[idx ?? caretPosition];
  };

  const moveCursor = (amt: number) => {
    setCaretPosition(prev => clamp(prev + amt, cachedInput.len));
    console.log(caretPosition);

    return caretPosition;
  };

  const cursorBack = (): CursorPos => {
    const newPos = moveCursor(-1);

    return [newPos, peek()] as CursorPos;
  };

  const cursorForward = (): CursorPos => {
    const newPos = moveCursor(1);

    return [newPos, peek()] as CursorPos;
  };

  const cursorNextWord = (): CursorPos => {
    let pos = caretPosition;

    while (peek(pos) !== ' ') {
      pos++;
    }

    pos++;

    console.log(pos);

    setCaretPosition(pos);

    return [pos, peek()] as CursorPos;
  };

  return {
    ref,
    cursorNextWord,
    cursorForward,
    cursorBack,
    caretPos: caretPosition
  };
};
