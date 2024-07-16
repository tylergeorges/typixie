import { time } from '@/utils/time';

export const wpm = (charsTyped: number, typedTime: number) =>
  charsTyped === 0 || typedTime === 0
    ? 0
    : Math.round((charsTyped / (typedTime * 5)) * time.Minute);
