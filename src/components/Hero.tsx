import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { BACKDROPS, VIDEOS } from "../data/content";

/** Seconds of drift we ignore before issuing a new seek. */
const SEEK_DELTA = 0.12;

function Line({
  children,
  index,
  reduce,
}: {
  children: React.ReactNode;
  index: number;
  reduce: boolean;
}) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "108%" }}
        animate={reduce ? undefined : { y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.12 + index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const finePointer = useMediaQuery("(pointer: fine)");
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pointerXRef = useRef(0);
  const rafRef = useRef(0);
  const [failed, setFailed] = useState(false);
  const [hint, setHint] = useState(true);

  /* Pointer-scrub on precise pointers; muted playback elsewhere; no clip at all
     when the visitor prefers reduced motion (the still backdrop carries it). */
  const mode: "scrub" | "play" | "still" = reduce
    ? "still"
    : finePointer
      ? "scrub"
      : "play";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (mode !== "play") {
      video.pause();
      return;
    }
    video.loop = true;
    void video.play().catch(() => {
      /* autoplay refused — the still frame and backdrop carry the section */
    });
  }, [mode]);

  /* Park the scrub video on a considered frame instead of a black first one. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || mode !== "scrub") return;
    const setPosterFrame = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = video.duration * 0.4;
      }
    };
    if (video.readyState >= 1) setPosterFrame();
    else video.addEventListener("loadedmetadata", setPosterFrame, { once: true });
    return () => video.removeEventListener("loadedmetadata", setPosterFrame);
  }, [mode]);

  /* Runs at most once per frame: it owns the layout read, the pointer handler
     only records where the pointer was. */
  const applyTarget = () => {
    rafRef.current = 0;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    if (video.seeking) return; // let the current seek land first
    const rect = section.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (pointerXRef.current - rect.left) / rect.width),
    );
    const target = ratio * video.duration;
    if (Math.abs(target - video.currentTime) < SEEK_DELTA) return;
    try {
      video.currentTime = target;
    } catch {
      /* seeking not supported for this source */
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (mode !== "scrub") return;
    pointerXRef.current = event.clientX;
    if (hint) setHint(false);
    if (rafRef.current === 0) {
      rafRef.current = requestAnimationFrame(applyTarget);
    }
  };

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-ink"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-ink">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BACKDROPS.hero})` }}
        />
        {!failed && mode !== "still" && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEOS.hero}
            muted
            playsInline
            preload={mode === "scrub" ? "auto" : "metadata"}
            tabIndex={-1}
            onError={() => setFailed(true)}
          />
        )}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/65 to-ink/50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/92 via-ink/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-ink/90 to-transparent"
      />
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 -z-10 opacity-35"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.95), transparent 70%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.95), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[8%] -z-10 select-none text-center font-display text-[24vw] leading-none tracking-[-0.01em] text-chalk opacity-[0.06]"
      >
        RELIC
      </span>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-32 md:px-8 md:pb-8 lg:px-12">
        <div className="max-w-4xl">
          <motion.p
            className="label text-mineral"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            Digital art / Human provenance
          </motion.p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.5rem,8.4vw,7.25rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-chalk"
          >
            <Line index={0} reduce={reduce}>
              The next
            </Line>
            <Line index={1} reduce={reduce}>
              Chapter of
            </Line>
            <Line index={2} reduce={reduce}>
              Collecting<span className="text-mineral">.</span>
            </Line>
          </h1>

          <motion.p
            className="mt-7 max-w-[48ch] text-base leading-relaxed text-chalk-dim md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Discover work by independent artists. Collect with clarity. Keep a
            record of where every piece came from.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#discover"
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-chalk px-6 py-4 label text-ink transition-colors duration-200 hover:bg-mineral"
            >
              Explore the collection
              <motion.span
                aria-hidden="true"
                animate={reduce ? undefined : { y: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.span>
            </a>
            <a
              href="#how"
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/25 px-6 py-4 label text-chalk transition-colors duration-200 hover:border-mineral hover:text-mineral"
            >
              How it works
            </a>
          </motion.div>
        </div>

        {/* Side by side only from lg: below that both labels are long enough
            to orphan a word on its own line when forced into one row. */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="label text-steel">
            Curated work / Open editions / Verified history
          </p>
          <p
            aria-hidden="true"
            className={`label text-steel transition-opacity duration-500 ${
              hint ? "opacity-100" : "opacity-0"
            }`}
          >
            {mode === "scrub" ? "Move across the frame to scrub" : "\u00A0"}
          </p>
        </div>
      </div>
    </section>
  );
}
