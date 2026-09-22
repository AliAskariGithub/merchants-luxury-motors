# Showroom & Car Configurator — Design Spec

Date: 2026-09-17
Status: Approved (pending written-spec review)
Project: VOLTSPRINT landing site (Next.js 16 App Router, React 19, TypeScript, Tailwind v4)

## 1. Summary

Extend the existing single-page VOLTSPRINT landing site into a car showroom:

1. Rebrand the palette — pure black `#000000` and lime `#C6FF33`.
2. Add a site-wide grid background that fades out at the corners and merges into the page.
3. Replace the hero with a cinematic, code-rendered dark showroom scene (the "video").
4. Add a detail page per car at `/models/[slug]` with a live configurator covering exterior, interior, colour and performance.

The existing hand-built SVG art is kept and made parametric so it can be repainted at runtime. No new dependencies, no external media assets.

## 2. Decisions (from brainstorming)

| Question | Decision |
| --- | --- |
| Hero video source | Code-rendered cinematic SVG/CSS showroom scene (no external media) |
| Grid background scope | One fixed, site-wide layer with a radial mask that dissolves at all four corners |
| Supporting neutrals | Keep the existing gray ramp for muted text, captions, hairlines, dividers |
| Detail page scope | Full detail page with a live configurator, live price and reserve handoff |
| Lineup & routing | Keep the three cars (S, GT, R); detail pages only, no separate `/models` index |
| Interior visuals | Hand-built SVG cockpit view + seat/trim detail, recoloured by interior trim |
| Architecture | Static `/models/[slug]` routes via `generateStaticParams`, shared `lib/cars.ts`, client configurator island, build mirrored into the URL |

## 3. Visual Foundation

### 3.1 Palette

Tokens live in `app/globals.css`.

- Brand black is `#000000`. It replaces the value of the tokens currently used for dark surfaces, headings and primary text (`ink-900`, `ink-950`, and the near-black dark-panel values).
- Lime is `#C6FF33` for `volt-500`, with derived `volt-400` (hover) and `volt-600` (lime text on white) so contrast holds.
- The `ink` gray ramp is retained for muted body text, captions, hairlines and dividers.
- Both hard-coded `#C6F135` accents (`components/art/CarSide.tsx` default `accent` prop, and `components/site/Models.tsx` model `accent`) are replaced with the lime token value so nothing drifts.

Contrast rules:

- Lime on black and black on lime are both high contrast and may be used freely.
- Lime is never used for small body text on white; `volt-600` (darkened lime) is used instead, as today.

### 3.2 Grid background with faded corners

- One fixed, full-viewport layer rendered once in `app/layout.tsx`, behind all content.
- Properties: `pointer-events: none`, `aria-hidden="true"`, `position: fixed`, `inset: 0`, negative z-index relative to page content.
- The grid is drawn with CSS repeating linear gradients at roughly 48px pitch, in black at roughly 5% opacity.
- A `mask-image` radial gradient keeps the grid strongest near the centre and fully transparent at all four corners, so it merges into the page background instead of stopping abruptly.
- The layer must not use `transform`, `filter`, `backdrop-filter` or `will-change`, because those create a containing block for `position: fixed` descendants (this exact bug was already hit and fixed for the video modal).
- Because it is fixed, the grid stays put while content scrolls over it. It is naturally invisible beneath the opaque black panels and footer.

**Section surfaces must become translucent, or the grid will never be seen.** Today every section paints an opaque surface (`bg-white`, `bg-ink-50`), which would cover a fixed layer completely. Required change: light section surfaces become translucent (for example `bg-white/85` and `bg-ink-50/80`) so the grid reads through faintly, while the black showroom panels, the performance banner and the footer stay fully opaque so the grid disappears there by design. Each affected section must be checked for text contrast after the change.

### 3.3 Hero showroom scene ("video")

The hero changes from light to dark. It becomes a showroom set piece.

Composition:

- Polished black floor with a turntable disc on which the car sits.
- Glass wall with lit panels (reuse and extend the existing showroom building art from `HeroScene.tsx`).
- Two sweeping spotlight cones.
- Drifting floor reflection.
- Slow camera push-in and a gentle turntable sway carrying the car.

Implementation:

- New client component `components/site/ShowroomHero.tsx` composing:
  - `components/art/ShowroomStage.tsx` — turntable, floor, light rig.
  - The existing `components/art/CarSide.tsx` for the car itself.
- Animations use only `transform` and `opacity` (GPU-friendly), driven by CSS keyframes.
- Motion timing: approximately 20s turntable sway, 8s spotlight sweep, slow push-in, continuous reflection shimmer.
- `prefers-reduced-motion: reduce` freezes the scene on a well-composed frame with no animation; all copy remains visible.
- Animations pause when the hero is out of view, via `IntersectionObserver`, to avoid wasted CPU.
- Hero copy, the `Watch Video` modal, and the stats strip are retained; the `EXPLORE MODELS` / `WATCH VIDEO` actions keep working.

## 4. Content Architecture

### 4.1 `lib/cars.ts` — single source of truth

