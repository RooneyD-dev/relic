import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { WORKS, type Work } from "../data/content";
import { useFocusTrap, useScrollLock } from "../hooks/useFocusTrap";
import { useMediaQuery } from "../hooks/useMediaQuery";

type MetaKey = "medium" | "collection" | "edition" | "year";

const META: { key: MetaKey; label: string }[] = [
  { key: "medium", label: "Medium" },
  { key: "collection", label: "Collection" },
  { key: "edition", label: "Edition" },
  { key: "year", label: "Year" },
];

export function ArtworkDialog({
  work,
  onClose,
  onNavigate,
}: {
  work: Work | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastWorkId = useRef<string | null>(null);
  const active = work !== null;

  useFocusTrap(panelRef, active, onClose);
  useScrollLock(active);

  /* Previous/Next swaps every visible detail at once — move focus to the new
     title so a screen reader announces what changed. */
  useEffect(() => {
    const id = work?.id ?? null;
    if (id && lastWorkId.current && lastWorkId.current !== id) {
      titleRef.current?.focus();
    }
    lastWorkId.current = id;
  }, [work]);

  const position = work ? WORKS.findIndex((item) => item.id === work.id) : -1;
  const prev = position > 0 ? WORKS[position - 1] : WORKS[WORKS.length - 1];
  const next = position < WORKS.length - 1 ? WORKS[position + 1] : WORKS[0];

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          key="artwork-dialog"
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="artwork-dialog-title"
            className="relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden border border-white/12 bg-ink shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-ink/95 px-5 py-3">
              <p className="label text-mineral">Fictional concept example</p>
              <button
                type="button"
                onClick={onClose}
                data-autofocus=""
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-chalk transition-colors hover:text-mineral"
              >
                <span className="sr-only">Close artwork details</span>
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 overflow-y-auto sm:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
              <div className="relative min-h-[34svh] bg-ink-soft sm:min-h-[32rem]">
                <img
                  src={work.image}
                  alt={work.imageAlt}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute bottom-4 left-4 label bg-ink/75 px-2.5 py-1.5 text-chalk backdrop-blur-sm">
                  {work.index} / {work.collection}
                </span>
              </div>

              <div className="px-5 pb-8 pt-7 sm:px-8">
                <p className="label text-steel-dim">
                  {work.medium} — {work.year}
                </p>
                <h2
                  id="artwork-dialog-title"
                  ref={titleRef}
                  tabIndex={-1}
                  className="mt-4 text-3xl font-medium tracking-tight text-chalk sm:text-4xl"
                >
                  {work.title}
                </h2>
                <p className="mt-2 text-base text-chalk-dim">
                  by <span className="text-mineral">{work.artist}</span>
                </p>

                <dl className="mt-7 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
                  {META.map(({ key, label }) => (
                    <div key={key} className="bg-ink px-4 py-3.5">
                      <dt className="label text-steel-dim">{label}</dt>
                      <dd className="mt-1.5 text-sm leading-snug text-chalk">
                        {work[key]}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-7 text-[15px] leading-relaxed text-chalk-dim">
                  {work.story}
                </p>

                <div className="mt-9 border-t border-white/10 pt-6">
                  <h3 className="label text-steel">
                    Illustrative provenance timeline
                  </h3>
                  <ol className="mt-5">
                    {work.provenance.map((entry, index) => (
                      <li
                        key={entry.label}
                        className="relative flex gap-4 pb-6 last:pb-0"
                      >
                        {index < work.provenance.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="absolute left-[5px] top-4 h-full w-px bg-white/15"
                          />
                        )}
                        <span
                          aria-hidden="true"
                          className="relative mt-1.5 h-2.5 w-2.5 shrink-0 border border-mineral bg-mineral"
                        />
                        <div>
                          <p className="label text-chalk">
                            {entry.date} — {entry.label}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-steel">
                            {entry.note}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5 border-t border-white/10 pt-5 text-xs leading-relaxed text-steel-dim">
                    Invented for this portfolio concept. No real ownership
                    record, marketplace listing, or network verification is
                    being shown.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-ink px-4 py-3">
              <button
                type="button"
                onClick={() => onNavigate(prev.id)}
                className="group inline-flex min-h-11 items-center gap-2.5 border border-white/15 px-4 py-2.5 label text-chalk transition-colors hover:border-mineral hover:text-mineral"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                <span>Previous work</span>
              </button>

              <p className="label text-steel-dim" aria-hidden="true">
                {position + 1} / {WORKS.length}
              </p>

              <button
                type="button"
                onClick={() => onNavigate(next.id)}
                className="group inline-flex min-h-11 items-center gap-2.5 border border-white/15 px-4 py-2.5 label text-chalk transition-colors hover:border-mineral hover:text-mineral"
              >
                <span>Next work</span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
