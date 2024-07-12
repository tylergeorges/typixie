export const clamp = (num: number, max?: number) => {
  return Math.max(0, Math.min(num, max ?? num));
};
