let nanoid: (size?: number) => string;
try {
  nanoid = require('nanoid');
} catch (error) {
  nanoid = require('nanoid/non-secure');
}
import {
  FUNCTION_BASE_URL,
  LOCAL_SESSION_KEY,
  LOCAL_KEY_PREFIX
} from '../const';

export function getLocalSessionKey(serviceId: string) {
  return `${LOCAL_KEY_PREFIX}:${serviceId}:${LOCAL_SESSION_KEY}`;
}

export function generateSession(): string {
  return nanoid();
}

export function getBaseURL(serviceId: string): string {
  return FUNCTION_BASE_URL.replace('{serviceId}', serviceId);
}

/**
 * @param ms number
 */
export const sleep = async (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
