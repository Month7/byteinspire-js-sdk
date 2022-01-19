let nanoid: (size?: number) => string;
try {
  nanoid = require('nanoid').nanoid;
} catch (error) {
  nanoid = require('nanoid/non-secure').nanoid;
}

import {
  FUNCTION_BASE_URL,
  LOCAL_SESSION_KEY,
  LOCAL_KEY_PREFIX,
  USER_BASE_URL
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

export function getUserOAuthBaseURL(serviceId: string): string {
  return USER_BASE_URL.replace('{serviceId}', serviceId);
}

/**
 * @param ms number
 */
export const sleep = async (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
