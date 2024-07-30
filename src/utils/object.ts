export const entries = <T extends object>(obj: T) => Object.entries(obj) as [string, string][];
