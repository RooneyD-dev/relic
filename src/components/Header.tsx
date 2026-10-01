import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/content";
import { BrandMark } from "./ui";
import { useFocusTrap, useScrollLock } from "../hooks/useFocusTrap";

export function Header({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, setOpen]);

  const close = () => setOpen(false);

  useFocusTrap(panelRef, open, close);
  useScrollLock(open);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;

    const toggle = toggleRef.current;
    if (toggle && toggle.getClientRects().length > 0) {
      toggle.focus();
      return;
    }
    /* Resized to desktop while the menu was open: the toggle is display:none
       now, so hand focus to the primary navigation instead of dropping it. */
    const focusWasInside =
      panelRef.current?.contains(document.activeElement) ?? false;
    if (focusWasInside) {
      document
        .querySelector<HTMLElement>('#top nav[aria-label="Primary"] a')
        ?.focus();
    }
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-white/10 bg-ink/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-chalk focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-8 lg:px-12">
          <a
            href="#top"
            className="flex items-center gap-3 py-2 text-chalk"
            aria-label="RELIC — back to top"
          >
            <BrandMark className="h-5 w-5 shrink-0" />
            <span className="text-[15px] font-semibold tracking-[0.36em]">
              RELIC
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="label py-2 text-steel transition-colors duration-200 hover:text-chalk"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#join"
            className="group hidden min-h-11 items-center gap-2 border border-white/20 px-5 py-3 label text-chalk transition-colors duration-200 hover:border-mineral hover:text-mineral md:inline-flex"
          >
            Join the collection
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-chalk transition-colors hover:text-mineral md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <X aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Menu aria-hidden="true" className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {createPortal(
        <div
          id="mobile-menu"
          ref={panelRef}
          aria-hidden={!open}
          inert={!open}
          aria-label="Site menu"
          className={`fixed inset-0 z-[60] bg-ink transition-opacity duration-300 md:hidden ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
              <span className="flex items-center gap-3 text-chalk">
                <BrandMark className="h-5 w-5" />
                <span className="text-[15px] font-semibold tracking-[0.36em]">
                  RELIC
                </span>
              </span>
              <button
                type="button"
                onClick={close}
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-chalk transition-colors hover:text-mineral"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
              <nav aria-label="Mobile">
                <ul>
                  {NAV_LINKS.map((link, index) => (
                    <li key={link.href} className="border-t border-white/10">
                      <a
                        href={link.href}
                        onClick={close}
                        data-autofocus={index === 0 ? "" : undefined}
                        className="flex items-baseline justify-between gap-4 py-5 text-3xl font-light tracking-tight text-chalk transition-colors hover:text-mineral"
                      >
                        {link.label}
                        <span className="label text-steel-dim">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-10 space-y-5 border-t border-white/10 pt-8">
                <a
                  href="#join"
                  onClick={close}
                  className="group inline-flex min-h-11 w-full items-center justify-center gap-2.5 bg-chalk px-6 py-3.5 label text-ink transition-colors duration-200 hover:bg-mineral"
                >
                  Join the collection
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <p className="label text-steel-dim">Art worth keeping.</p>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
