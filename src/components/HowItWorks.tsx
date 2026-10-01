import { ArrowUpRight, Search, ShieldCheck, Wallet } from "lucide-react";
import { RECORD_ITEMS, STEPS, BACKDROPS, VIDEOS } from "../data/content";
import { BackdropVideo } from "./BackdropVideo";
import { Reveal, SectionLabel } from "./ui";

const STEP_ICONS = [Search, Wallet, ShieldCheck];

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="relative isolate overflow-hidden bg-ink py-20 md:py-28 lg:py-32"
    >
      <BackdropVideo src={VIDEOS.provenance} fallback={BACKDROPS.provenance} />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/88" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel className="text-steel">
                How collecting works
              </SectionLabel>
              <p className="mt-4 label text-steel-dim">03 — The process</p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={0.06}>
              <h2
                id="how-title"
                className="text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-chalk"
              >
                A clearer way to collect.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-chalk-dim md:text-lg">
                Three steps, no theatre. You look closely, you read the terms,
                and you keep the paperwork somewhere you can actually find it.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-14 grid gap-px border-t border-white/10 md:mt-20 md:grid-cols-3 md:border-t-0">
          {STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? ShieldCheck;
            return (
              <li
                key={step.number}
                className="border-b border-white/10 py-8 md:border-b-0 md:border-t md:px-6 md:py-9 md:first:pl-0 md:last:pr-0"
              >
                <Reveal delay={index * 0.08}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="label text-mineral">{step.number}</span>
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 text-steel-dim"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mt-6 text-2xl font-medium tracking-tight text-chalk">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-chalk-dim">
                    {step.body}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <div className="border border-white/15 bg-ink/70 p-6 backdrop-blur-sm md:p-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    aria-hidden="true"
                    className="h-5 w-5 text-mineral"
                    strokeWidth={1.5}
                  />
                  <h3 className="label text-chalk">
                    What a collection record can show
                  </h3>
                </div>

                <ul className="mt-6 space-y-0">
                  {RECORD_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-4 border-t border-white/10 py-3.5 text-[15px] text-chalk-dim"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 bg-mineral"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-steel">
                  Specific features depend on the connected marketplace and
                  network. A record reflects what those services make available:
                  it does not prove copyright ownership, guarantee authenticity
                  claims, or remove the risks of using a platform.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center md:col-span-5">
            <Reveal delay={0.1}>
              <p className="label text-steel-dim">Early access</p>
              <p className="mt-5 text-xl leading-relaxed text-chalk-dim md:text-2xl">
                RELIC opens to a small list first, so the first editions arrive
                with full context instead of a countdown timer.
              </p>
              <a
                href="#join"
                className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-chalk px-6 py-4 label text-ink transition-colors duration-200 hover:bg-mineral sm:w-auto"
              >
                Join the early access list
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
