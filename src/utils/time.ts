const Millisecond = 1;
const Second = Millisecond * 1000;
const Minute = Second * 60;
const Hour = 60 * Minute;

export const time = {
  Millisecond,
  Second,
  Minute,
  Hour
} as const;
