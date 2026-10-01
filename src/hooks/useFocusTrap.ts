import { useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Keeps keyboard focus inside `containerRef` while `active`, moves focus in on
 * activation, and forwards Escape to the caller. Focus restoration is left to
 * the caller so the original trigger can be focused after the DOM settles.
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  active: boolean,
  onEscape?: () => void,
) {
  const escapeRef = useRef(onEscape);
  useEffect(() => {
    escapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const items = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      );

    const initial =
      container.querySelector<HTMLElement>("[data-autofocus]") ??
      items()[0] ??
      container;
    if (initial === container && !container.hasAttribute("tabindex")) {
      container.setAttribute("tabindex", "-1");
    }
    initial.focus();

    /* Focus can be dropped right after activation: the control that opened the
       surface often becomes inert in the same commit, and a surface that fades
       in may not be focusable yet. Keep checking for a few frames until focus
       actually lands inside. */
    let attemptsLeft = 6;
    let focusFrame = requestAnimationFrame(function ensureFocus() {
      if (container.contains(document.activeElement)) return;
      initial.focus();
      if (container.contains(document.activeElement)) return;
      if (attemptsLeft-- > 0) focusFrame = requestAnimationFrame(ensureFocus);
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        escapeRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = items();
      if (focusables.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;
      const inside = activeEl ? container.contains(activeEl) : false;

      if (!inside || (event.shiftKey && activeEl === first)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, containerRef]);
}

/** Locks body scrolling while `active`. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}
