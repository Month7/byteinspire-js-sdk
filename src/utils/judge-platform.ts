export const isBrowser = (function isBrowser() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof Blob !== 'undefined') return true;
  return false;
}());

export const isNode = (function isNode() {
  if (typeof global !== 'undefined' && typeof global.setImmediate !== 'undefined') return true;
  return false;
}());

export const isMiniProgram = (function isMiniProgram() {
  if ((typeof wx !== 'undefined' || typeof tt !== 'undefined') && !isBrowser && !isNode) return true;
  return false;
}());