```ts
export type Paint = {
  id: string;
  name: string;
  hex: string;
  price: number;
};

export type Wheel = {
  id: string;
  name: string;
  size: 20 | 21 | 22;
  style: "aero" | "sport" | "track";
  hex: string;
  price: number;
};

export type Interior = {
  id: string;
  name: string;
  material: string;
  trimHex: string;
  accentHex: string;
  price: number;
};

export type Pack = {
  id: string;
  name: string;
  blurb: string;
  price: number;
};

export type Car = {
  slug: string;
  name: string;        // "VOLTSPRINT GT"
  shortName: string;   // "GT"
  tagline: string;
  category: string;    // "Grand Tourer"
  basePrice: number;
  summary: string;     // cards + meta description
  specs: {
    power: string;
    range: string;
    sprint: string;
    charge: string;
    drivetrain: string;
    topSpeed: string;
    seats: number;
    weight: string;
  };
  paints: Paint[];     // 6 each, first is the default
  wheels: Wheel[];     // 3 each
  interiors: Interior[]; // 4 each
  packs: Pack[];       // 3 each
  story: { heading: string; body: string }[]; // 2-3 editorial blocks
};

export const cars: Car[];
export const carSlugs: string[];
export function getCar(slug: string): Car | undefined;
```

Content notes:

- The three cars are `voltsprint-s`, `voltsprint-gt`, `voltsprint-r`, carrying over the existing names, taglines, prices and headline specs from `components/site/Models.tsx`.
- Each car gets 6 paints, 3 wheel options, 4 interior trims and 3 packages. At least one paint per car must visually match today's default so the home page cards look unchanged.

### 4.2 Recolouring arbitrary paints

- New module `components/art/paint.ts` exporting `makePaintRamp(hex: string): CarTint`.
- It derives the five existing `CarTint` stops (`top`, `mid`, `low`, `deep`, `lowerBand`) from any base hex: a near-white highlight, the base as `mid`, then progressively darker `low`, `deep` and `lowerBand`.
- `CarSide` gains a `paint?: string` prop; when supplied it calls `makePaintRamp` and overrides `tint`.
- The existing exported `carTints` (`SILVER`, `GRAPHITE`, `MIDNIGHT`) keep their current values so existing usages are unchanged.

### 4.3 Routes and navigation

- `app/models/[slug]/page.tsx` with `generateStaticParams` returning `carSlugs`, producing three statically prerendered pages.
- `generateMetadata` per car: title, description and Open Graph tags derived from `name`, `tagline` and `summary`.
- Unknown slug calls `notFound()`.
- Home page model cards (in `components/site/Models.tsx`) become links to `/models/[slug]`. The whole card is clickable and keyboard-focusable, with a visible "View details" affordance.
- `components/site/Navbar.tsx` anchors become root-relative (`/#models`, `/#technology`, `/#charging`, `/#sustainability`, `/#company`) so they work from detail pages. The `Reserve Now` action becomes `/#reserve`.
- `Navbar` and `Footer` move out of `app/page.tsx` and into `app/layout.tsx`, so every route shares the same chrome. `app/page.tsx` then composes only the home sections. `app/layout.tsx` also mounts the fixed grid layer behind the chrome and content.
- `app/layout.tsx` keeps the existing fonts and base metadata; per-route metadata is added via `generateMetadata` on the detail route.

### 4.4 Reserve handoff

- "Reserve this build" links to `/?car=<slug>&paint=<id>&wheels=<id>&interior=<id>&packs=<id,id>`.
- `components/site/Reserve.tsx` reads those search params inside a `Suspense` boundary (required because the home page is statically rendered) and:
  - preselects the model, and
  - renders a compact "Your build" summary row above the form showing chosen paint, wheels, interior and packages with the build total.
- Unknown or missing params fall back to current defaults; a malformed build must never crash the form.

## 5. Detail Page and Configurator

### 5.1 Page composition

`app/models/[slug]/page.tsx` is a server component shell. It renders:

1. **Showroom header** — dark set piece consistent with the hero. Breadcrumb (`Home / Models / <name>`), car name at display scale, tagline, three headline stats, and the car on `ShowroomStage` in the currently selected paint. Primary CTA "Configure & reserve" (scrolls to the configurator), secondary "Book a test drive".
2. **Configurator** — the core interactive block (see 5.2).
3. **Editorial tabs** — Exterior / Interior / Colour / Performance, using the ARIA tabs pattern with arrow-key navigation.
   - Exterior: design story plus `CarSide` in the selected paint.
   - Interior: `CarInterior` plus `CarSeat`, tinted by the selected interior trim, with a materials list.
   - Colour: full paint grid where each swatch renders a small car in that paint.
   - Performance: spec table and the existing metrics presentation.
4. **Full spec table** — all `specs` fields.
5. **Other models** — links to the remaining two cars.
6. **Reserve CTA band** — links to `/#reserve` with the current build serialised.

### 5.2 Configurator

Client island: `components/configurator/Configurator.tsx`.

State: `{ paint: string; wheels: string; interior: string; packs: string[] }`, initialised from the car's default option ids.

