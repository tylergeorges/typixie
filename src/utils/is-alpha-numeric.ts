const lowerA = "a".charCodeAt(0);
const lowerZ = "z".charCodeAt(0);

const zeroCode = "0".charCodeAt(0);
const nineCode = "9".charCodeAt(0);

const isLetter = (charCode: number) => lowerA <= charCode && charCode <= lowerZ;
const isNumber = (charCode: number) =>
  zeroCode <= charCode && charCode <= nineCode;

export const isAlphaNumeric = (char: string) => {
  const code = char.charCodeAt(0);

  return isLetter(code) || isNumber(code);
};
