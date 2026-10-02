import { setToLS, getFromLS } from "./storage";
import { EGG_ROSTER } from "../data/commands";

const STORAGE_KEY = "tsn-eggs";

const read = (): string[] =>
  (getFromLS(STORAGE_KEY) ?? "").split(",").filter(Boolean);

export const totalEggs = (): number => EGG_ROSTER.length;

export const foundEggs = (): string[] => read();

export const foundCount = (): number => read().length;

export const hasFound = (id: string): boolean => read().includes(id);

/**
 * Record an easter egg as discovered.
 * @returns true if this is the first time it has been found
 */
export const discover = (id: string): boolean => {
  if (!id || hasFound(id)) return false;

  setToLS(STORAGE_KEY, [...read(), id].join(","));
  return true;
};

export const resetEggs = (): void => {
  window.localStorage.removeItem(STORAGE_KEY);
};
