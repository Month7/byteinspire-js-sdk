export const isBrowser = (function () {
  try {
    // eslint-disable-next-line no-undef
    return globalThis === window;
  } catch (error) {
    return false;
  }
}());

export const isNode = (function isNode() {
  // eslint-disable-next-line no-undef
  if (typeof global !== 'undefined' && typeof global.setImmediate !== 'undefined' && typeof globalThis !== 'undefined' && globalThis === global) return true;
  return false;
}());

export const isMiniProgram = (function isMiniProgram() {
  if ((typeof wx !== 'undefined' || typeof tt !== 'undefined') && !isBrowser && !isNode) return true;
  return false;
}());
