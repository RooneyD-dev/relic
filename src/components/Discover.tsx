import { ArrowUpRight } from "lucide-react";
import { WORKS, type Work } from "../data/content";
import { Reveal, SectionLabel } from "./ui";

function WorkCard({
  work,
  onOpen,
}: {
  work: Work;
  onOpen: (id: string, trigger: HTMLElement) => void;
}) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="label text-ink/65">{work.index} — Concept example</span>
        <span className="label text-ink/65">{work.edition}</span>
      </div>

      <button
        type="button"
        aria-haspopup="dialog"
        onClick={(event) => onOpen(work.id, event.currentTarget)}
        aria-label={`View artwork: ${work.title} by ${work.artist}`}
        className="mt-5 block w-full overflow-hidden bg-ink/5"
      >
        <span className="block aspect-[4/5] w-full overflow-hidden">
          <img
            src={work.image}
            alt={work.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </span>
      </button>

      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="text-2xl font-medium tracking-tight text-ink">
          {work.title}
        </h3>
        <p className="mt-1 text-[15px] text-ink/75">{work.artist}</p>
        <p className="mt-3 label text-ink/65">{work.medium}</p>

        <button
          type="button"
          aria-haspopup="dialog"
          onClick={(event) => onOpen(work.id, event.currentTarget)}
          className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 border-b border-ink/30 pb-1 label text-ink transition-colors duration-200 hover:border-ink hover:text-mineral-deep"
        >
          View artwork
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </>
  );
}

export function Discover({
  onOpenWork,
}: {
  onOpenWork: (id: string, trigger: HTMLElement) => void;
}) {
  return (
    <section
      id="discover"
      aria-labelledby="discover-title"
      className="bg-chalk py-20 text-ink md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <div className="grid gap-8 border-b border-ink/20 pb-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel className="text-ink/65">Discover</SectionLabel>
              <p className="mt-4 label text-ink/65">01 — Selected works</p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={0.06}>
              <h2
                id="discover-title"
                className="text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
              >
                Selected for a reason.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-ink/75 md:text-lg">
                Everything here is chosen with the artist in mind, not the
                moment. Each listing carries the context that makes a piece
                worth living with: what it is, who made it, how many exist, and
                where it has been. These three works are invented for this
                portfolio concept — they are not for sale.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {WORKS.map((work, index) => (
            <li key={work.id} className="h-full">
              <Reveal
                className="group flex h-full flex-col border-t border-ink/20 pt-5"
                delay={index * 0.08}
                amount={0.15}
              >
                <WorkCard work={work} onOpen={onOpenWork} />
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-12 border-t border-ink/20 pt-6 label text-ink/65">
          Fictional artists, works, and editions — concept material for a design
          portfolio.
        </p>
      </div>
    </section>
  );
}
