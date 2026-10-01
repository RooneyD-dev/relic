import { ArrowUpRight } from "lucide-react";
import { ARTISTS, type Artist } from "../data/content";
import { Reveal, SectionLabel } from "./ui";

function Profile({
  artist,
  index,
  onOpenWork,
}: {
  artist: Artist;
  index: number;
  onOpenWork: (id: string, trigger: HTMLElement) => void;
}) {
  const flip = index % 2 === 1;

  return (
    <li className="border-t border-white/10 py-12 md:py-16">
      <Reveal className="grid gap-7 md:grid-cols-12 md:gap-10">
        <div
          className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-soft">
            <img
              src={artist.image}
              alt={artist.imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[50%_28%] grayscale-[35%] transition-all duration-700 hover:grayscale-0"
            />
            <span
              aria-hidden="true"
              className="absolute left-4 top-4 label bg-ink/70 px-2.5 py-1.5 text-chalk backdrop-blur-sm"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div
          className={`flex flex-col md:col-span-6 ${
            flip ? "md:order-1 md:col-start-1" : "md:col-start-7"
          }`}
        >
          <SectionLabel className="text-steel-dim">Featured artist</SectionLabel>

          <h3 className="mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-tight tracking-[-0.03em] text-chalk">
            {artist.name}
          </h3>

          <p className="mt-3 label text-mineral">{artist.practice}</p>

          <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-chalk-dim">
            {artist.bio}
          </p>

          <dl className="mt-8 grid max-w-lg grid-cols-2 gap-px border border-white/10 bg-white/10">
            <div className="bg-ink px-4 py-3.5">
              <dt className="label text-steel-dim">Based</dt>
              <dd className="mt-1.5 text-sm text-chalk">{artist.based}</dd>
            </div>
            <div className="bg-ink px-4 py-3.5">
              <dt className="label text-steel-dim">Featured work</dt>
              <dd className="mt-1.5 text-sm text-chalk">
                {artist.featuredTitle}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            aria-haspopup="dialog"
            onClick={(event) => onOpenWork(artist.workId, event.currentTarget)}
            className="group mt-7 inline-flex min-h-11 w-fit items-center gap-2 border-b border-white/25 pb-1 label text-chalk transition-colors duration-200 hover:border-mineral hover:text-mineral"
          >
            View featured work
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </Reveal>
    </li>
  );
}

export function Artists({
  onOpenWork,
}: {
  onOpenWork: (id: string, trigger: HTMLElement) => void;
}) {
  return (
    <section
      id="artists"
      aria-labelledby="artists-title"
      className="bg-ink py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel className="text-steel">Artists</SectionLabel>
              <p className="mt-4 label text-steel-dim">02 — Studio notes</p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={0.06}>
              <h2
                id="artists-title"
                className="text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-chalk"
              >
                Made by people, collected with context.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-chalk-dim md:text-lg">
                RELIC profiles read like studio notes: what an artist works
                with, why they work that way, and where the piece came from
                before it reached you. The three artists below are invented for
                this concept.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 lg:mt-20">
          {ARTISTS.map((artist, index) => (
            <Profile
              key={artist.id}
              artist={artist}
              index={index}
              onOpenWork={onOpenWork}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
