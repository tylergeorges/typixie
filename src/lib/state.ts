import { create } from 'zustand';
import { produce } from 'immer';

import { Actions, State } from '@/lib/types';
import { clamp } from '@/utils/clamp';
import {
  getLetter,
  getNextWord,
  getPrevWord,
  removeCaretStyle,
  setCaretPosition,
  setCaretStyle
} from '@/utils/html-helpers';
import { removeLetterStyle, setLetterStyle } from '@/utils/style-helpers';

export const getWords = () => {
  const DUMMY_TEST =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quibusdam, natus incidunt itaque, laboriosam modi deserunt libero, accusamus tempore aut vero veniam culpa provident quidem expedita sed odit mollitia molestiae.';

  const words = DUMMY_TEST.split(' ').map(word => word + ' ');

  return words;
};

function handleFirstKeyDown(state: State, now: number) {
  state.isTyping = true;
  state.lastCharTypedTime = now;
  state.lastWordTypedTime = now;
  removeCaretStyle(state.caret as HTMLDivElement, 'animate-cursor-blink');
}

export const getCurrentLetter = (charIdx: number, activeWord: HTMLElement) => {
  const currentLetterPos = clamp(charIdx, activeWord.children.length - 1);

  const targetLetter = getLetter(activeWord, currentLetterPos);

  return targetLetter;
};

const resetPrevLetter = (state: State) => {
  if (!state.activeWord) return;

  let letterElement = getLetter(state.activeWord, state.charIdx);

  if (letterElement) {
    removeLetterStyle(letterElement, 'incorrect correct');
    setLetterStyle(letterElement, 'animate-text-blink');
  }
};

const handleKeyDown = (state: State, activeWord: HTMLElement, now: number, isCorrect: boolean) => {
  if (!state.activeWord) return;

  const currentPosition = state.charIdx;

  state.totalTime = state.totalTime + (now - state.lastCharTypedTime);

  const [nextWord, isLastWord] = getNextWord(state.activeWord);

  const wordLen = activeWord.children.length - 1;

  if ((isLastWord && currentPosition === wordLen) || !state.caret) return;

  const advanceInWord = currentPosition < wordLen;

  if (advanceInWord) {
    state.charIdx += 1;
  } else {
    state.activeWord = nextWord;
    state.wordIdx += 1;
    state.wordsTyped += 1;
    state.charIdx = 0;
  }

  if (isCorrect) {
    state.totalCharsTyped += 1;
    state.lastWordTypedTime = now;
    state.lastCharTypedTime = now;
  }

  setCaretPosition(state.caret, state.activeWord, state.charIdx, state.scroller);
};

export const useAppStore = create<State & { actions: Actions }>(set => ({
  activeWord: null,
  caret: null,
  scroller: null,
  charIdx: 0,
  wordIdx: 0,
  totalTime: 0,
  lastCharTypedTime: 0,
  lastWordTypedTime: 0,
  wordsTyped: 0,
  totalCharsTyped: 0,
  words: getWords(),
  isTyping: false,

  actions: {
    setActiveWord: activeWord =>
      set(
        produce((state: State) => {
          if (state.caret && !state.activeWord) {
            setCaretPosition(state.caret, activeWord, state.charIdx, state.scroller);

            state.caret.classList.remove('hidden');

            setCaretStyle(state.caret, 'animate-cursor-blink');
          }

          if (activeWord) {
            state.activeWord = activeWord;
          }
        })
      ),

    setScroller: scroller => set({ scroller }),

    setCaret: caret => set({ caret }),

    setIsTyping: isTyping =>
      set(
        produce((state: State) => {
          if (state.isTyping !== isTyping) {
            if (!isTyping && state.caret) {
              setCaretStyle(state.caret, 'animate-cursor-blink');
            }

            state.isTyping = isTyping;
          }
        })
      ),

    keydown: key =>
      set(
        produce((state: State) => {
          let activeWord = state.activeWord;
          const keyDownTime = performance.now();

          if (!activeWord) return;

          const currentLetter = getCurrentLetter(state.charIdx, activeWord);

          if (!currentLetter) return;

          if (!state.isTyping) {
            handleFirstKeyDown(state, keyDownTime);
          }

          const isCorrect = (currentLetter.textContent as string) === key;

          if (isCorrect) {
            setLetterStyle(currentLetter, 'correct');
          } else {
            setLetterStyle(currentLetter, 'incorrect');
          }

          handleKeyDown(state, activeWord, keyDownTime, isCorrect);
        })
      ),

    back: isCtrl =>
      set(
        produce((state: State) => {
          removeCaretStyle(state.caret as HTMLDivElement, 'animate-cursor-blink');

          if (!state.activeWord || !state.caret || (state.wordIdx === 0 && state.charIdx === 0))
            return;

          if (isCtrl) {
            const jumpToPrevWord = state.wordIdx > 0 && state.charIdx === 0;

            if (jumpToPrevWord) {
              state.wordsTyped -= state.wordsTyped === 0 ? 0 : 1;
              let [prevWord] = getPrevWord(state.activeWord);

              state.wordIdx -= state.wordIdx === 0 ? 0 : 1;
              state.activeWord = prevWord;
            }

            const letters = state.activeWord.children;

            for (let i = 0; i < letters.length; i++) {
              const letter = letters.item(i);

              removeLetterStyle(letter, 'incorrect correct');
            }

            state.charIdx = 0;
          } else if (state.charIdx === 0) {
            state.charIdx = state.words[state.wordIdx - 1].length - 1; // clamp to end of previous word

            state.wordIdx -= 1;

            let [prevWord] = getPrevWord(state.activeWord);
            state.activeWord = prevWord;

            state.wordsTyped -= 1;
          } else {
            state.charIdx -= 1;
          }

          setCaretPosition(state.caret, state.activeWord, state.charIdx, state.scroller);

          resetPrevLetter(state);
        })
      )
  }
}));

export const useAppActions = () => useAppStore(state => state.actions);
