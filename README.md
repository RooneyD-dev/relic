# RELIC — Art worth keeping.

A single-page launch site for **RELIC**, a fictional digital art and collectibles
platform for artists and collectors. Built as portfolio concept material: the
artists, artworks, editions, and provenance records on the site are invented,
nothing is for sale, and no financial or verification claims are made.

> RELIC is a design concept, not a live marketplace.

## Stack

- **React 19** + **TypeScript** (strict, `tsc -b` as part of `build`)
- **Vite 7** (rollup-based — see note below)
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **Framer Motion** for entrance, hover, and dialog motion
- **lucide-react** icons
- Google Fonts: **Inter** (body/navigation), **Space Mono** (metadata and
  labels), **Anton SC** (the background wordmark only)

> Vite is pinned to v7 because this machine's application-control policy blocks
> the Vite 8 rolldown native binding (`.node`). Vite 7 + rollup builds normally.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
npm run lint     # eslint (flat config, typescript-eslint + react-hooks)
```

> `npm run lint` uses ESLint because this machine's application-control policy
> also blocks oxlint's native binary, and `npm run build` runs `tsc -b` before
> bundling, so type errors fail the build.

## Structure

```
src/
  App.tsx                    page composition + artwork-dialog state
  index.css                  design tokens (@theme), base styles, utilities
  data/content.ts            all copy, works, artists, videos, backdrops
  hooks/useFocusTrap.ts      focus trap, Escape handling, scroll lock
  hooks/useMediaQuery.ts     live media queries (pointer, reduced motion)
  components/
    Header.tsx               fixed nav + portal'd full-screen mobile menu
    Hero.tsx                 pointer-scrubbed hero video, line reveals
    Manifesto.tsx            full-viewport statement, subtle scroll drift
    Discover.tsx             editorial grid of three concept works
    ArtworkDialog.tsx        accessible detail dialog with prev/next
    Artists.tsx              alternating editorial artist profiles
    HowItWorks.tsx           three steps + "collection record" panel
    Principles.tsx           three platform commitments over video
    JoinList.tsx             client-side validated launch list (demo only)
    Footer.tsx               cropped video band, links, concept note
    BackdropVideo.tsx        decorative video with still-image fallback
    ui.tsx                   Reveal, SectionLabel, BrandMark, grain
```

## Interaction and accessibility notes

- **Hero scrub** — desktop fine pointers map horizontal position to video time.
  The layout read happens inside the rAF callback (one per frame, not one per
  pointer event), seeks are skipped while a seek is in flight, and only issued
  when the target drifts by more than 0.12s. Touch devices play the video
  muted/looped; `prefers-reduced-motion` renders no clip at all — the still
  backdrop carries the section. The hero copy is readable either way.
- **Decorative video** — every other clip is `muted`, `loop`, `playsInline`,
  sits over a still backdrop image, and only mounts while its section is within
  ~400px of the viewport, so four ~10 MB loops are never decoding at once.
  Reduced-motion visitors fetch none of them; an error hides the clip and keeps
  the still.
- **Navigation** — fixed header, `aria-expanded`/`aria-controls` hamburger,
  portal'd full-screen menu with focus trap, Escape to close, focus returned to
  the toggle, body scroll lock, and auto-close when resizing to desktop.
- **Artwork dialog** — `role="dialog"`, `aria-modal`, labelled title, focus trap,
  Escape and backdrop close, background `inert` while open, focus restored to
  the control that opened it, and prev/next browsing that moves focus to the
  new title so the change is announced.
- **Menu and dialog share one model** — while either is open the page behind is
  `inert`, the surface itself is portalled outside that wrapper, and focus is
  parked inside it (re-checked across the first few frames, since the control
  that opened the surface usually becomes inert in the same commit).
- **Skip link** — the first tab stop jumps to `#main`; rings are two-tone
  (ink outline + mineral halo) so they stay visible on ink, chalk and the
  mineral panel alike.
- **Launch list** — validated in the browser only. No network request is made
  and nothing is stored; the success state says so, and focus moves to the one
  control it offers rather than falling back to `<body>`.
- **Motion** — `MotionConfig` wired to a live `prefers-reduced-motion`
  subscription, one-time `whileInView` reveals with a visible-content fallback,
  and smooth anchor scrolling that is disabled under `prefers-reduced-motion`.
- Colour contrast, visible focus rings, 44px+ targets, semantic landmarks, and
  a logical heading order are used throughout.

## Content and imagery

- Artwork and portrait imagery is loaded from `images.unsplash.com` (stable
  CDN URLs); cinematic background clips are the remote MP4s listed in
  `src/data/content.ts`. Each photo has a single URL, sized to its largest use,
  so the card and the detail dialog share one cached file.
- All artists, works, editions, and provenance entries are fictional examples
  and are labelled as such on the page, in the dialog, and in the footer.

## Deployment

```bash
# GitHub
gh repo create relic --private --source . --push

# Vercel
vercel --prod
```

The Vite build output in `dist/` is a static site, so any static host works.