Left/centre — live car stage with a view switch:

- **Exterior** → `CarSide` with `paint` and `wheel` props.
- **Interior** → `CarInterior` with the selected interior's `trimHex` / `accentHex`.
- **Rear** → `CarRear`.

Right — option panel:

- **Exterior colour** — 6 swatches, each with name and price, showing a selected state.
- **Wheels** — 3 options labelled with size and design.
- **Interior** — 4 trims with material name and swatch.
- **Packages** — 3 toggles.
- **Live price** — base price plus itemised options, recomputed on every change.
- **"Reserve this build"** — navigates to the reserve handoff URL.

### 5.3 New and modified art components

- `components/art/ShowroomStage.tsx` (new) — turntable, floor and light rig. Shared by the hero and the detail header with different framing.
- `components/art/CarInterior.tsx` (new) — cockpit: steering wheel, dash screen, centre console, seats, door card. Props: `trimHex`, `accentHex`.
- `components/art/CarSeat.tsx` (new) — seat and trim detail close-up. Props: `trimHex`, `accentHex`.
- `components/art/paint.ts` (new) — `makePaintRamp`.
- `components/art/CarSide.tsx` (modified) — add `paint?: string` and `wheel?: "aero" | "sport" | "track"`. The wheel variant swaps the existing rim spoke group and, for larger sizes, the tyre radius; all other geometry is unchanged.
- `components/site/ShowroomHero.tsx` (new) — hero composition and animation orchestration.

### 5.4 `lib/build.ts`

Pure, dependency-free helpers shared by the configurator and the reserve summary:

```ts
export type Build = {
  paint: string;
  wheels: string;
  interior: string;
  packs: string[];
};

export function defaultBuild(car: Car): Build;
export function computeBuildPrice(car: Car, build: Build): {
  base: number;
  lines: { label: string; amount: number }[];
  total: number;
};
export function parseBuild(car: Car, params: URLSearchParams | Record<string, string | undefined>): Build;
export function serialiseBuild(build: Build): string; // "paint=…&wheels=…&interior=…&packs=a,b"
```

`parseBuild` ignores unknown ids and always returns a valid build.

## 6. Data Flow

- Server components own the car data and page shell.
- The configurator island owns build state; only that subtree re-renders on a swatch click.
- Price is always derived from `computeBuildPrice`; no price is stored in state.
- The build is mirrored into the URL with `router.replace(..., { scroll: false })` so a configured car is shareable and survives a refresh.
- The reserve form parses the same params via `parseBuild`, keeping one serialisation format.

## 7. Accessibility

- Option groups use `role="radiogroup"` with arrow-key navigation and visible focus rings; packages are checkboxes.
- Swatches always carry a text label; colour is never the only signal.
- The live price is an `aria-live="polite"` region.
- Tabs follow the ARIA tabs pattern (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, arrow keys).
- The grid background layer is `aria-hidden`.
- Reduced motion freezes all decorative animation.

## 8. Performance

- No new dependencies.
- All pages statically prerendered; no runtime data fetching.
- Animation is transform/opacity only and paused when off-screen.
- SVG art is inlined; no image requests.

## 9. Verification

Automated:

- `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean.
- Playwright checks:
  - `/models/voltsprint-s`, `/models/voltsprint-gt`, `/models/voltsprint-r` return 200.
  - Clicking a paint swatch changes the car's rendered fill and updates the displayed price.
  - Tab list responds to arrow keys and updates `aria-selected`.
  - `/?car=voltsprint-gt&paint=…` prefills the reserve form and shows the build summary.
  - Zero console errors.
  - Zero horizontal overflow at 1440×900 and 390×844.
  - `prefers-reduced-motion` renders all content with no animation.

Manual:

- Visual pass on the hero, each detail page, and the configurator at desktop and mobile widths.

## 10. Files Touched

New:

- `lib/cars.ts`
- `lib/build.ts`
- `components/art/paint.ts`
- `components/art/ShowroomStage.tsx`
- `components/art/CarInterior.tsx`
- `components/art/CarSeat.tsx`
- `components/site/ShowroomHero.tsx`
- `components/configurator/Configurator.tsx`
- `app/models/[slug]/page.tsx`

Modified:

- `app/globals.css` — palette tokens, grid layer styles, translucent section surfaces.
- `app/layout.tsx` — mount the fixed grid layer and move `Navbar`/`Footer` here for all routes.
- `app/page.tsx` — swap `Hero` for `ShowroomHero`, remove `Navbar`/`Footer` (now in the layout).
- `components/art/CarSide.tsx` — `paint` and `wheel` props, lime default accent.
- `components/site/Navbar.tsx` — root-relative anchors.
- `components/site/Models.tsx` — cards link to detail pages, lime accent.
- `components/site/Reserve.tsx` — read build params, render build summary.

## 11. Out of Scope

- No `/models` index page.
- No cars beyond the existing three.
- No real video file or external media.
- No backend, persistence or payment; the reserve form remains a client-side simulation.
- No changes to the charging, sustainability, testimonials or footer content beyond palette and grid interaction.
