import "@testing-library/jest-dom";
import { afterEach } from "vitest";

// Node 18+ exposes a `localStorage` global that shadows the jsdom one and is
// undefined unless --localstorage-file is passed, which would break the
// theme and easter egg persistence layer. Replace it with a real in-memory
// Storage so `utils/storage` is actually exercised.
if (!window.localStorage) {
  const store = new Map<string, string>();

  const memoryStorage: Storage = {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: key => (store.has(key) ? (store.get(key) as string) : null),
    key: index => Array.from(store.keys())[index] ?? null,
    removeItem: key => {
      store.delete(key);
    },
    setItem: (key, value) => {
      store.set(key, String(value));
    },
  };

  Object.defineProperty(window, "localStorage", {
    value: memoryStorage,
    writable: true,
    configurable: true,
  });
}

// Persisted state would otherwise leak between tests
afterEach(() => {
  window.localStorage.clear();
});
