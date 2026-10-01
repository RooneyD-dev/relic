import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query and returns its current match, read during
 * render (no effect round-trip). `false` is reported on the server/first paint.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
