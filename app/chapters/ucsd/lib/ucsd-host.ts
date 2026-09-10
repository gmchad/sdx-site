import { useSyncExternalStore } from 'react';

export const UCSD_HOST = 'ucsd.sdx.community';

const noopSubscribe = () => () => {};
const getSnapshot = () => window.location.hostname === UCSD_HOST;
const getServerSnapshot = () => false;

/** True once the page runs on ucsd.sdx.community. False during server render and hydration. */
export function useIsUcsdHost(): boolean {
  return useSyncExternalStore(noopSubscribe, getSnapshot, getServerSnapshot);
}

/**
 * Resolve a chapter-relative path for the current host.
 * On ucsd.sdx.community the chapter is the site root, so "/apply" stays "/apply".
 * On sdx.community the chapter lives under /chapters/ucsd.
 */
export function ucsdPath(path: string, onUcsdHost: boolean): string {
  return onUcsdHost ? path || '/' : `/chapters/ucsd${path}`;
}
