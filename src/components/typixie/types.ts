export interface TypixieLetter {
  val: string;
}

export interface TypixieTest {
  words: TypixieWord[];
  wordsArr: string[];
  rawTest: string;
}

export interface TypixieWord {
  letters: TypixieLetter[];
}

export interface TypixiePosition {
  letterPos: number;
}

export type CursorPos = [pos: number, char: string];

export interface Theme {
  idx: number;
  name: string;
}
