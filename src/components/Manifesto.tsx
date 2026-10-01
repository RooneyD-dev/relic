import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BackdropVideo } from "./BackdropVideo";
import { Reveal, SectionLabel } from "./ui";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { BACKDROPS, VIDEOS } from "../data/content";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={ref}
      id="manifesto"
      aria-labelledby="manifesto-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      <BackdropVideo src={VIDEOS.manifesto} fallback={BACKDROPS.manifesto} />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/78 backdrop-brightness-[0.9]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink/80"
      />

      <motion.div
        style={reduce ? undefined : { y: drift }}
        className="relative mx-auto w-full max-w-3xl px-5 py-28 text-center md:px-8"
      >
        <Reveal>
          <SectionLabel className="justify-center text-steel">
            A place for art, not hype.
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="manifesto-title"
            className="mt-9 text-[clamp(2rem,5.6vw,4.25rem)] font-light leading-[1.06] tracking-[-0.03em] text-chalk"
          >
            Good art finds its people.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-[58ch] text-base leading-relaxed text-chalk-dim md:text-lg">
            RELIC brings independent digital artists and thoughtful collectors
            together. Browse work, learn its story, and keep a clear record of
            each edition's history.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mx-auto mt-10 max-w-[54ch] border-t border-white/10 pt-6 label text-steel">
            No feeds to chase. No noise to outrun. Just the work, its maker, and
            what happened to it.
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}
