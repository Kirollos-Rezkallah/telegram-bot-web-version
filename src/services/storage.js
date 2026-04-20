const STORAGE_KEY = 'anastasia-confectionery-state';

const isBrowser = () => typeof window !== 'undefined' && Boolean(window.localStorage);

export function loadClientState() {
  if (!isBrowser()) {
    return undefined;
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : undefined;
  } catch {
    return undefined;
  }
}

export function saveClientState(state) {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be unavailable in private sessions. The app should still run.
  }
}
