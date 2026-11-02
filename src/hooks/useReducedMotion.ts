import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

const getSnapshot = () => window.matchMedia(query).matches;

const getServerSnapshot = () => false;

export const useReducedMotion = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
