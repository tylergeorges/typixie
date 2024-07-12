type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
// type Entries<T> = {
//   [K in keyof T]: [K, T[K]];
// }[keyof T][];

export const entries = <T extends object>(obj: T) =>
  Object.entries(obj) as  [string, string][] 
  // Object.entries(obj) as  Entries<T>
  // Object.entries(obj) as [string, string][] ;
