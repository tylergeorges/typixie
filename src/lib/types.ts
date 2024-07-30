export type State = {
  wordIdx: number;
  charIdx: number;
  words: string[];
  caret: HTMLDivElement | null;
  scroller: HTMLDivElement | null;
  activeWord: HTMLElement | null;
  totalTime: number;
  lastCharTypedTime: number;
  wordsTyped: number;
  totalCharsTyped: number;
  lastWordTypedTime: number;
  isTyping: boolean;
};

export type Actions = {
  setActiveWord: (activeWord: HTMLElement) => void;
  setCaret: (caret: HTMLDivElement) => void;
  setScroller: (caret: HTMLDivElement) => void;
  keydown: (key: string) => void;
  back: (isCtrl: boolean) => void;
  setIsTyping: (isTyping: boolean) => void;
};

export type Action =
  | { type: 'setActiveWord'; element: HTMLElement | null | undefined }
  | { type: 'setCaret'; caret: HTMLDivElement | null | undefined }
  | { type: 'keydown'; key: string }
  | { type: 'back'; isCtrl: boolean };
