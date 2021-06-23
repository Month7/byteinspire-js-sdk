declare module 'localstorage-memory' {
  export let length: number;
  export function getItem(key: string): string | null;
  export function setItem(key: string, value?: any): undefined;
  export function removeItem(key: string): undefined;
  export function key(index: number): string | null;
  export function clear(): undefined;
}
