import { State } from '@/lib/types';
import { remove, set } from '@/utils/style-helpers';

export function setCaretStyle(caret: HTMLDivElement, styles: React.CSSProperties | string) {
  set(caret, styles);
}

export function setCaretPosition(state: State, activeWord: HTMLElement, charIdx: number) {
  const { caret } = state;

  if (!caret) return;

  if (caret.classList.contains('opacity-0')) {
    caret.classList.remove('opacity-0');

    setCaretStyle(caret, 'animate-blink');
  }

  const charLeftElement = activeWord.children[charIdx] as HTMLElement;

  if (charLeftElement) {
    const charElementRect = charLeftElement.getBoundingClientRect();

    setCaretStyle(caret, {
      transform: `translateX(${charLeftElement.offsetLeft}px) translateY(${charLeftElement.offsetTop}px)`,
      width: `${charElementRect.width}px`
    });
  }
}

export function removeCaretStyle(caret: HTMLDivElement, styles: React.CSSProperties | string) {
  remove(caret, styles);
}

export function getWord(activeWord: HTMLElement, direction: number) {
  const sibling =
    direction === 1
      ? activeWord.nextElementSibling?.classList.contains('word')
        ? activeWord.nextElementSibling
        : null
      : activeWord.previousElementSibling?.classList.contains('word')
        ? activeWord.previousElementSibling
        : null;

  return sibling as HTMLElement | null;
}

export function getNextWord(activeWord: HTMLElement): [word: HTMLSpanElement, isLastWord: boolean] {
  const sibling = getWord(activeWord, 1);

  return [sibling ?? activeWord, sibling === null];
}

export function getPrevWord(
  activeWord: HTMLElement
): [word: HTMLSpanElement, isFirstWord: boolean] {
  const sibling = getWord(activeWord, -1);

  return [sibling ?? activeWord, sibling === null];
}

export function getLetter(activeWord: HTMLElement, idx: number) {
  const children = activeWord.children;

  let child = children.item(idx);

  return child?.textContent?.length === 1 ? child : children.item(Math.min(idx - 1, 0));
}
