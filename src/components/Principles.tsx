import { BACKDROPS, PRINCIPLES, VIDEOS } from "../data/content";
import { BackdropVideo } from "./BackdropVideo";
import { Reveal, SectionLabel } from "./ui";

export function Principles() {
  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="relative isolate overflow-hidden bg-ink py-20 md:py-28 lg:py-32"
    >
      <BackdropVideo src={VIDEOS.collection} fallback={BACKDROPS.collection} />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/85 backdrop-brightness-[0.85]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/82 to-ink/85"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel className="text-steel">Principles</SectionLabel>
              <p className="mt-4 label text-steel-dim">04 — What we hold to</p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={0.06}>
              <h2
                id="principles-title"
                className="text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-chalk"
              >
                Built around the work.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-chalk-dim md:text-lg">
                RELIC is judged by how well it serves the object and the person
                who made it. Three commitments shape every screen — and nothing
                here is dressed up as a performance figure.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid gap-px border-t border-white/15 md:mt-20 md:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className="border-b border-white/15 py-8 md:border-b-0 md:px-6 md:py-9 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-white/15"
            >
              <Reveal delay={index * 0.08}>
                <span className="label text-mineral">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-2xl font-medium tracking-tight text-chalk">
                  {principle.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-chalk-dim">
                  {principle.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-[70ch] border-t border-white/10 pt-6 text-xs leading-relaxed text-steel">
            A note on honesty: this is a design concept, so there are no user
            counts, volumes, security guarantees, or verification badges to
            show. Provenance information is only ever as good as the marketplace
            and network it comes from, and it never proves copyright ownership.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
