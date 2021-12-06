export const isBrowser = (function () {
  try {
    // eslint-disable-next-line no-undef
    return globalThis === window;
  } catch (error) {
    return false;
  }
}());

export const isNode = (function isNode() {
  if (typeof global !== 'undefined' && typeof global.setImmediate !== 'undefined') return true;
  return false;
}());

export const isMiniProgram = (function isMiniProgram() {
  if ((typeof wx !== 'undefined' || typeof tt !== 'undefined') && !isBrowser && !isNode) return true;
  return false;
}());
