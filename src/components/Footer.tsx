import { ArrowUpRight } from "lucide-react";
import { BACKDROPS, NAV_LINKS, VIDEOS } from "../data/content";
import { BackdropVideo } from "./BackdropVideo";
import { BrandMark } from "./ui";

const FOOTER_LINKS = [...NAV_LINKS, { label: "Contact", href: "#join" }];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "X", href: "https://x.com/" },
];

export function Footer() {
  return (
    <footer className="bg-ink" aria-labelledby="footer-title">
      <div
        aria-hidden="true"
        className="relative h-40 w-full overflow-hidden border-t border-white/10 md:h-56"
      >
        <BackdropVideo
          src={VIDEOS.footer}
          fallback={BACKDROPS.footer}
          videoClassName="object-bottom"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-14 md:px-8 md:pt-16 lg:px-12">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 id="footer-title" className="sr-only">
              RELIC
            </h2>
            <a
              href="#top"
              className="inline-flex items-center gap-3 text-chalk"
              aria-label="RELIC — back to top"
            >
              <BrandMark className="h-6 w-6" />
              <span className="text-lg font-semibold tracking-[0.36em]">
                RELIC
              </span>
            </a>
            <p className="mt-5 text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-tight tracking-[-0.03em] text-chalk">
              Art worth keeping.
            </p>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-steel">
              A considered place to discover, collect, and keep digital art.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <p className="label text-steel-dim">Sections</p>
            <ul className="mt-5 space-y-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-[15px] text-chalk-dim transition-colors hover:text-mineral"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label text-steel-dim">Elsewhere</p>
            <ul className="mt-5 space-y-1">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-2 text-[15px] text-chalk-dim transition-colors hover:text-mineral"
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[70ch] text-xs leading-relaxed text-steel">
            RELIC is a fictional digital art platform concept created for a
            design portfolio. The artists, artworks, editions, and provenance
            records shown here are invented — nothing on this page is a real
            listing, a marketplace, or an offer to buy.
          </p>
          <p className="label shrink-0 text-steel-dim">
            © {new Date().getFullYear()} RELIC — Concept
          </p>
        </div>
      </div>
    </footer>
  );
}
