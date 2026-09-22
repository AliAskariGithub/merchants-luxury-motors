# Showroom & Car Configurator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-page VOLTSPRINT landing site into a car showroom with a cinematic hero, a site-wide faded grid, and per-car detail pages with a live configurator.

**Architecture:** Car data moves to a dependency-free `lib/cars.ts`. Pure helpers in `lib/build.ts` and `components/art/paint.ts` handle pricing and paint ramps. `/models/[slug]` is statically prerendered for three cars; the page shell is a server component and the configurator is a small client island that mirrors the build into the URL. The hero becomes a dark, code-rendered showroom scene.

**Tech Stack:** Next.js 16.3.5 (App Router), React 19.2.8, TypeScript 5, Tailwind CSS v4, hand-built inline SVG. Tests use the Node 22 built-in runner (`node --test`) with native TypeScript type stripping — no new dependencies.

## Global Constraints

- Runtime dependencies must not change. `package.json` `dependencies` and `devDependencies` stay exactly as they are.
- Tests run with Node's built-in runner and native type stripping: `node --test <file>` on `*.test.ts`. Import local modules with an explicit `.ts` extension.
- Never use a plain `import` for a type-only dependency in a module that tests import. Always use `import type`, or node will try to load the erased module at runtime.
- Pure modules (`lib/cars.ts`, `lib/build.ts`, `components/art/paint.ts`) must not import React, JSX, or any `.tsx` file. Types flow `.ts` → `.tsx`, never the reverse (except `import type`).
- Palette: brand black is `#000000`, brand lime is `#C6FF33`. Keep the `ink` gray ramp for muted text, captions, hairlines and dividers.
- Lime is never used for small body text on white; use `--color-volt-600` for that.
- The fixed grid layer must not use `transform`, `filter`, `backdrop-filter`, or `will-change` — those create a containing block for `position: fixed` descendants.
- Honour `prefers-reduced-motion: reduce` for every animation.
- Do not run `git commit` unless the user has authorized commits for this work. If commits are not authorized, skip the commit step in each task and report progress instead.
- Before writing any Next.js dynamic-route code, read the local docs under `node_modules/next/dist/docs/`. This Next.js version differs from most training data; confirm the `params` Promise API and `generateStaticParams` shape from the local docs, not from memory.

---

### Task 1: Car data module

**Files:**
- Create: `lib/cars.ts`
- Test: `tests/cars.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type Paint = { id: string; name: string; hex: string; price: number }`
  - `type WheelStyle = "aero" | "sport" | "track"`
  - `type Wheel = { id: string; name: string; size: 20 | 21 | 22; style: WheelStyle; hex: string; price: number }`
  - `type Interior = { id: string; name: string; material: string; trimHex: string; accentHex: string; price: number }`
  - `type Pack = { id: string; name: string; blurb: string; price: number }`
  - `type CarSpecs = { power: string; range: string; sprint: string; charge: string; drivetrain: string; topSpeed: string; seats: number; weight: string }`
  - `type Car = { slug: string; name: string; shortName: string; tagline: string; category: string; basePrice: number; summary: string; specs: CarSpecs; paints: Paint[]; wheels: Wheel[]; interiors: Interior[]; packs: Pack[]; story: { heading: string; body: string }[] }`
  - `const cars: Car[]`
  - `const carSlugs: string[]`
  - `function getCar(slug: string): Car | undefined`

- [ ] **Step 1: Write the failing test**

Create `tests/cars.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { cars, carSlugs, getCar } from "../lib/cars.ts";

test("exposes exactly the three showroom cars", () => {
  assert.equal(cars.length, 3);
  assert.deepEqual(carSlugs, [
    "voltsprint-s",
    "voltsprint-gt",
    "voltsprint-r",
  ]);
});

test("every car has the required option counts and a default first option", () => {
  for (const car of cars) {
    assert.equal(car.paints.length, 6, `${car.slug} paints`);
    assert.equal(car.wheels.length, 3, `${car.slug} wheels`);
    assert.equal(car.interiors.length, 4, `${car.slug} interiors`);
    assert.equal(car.packs.length, 3, `${car.slug} packs`);
    assert.ok(car.basePrice > 0, `${car.slug} base price`);
    assert.ok(car.story.length >= 2, `${car.slug} story blocks`);
    assert.ok(car.summary.length > 20, `${car.slug} summary`);
  }
});

test("option ids are unique within each car and hex colours are valid", () => {
  const hex = /^#[0-9a-fA-F]{6}$/;
  for (const car of cars) {
    const ids = [
      ...car.paints.map((p) => p.id),
      ...car.wheels.map((w) => w.id),
      ...car.interiors.map((i) => i.id),
      ...car.packs.map((p) => p.id),
    ];
    assert.equal(new Set(ids).size, ids.length, `${car.slug} duplicate ids`);
    for (const paint of car.paints) assert.match(paint.hex, hex);
    for (const wheel of car.wheels) assert.match(wheel.hex, hex);
    for (const trim of car.interiors) {
      assert.match(trim.trimHex, hex);
      assert.match(trim.accentHex, hex);
    }
  }
});

test("getCar resolves known slugs and rejects unknown ones", () => {
  assert.equal(getCar("voltsprint-gt")?.shortName, "GT");
  assert.equal(getCar("nope"), undefined);
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node --test tests/cars.test.ts`
Expected: FAIL — `Cannot find module '../lib/cars.ts'`.

- [ ] **Step 3: Implement `lib/cars.ts`**

Create `lib/cars.ts` with no imports at all:

```ts
export type Paint = {
  id: string;
  name: string;
  hex: string;
  price: number;
};

export type WheelStyle = "aero" | "sport" | "track";

export type Wheel = {
  id: string;
  name: string;
  size: 20 | 21 | 22;
  style: WheelStyle;
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

export type CarSpecs = {
  power: string;
  range: string;
  sprint: string;
  charge: string;
  drivetrain: string;
  topSpeed: string;
  seats: number;
  weight: string;
};

export type Car = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  category: string;
  basePrice: number;
  summary: string;
  specs: CarSpecs;
  paints: Paint[];
  wheels: Wheel[];
  interiors: Interior[];
  packs: Pack[];
  story: { heading: string; body: string }[];
};

export const cars: Car[] = [
  {
    slug: "voltsprint-s",
    name: "VOLTSPRINT S",
    shortName: "S",
    tagline: "Everyday performance, uncompromised.",
    category: "Performance Coupe",
    basePrice: 84900,
    summary:
      "The entry point to the range: dual-motor all-wheel drive, a 520 km range and the same 900-volt core as every VOLTSPRINT.",
    specs: {
      power: "620 hp",
      range: "520 km",
      sprint: "2.9 s",
      charge: "270 kW",
      drivetrain: "Dual motor AWD",
      topSpeed: "250 km/h",
      seats: 4,
      weight: "2,045 kg",
    },
    paints: [
      { id: "bianco-silver", name: "Bianco Silver", hex: "#E9EDF2", price: 0 },
      { id: "graphite", name: "Graphite", hex: "#7E868F", price: 900 },
      { id: "midnight", name: "Midnight", hex: "#1A1E23", price: 900 },
      { id: "acid-lime", name: "Acid Lime", hex: "#C6FF33", price: 2400 },
      { id: "solar-orange", name: "Solar Orange", hex: "#FF6A2B", price: 2400 },
      { id: "glacier-blue", name: "Glacier Blue", hex: "#7FB6E8", price: 1600 },
    ],
    wheels: [
      { id: "aero-20", name: "Aero 20\"", size: 20, style: "aero", hex: "#1B1F24", price: 0 },
      { id: "sport-21", name: "Sport 21\"", size: 21, style: "sport", hex: "#15181C", price: 2200 },
      { id: "track-22", name: "Track 22\"", size: 22, style: "track", hex: "#0E1114", price: 4800 },
    ],
    interiors: [
      { id: "onyx", name: "Onyx", material: "Recycled textile", trimHex: "#22262B", accentHex: "#C6FF33", price: 0 },
      { id: "graphite-stitch", name: "Graphite Stitch", material: "Nappa leather", trimHex: "#3A4046", accentHex: "#C6FF33", price: 1800 },
      { id: "tan-nappa", name: "Tan Nappa", material: "Nappa leather", trimHex: "#8A6A45", accentHex: "#F0DCC0", price: 2600 },
      { id: "volt-accent", name: "Volt Accent", material: "Alcantara", trimHex: "#1A1E23", accentHex: "#C6FF33", price: 3200 },
    ],
    packs: [
      { id: "performance", name: "Performance Pack", blurb: "Adaptive dampers, launch mode, uprated brakes.", price: 6500 },
      { id: "comfort", name: "Comfort Pack", blurb: "Heated and ventilated seats, four-zone climate.", price: 4200 },
      { id: "driver-assist", name: "Driver Assist Pack", blurb: "Highway pilot, surround view, remote park.", price: 3800 },
    ],
    story: [
      {
        heading: "The accessible one",
        body: "The S exists so that nothing about the VOLTSPRINT experience feels like a compromise. It carries the same structural battery pack, the same silicon-carbide inverters and the same chassis architecture as the cars above it in the range.",
      },
      {
        heading: "Tuned for every day",
        body: "Springs, dampers and steering are calibrated for long-distance ease rather than lap times. The result is a coupe that is quiet at a cruise and still decisively quick when the road opens up.",
      },
    ],
  },
  {
    slug: "voltsprint-gt",
    name: "VOLTSPRINT GT",
    shortName: "GT",
    tagline: "Grand touring with a 900-volt heart.",
    category: "Grand Tourer",
    basePrice: 112500,
    summary:
      "A tri-motor grand tourer built for distance: 610 km of range, 350 kW charging and a cabin designed around the driver.",
    specs: {
      power: "820 hp",
      range: "610 km",
      sprint: "2.6 s",
      charge: "350 kW",
      drivetrain: "Tri-motor AWD",
      topSpeed: "265 km/h",
      seats: 4,
      weight: "2,180 kg",
    },
    paints: [
      { id: "obsidian", name: "Obsidian", hex: "#16191D", price: 0 },
      { id: "liquid-silver", name: "Liquid Silver", hex: "#C4CBD4", price: 1100 },
      { id: "midnight-blue", name: "Midnight Blue", hex: "#1E2A44", price: 1400 },
      { id: "acid-lime", name: "Acid Lime", hex: "#C6FF33", price: 2600 },
      { id: "bronze", name: "Bronze", hex: "#8A6A45", price: 2600 },
      { id: "glacier-blue", name: "Glacier Blue", hex: "#7FB6E8", price: 1700 },
    ],
    wheels: [
      { id: "aero-20", name: "Aero 20\"", size: 20, style: "aero", hex: "#1B1F24", price: 0 },
      { id: "sport-21", name: "Sport 21\"", size: 21, style: "sport", hex: "#15181C", price: 2400 },
      { id: "track-22", name: "Track 22\"", size: 22, style: "track", hex: "#0E1114", price: 5200 },
    ],
    interiors: [
      { id: "onyx", name: "Onyx", material: "Nappa leather", trimHex: "#22262B", accentHex: "#C6FF33", price: 0 },
      { id: "ivory", name: "Ivory", material: "Nappa leather", trimHex: "#D8D2C6", accentHex: "#8A6A45", price: 2400 },
      { id: "tan-nappa", name: "Tan Nappa", material: "Nappa leather", trimHex: "#8A6A45", accentHex: "#F0DCC0", price: 3000 },
      { id: "volt-accent", name: "Volt Accent", material: "Alcantara", trimHex: "#1A1E23", accentHex: "#C6FF33", price: 3600 },
    ],
    packs: [
      { id: "gt-touring", name: "Grand Touring Pack", blurb: "Massaging seats, panoramic roof, 21-speaker audio.", price: 7200 },
      { id: "performance", name: "Performance Pack", blurb: "Adaptive dampers, launch mode, uprated brakes.", price: 7800 },
      { id: "driver-assist", name: "Driver Assist Pack", blurb: "Highway pilot, surround view, remote park.", price: 3900 },
    ],
    story: [
      {
        heading: "Built for the long way round",
        body: "The GT is the car for the trip you did not need to make. Its 610 km range and 350 kW charging turn a cross-continent drive into a series of short, pleasant stops.",
      },
      {
        heading: "A cabin that works at speed",
        body: "Acoustic glass, active noise cancellation and seats developed with long-distance drivers keep the cabin settled at any speed. The centre screen tilts toward the driver; the passenger is not forgotten either.",
      },
      {
        heading: "The sweet spot",
        body: "More power than the S, more range than the R. The GT is the car most buyers converge on once they have driven all three.",
      },
    ],
  },
  {
    slug: "voltsprint-r",
    name: "VOLTSPRINT R",
    shortName: "R",
    tagline: "The circuit is the proving ground.",
    category: "Track Coupe",
    basePrice: 149900,
    summary:
      "The apex of the range: quad-motor torque vectoring, 1,020 hp and a chassis developed lap after lap on the Nürburgring.",
    specs: {
      power: "1,020 hp",
      range: "540 km",
      sprint: "2.4 s",
      charge: "350 kW",
      drivetrain: "Quad-motor AWD",
      topSpeed: "290 km/h",
      seats: 2,
      weight: "2,240 kg",
    },
    paints: [
      { id: "carbon-black", name: "Carbon Black", hex: "#0E1114", price: 0 },
      { id: "circuit-silver", name: "Circuit Silver", hex: "#C4CBD4", price: 1200 },
      { id: "acid-lime", name: "Acid Lime", hex: "#C6FF33", price: 2900 },
      { id: "racing-red", name: "Racing Red", hex: "#D42A1E", price: 2900 },
      { id: "glacier-blue", name: "Glacier Blue", hex: "#7FB6E8", price: 1800 },
      { id: "midnight", name: "Midnight", hex: "#1A1E23", price: 1400 },
    ],
    wheels: [
      { id: "aero-20", name: "Aero 20\"", size: 20, style: "aero", hex: "#1B1F24", price: 0 },
      { id: "sport-21", name: "Sport 21\"", size: 21, style: "sport", hex: "#15181C", price: 2600 },
      { id: "track-22", name: "Track 22\"", size: 22, style: "track", hex: "#0E1114", price: 5600 },
    ],
    interiors: [
      { id: "onyx-alcantara", name: "Onyx Alcantara", material: "Alcantara", trimHex: "#1A1E23", accentHex: "#C6FF33", price: 0 },
      { id: "graphite-stitch", name: "Graphite Stitch", material: "Alcantara", trimHex: "#3A4046", accentHex: "#C6FF33", price: 2200 },
      { id: "tan-nappa", name: "Tan Nappa", material: "Nappa leather", trimHex: "#8A6A45", accentHex: "#F0DCC0", price: 3400 },
      { id: "volt-accent", name: "Volt Accent", material: "Alcantara", trimHex: "#101316", accentHex: "#C6FF33", price: 4000 },
    ],
    packs: [
      { id: "track", name: "Track Pack", blurb: "Carbon-ceramic brakes, aero blades, track telemetry.", price: 8900 },
      { id: "performance", name: "Performance Pack", blurb: "Adaptive dampers, launch mode, uprated brakes.", price: 8400 },
      { id: "driver-assist", name: "Driver Assist Pack", blurb: "Highway pilot, surround view, remote park.", price: 4200 },
    ],
    story: [
      {
        heading: "One motor per wheel",
        body: "Four motors, each driving a single wheel, let the R decide thousands of times a second how much torque belongs where. On track it rotates the car into the apex; on a wet road it simply keeps you pointing straight.",
      },
      {
        heading: "Aero you can feel",
        body: "An active rear diffuser and front aero blades hold the car down without the drag penalty of a fixed wing. The drag coefficient lands at 0.21 even in track configuration.",
      },
    ],
  },
];

export const carSlugs: string[] = cars.map((car) => car.slug);

export function getCar(slug: string): Car | undefined {
  return cars.find((car) => car.slug === slug);
}
```

- [ ] **Step 4: Enable `allowImportingTsExtensions` so `tsc` accepts the `.ts` test imports**

Modify `tsconfig.json` — add `"allowImportingTsExtensions": true` to `compilerOptions` (it is legal because `noEmit` is already `true`):

```json
    "allowImportingTsExtensions": true,
    "moduleResolution": "bundler",
```

- [ ] **Step 5: Add a test script to `package.json`**

Add to `"scripts"`:

```json
    "test": "node --test",
```

- [ ] **Step 6: Run the tests, typecheck and lint**

Run: `npm test`
Expected: all four tests PASS.

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add lib/cars.ts tests/cars.test.ts tsconfig.json package.json
git commit -m "feat: add showroom car data model"
```

---

### Task 2: Build pricing and URL helpers

**Files:**
- Create: `lib/build.ts`
- Test: `tests/build.test.ts`

**Interfaces:**
- Consumes: `type Car` from `./cars.ts` (type-only import).
- Produces:
  - `type Build = { paint: string; wheels: string; interior: string; packs: string[] }`
  - `function defaultBuild(car: Car): Build`
  - `function computeBuildPrice(car: Car, build: Build): { base: number; lines: { label: string; amount: number }[]; total: number }`
  - `function parseBuild(car: Car, input: URLSearchParams | Record<string, string | string[] | undefined>): Build`
  - `function serialiseBuild(build: Build): string`

- [ ] **Step 1: Write the failing test**

Create `tests/build.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { getCar } from "../lib/cars.ts";
import {
  defaultBuild,
  computeBuildPrice,
  parseBuild,
  serialiseBuild,
} from "../lib/build.ts";

const car = getCar("voltsprint-gt")!;

test("defaultBuild picks the first option of every group and no packs", () => {
  const build = defaultBuild(car);
  assert.equal(build.paint, car.paints[0].id);
  assert.equal(build.wheels, car.wheels[0].id);
  assert.equal(build.interior, car.interiors[0].id);
  assert.deepEqual(build.packs, []);
});

test("computeBuildPrice returns base price alone for the default build", () => {
  const priced = computeBuildPrice(car, defaultBuild(car));
  assert.equal(priced.base, car.basePrice);
  assert.equal(priced.total, car.basePrice);
  assert.deepEqual(priced.lines, []);
});

test("computeBuildPrice itemises and sums non-default options", () => {
  const build = {
    paint: car.paints[3].id,
    wheels: car.wheels[2].id,
    interior: car.interiors[1].id,
    packs: [car.packs[0].id, car.packs[2].id],
  };
  const priced = computeBuildPrice(car, build);
  const expectedExtras =
    car.paints[3].price + car.wheels[2].price + car.interiors[1].price +
    car.packs[0].price + car.packs[2].price;
  assert.equal(priced.total, car.basePrice + expectedExtras);
  assert.equal(priced.lines.length, 5);
  assert.equal(
    priced.lines.reduce((sum, line) => sum + line.amount, 0),
    expectedExtras,
  );
});

test("serialiseBuild round-trips through parseBuild", () => {
  const build = {
    paint: car.paints[2].id,
    wheels: car.wheels[1].id,
    interior: car.interiors[3].id,
    packs: [car.packs[1].id],
  };
  const parsed = parseBuild(car, new URLSearchParams(serialiseBuild(build)));
  assert.deepEqual(parsed, build);
});

test("parseBuild ignores unknown ids and missing params", () => {
  const parsed = parseBuild(car, {
    paint: "does-not-exist",
    wheels: undefined,
    interior: "nope",
    packs: "nope,also-nope",
  });
  assert.equal(parsed.paint, car.paints[0].id);
  assert.equal(parsed.wheels, car.wheels[0].id);
  assert.equal(parsed.interior, car.interiors[0].id);
  assert.deepEqual(parsed.packs, []);
});

test("parseBuild de-duplicates packs", () => {
  const parsed = parseBuild(car, {
    packs: `${car.packs[0].id},${car.packs[0].id}`,
  });
  assert.deepEqual(parsed.packs, [car.packs[0].id]);
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node --test tests/build.test.ts`
Expected: FAIL — `Cannot find module '../lib/build.ts'`.

- [ ] **Step 3: Implement `lib/build.ts`**

```ts
import type { Car } from "./cars.ts";

export type Build = {
  paint: string;
  wheels: string;
  interior: string;
  packs: string[];
};

export type BuildLine = {
  label: string;
  amount: number;
};

export type BuildPrice = {
  base: number;
  lines: BuildLine[];
  total: number;
};

export function defaultBuild(car: Car): Build {
  return {
    paint: car.paints[0].id,
    wheels: car.wheels[0].id,
    interior: car.interiors[0].id,
    packs: [],
  };
}

export function computeBuildPrice(car: Car, build: Build): BuildPrice {
  const lines: BuildLine[] = [];

  const paint = car.paints.find((option) => option.id === build.paint);
  if (paint && paint.price > 0) {
    lines.push({ label: `Paint — ${paint.name}`, amount: paint.price });
  }

  const wheels = car.wheels.find((option) => option.id === build.wheels);
  if (wheels && wheels.price > 0) {
    lines.push({ label: `Wheels — ${wheels.name}`, amount: wheels.price });
  }

  const interior = car.interiors.find((option) => option.id === build.interior);
  if (interior && interior.price > 0) {
    lines.push({ label: `Interior — ${interior.name}`, amount: interior.price });
  }

  for (const packId of build.packs) {
    const pack = car.packs.find((option) => option.id === packId);
    if (pack) {
      lines.push({ label: pack.name, amount: pack.price });
    }
  }

  const extras = lines.reduce((sum, line) => sum + line.amount, 0);

  return { base: car.basePrice, lines, total: car.basePrice + extras };
}

function readParam(
  input: URLSearchParams | Record<string, string | string[] | undefined>,
  key: string,
): string | undefined {
  if (typeof (input as URLSearchParams).get === "function") {
    return (input as URLSearchParams).get(key) ?? undefined;
  }
  const value = (input as Record<string, string | string[] | undefined>)[key];
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parseBuild(
  car: Car,
  input: URLSearchParams | Record<string, string | string[] | undefined>,
): Build {
  const fallback = defaultBuild(car);

  const paintId = readParam(input, "paint");
  const wheelsId = readParam(input, "wheels");
  const interiorId = readParam(input, "interior");
  const packsRaw = readParam(input, "packs");

  const paint = car.paints.find((option) => option.id === paintId);
  const wheels = car.wheels.find((option) => option.id === wheelsId);
  const interior = car.interiors.find((option) => option.id === interiorId);

  const packs = Array.from(
    new Set(
      (packsRaw ?? "")
        .split(",")
        .map((id) => id.trim())
        .filter((id) => car.packs.some((option) => option.id === id)),
    ),
  );

  return {
    paint: paint ? paint.id : fallback.paint,
    wheels: wheels ? wheels.id : fallback.wheels,
    interior: interior ? interior.id : fallback.interior,
    packs,
  };
}

export function serialiseBuild(build: Build): string {
  const params = new URLSearchParams();
  params.set("paint", build.paint);
  params.set("wheels", build.wheels);
  params.set("interior", build.interior);
  if (build.packs.length > 0) {
    params.set("packs", [...build.packs].sort().join(","));
  }
  return params.toString();
}
```

- [ ] **Step 4: Run the tests, typecheck and lint**

Run: `npm test`
Expected: all Task 1 and Task 2 tests PASS.

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add lib/build.ts tests/build.test.ts
git commit -m "feat: add build pricing and url helpers"
```

---

### Task 3: Paint ramps and parametric car

**Files:**
- Create: `components/art/paint.ts`
- Test: `tests/paint.test.ts`
- Modify: `components/art/CarSide.tsx` (imports and props)
- Modify: `components/art/CarRear.tsx` (add `paint` prop)

**Interfaces:**
- Consumes: nothing (must stay free of React and `.tsx` imports).
- Produces:
  - `type CarTint = { top: string; mid: string; low: string; deep: string; lowerBand: string }`
  - `const carTints: { SILVER: CarTint; GRAPHITE: CarTint; MIDNIGHT: CarTint }`
  - `function makePaintRamp(hex: string): CarTint`
- `CarSide` keeps exporting `carTints` (re-exported) and gains `paint?: string` and `wheel?: WheelStyle`.
- `CarRear` gains `paint?: string` using the same `makePaintRamp` approach.

- [ ] **Step 1: Write the failing test**

Create `tests/paint.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { carTints, makePaintRamp } from "../components/art/paint.ts";

const hex = /^#[0-9a-fA-F]{6}$/;

function luminance(color: string): number {
  const channels = [1, 3, 5].map((i) => {
    const value = parseInt(color.slice(i, i + 2), 16) / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

test("existing tints are unchanged", () => {
  assert.equal(carTints.SILVER.top, "#FFFFFF");
  assert.equal(carTints.GRAPHITE.mid, "#7E868F");
  assert.equal(carTints.MIDNIGHT.lowerBand, "#12161A");
});

test("makePaintRamp returns five valid hex stops in descending luminance", () => {
  const ramp = makePaintRamp("#C6FF33");
  for (const stop of Object.values(ramp)) assert.match(stop, hex);
  const order = [
    luminance(ramp.top),
    luminance(ramp.mid),
    luminance(ramp.low),
    luminance(ramp.deep),
    luminance(ramp.lowerBand),
  ];
  for (let i = 1; i < order.length; i += 1) {
    assert.ok(order[i] <= order[i - 1], `stop ${i} is lighter than stop ${i - 1}`);
  }
});

test("makePaintRamp accepts shorthand hex and is deterministic", () => {
  assert.deepEqual(makePaintRamp("#fff"), makePaintRamp("#ffffff"));
  assert.deepEqual(makePaintRamp("#123456"), makePaintRamp("#123456"));
});

test("makePaintRamp keeps the base as the mid stop", () => {
  assert.equal(makePaintRamp("#3366cc").mid, "#3366cc");
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node --test tests/paint.test.ts`
Expected: FAIL — `Cannot find module '../components/art/paint.ts'`.

- [ ] **Step 3: Implement `components/art/paint.ts`**

```ts
export type CarTint = {
  top: string;
  mid: string;
  low: string;
  deep: string;
  lowerBand: string;
};

export const carTints = {
  SILVER: {
    top: "#FFFFFF",
    mid: "#A7B0BB",
    low: "#7C848E",
    deep: "#434A51",
    lowerBand: "#242A31",
  },
  GRAPHITE: {
    top: "#F4F6F8",
    mid: "#7E868F",
    low: "#585F67",
    deep: "#2B3036",
    lowerBand: "#1B1F24",
  },
  MIDNIGHT: {
    top: "#DCE3EB",
    mid: "#5A626C",
    low: "#3B4149",
    deep: "#1A1E23",
    lowerBand: "#12161A",
  },
} satisfies Record<string, CarTint>;

function expand(hex: string): string {
  const value = hex.trim();
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    const [r, g, b] = value.slice(1).split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return value.toLowerCase();
}

function toChannels(hex: string): [number, number, number] {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [
    number,
    number,
    number,
  ];
}

function toHex(channels: [number, number, number]): string {
  return (
    "#" +
    channels
      .map((value) => {
        const clamped = Math.max(0, Math.min(255, Math.round(value)));
        return clamped.toString(16).padStart(2, "0");
      })
      .join("")
  );
}

function mix(hex: string, target: number, amount: number): string {
  const channels = toChannels(hex);
  return toHex(
    channels.map((value) => value + (target - value) * amount) as [
      number,
      number,
      number,
    ],
  );
}

export function makePaintRamp(input: string): CarTint {
  const base = expand(input);
  return {
    top: mix(base, 255, 0.86),
    mid: base,
    low: mix(base, 0, 0.28),
    deep: mix(base, 0, 0.56),
    lowerBand: mix(base, 0, 0.74),
  };
}
```

- [ ] **Step 4: Run the tests**

Run: `node --test tests/paint.test.ts`
Expected: PASS.

- [ ] **Step 5: Point `CarSide` at the new module and add `paint` / `wheel` props**

Modify `components/art/CarSide.tsx`:

1. Replace the local `CarTint` type and the `SILVER`/`GRAPHITE`/`MIDNIGHT`/`carTints` declarations (the current lines 1–35) with imports and a re-export:

```tsx
import type { CSSProperties } from "react";
import { carTints, makePaintRamp, type CarTint } from "./paint";
import type { WheelStyle } from "@/lib/cars";

export { carTints };
export type { CarTint };
```

2. Add the two props to `CarSideProps`:

```tsx
  paint?: string;
  wheel?: WheelStyle;
```

3. Add them to the destructured parameters with defaults and derive the tint:

```tsx
  tint = carTints.SILVER,
  paint,
  wheel = "sport",
```

then immediately inside the component body:

```tsx
  const resolvedTint = paint ? makePaintRamp(paint) : tint;
```

and replace every subsequent use of `tint` inside the component with `resolvedTint`.

4. Change the default `accent` from `"#C6F135"` to `"#C6FF33"`.

5. Vary the rim by wheel style. Find the two wheel groups (the front group centred at `cx="320" cy="326"` and the rear at `cx="838" cy="326"`). The `d` attributes of the six spoke paths in each group currently differ only by the group's centre. Replace the spoke `<g>` contents with a conditional that renders a different spoke count per style, keeping the existing six-spoke geometry for `"sport"`:

```tsx
{wheel === "aero" ? (
  <g fill="#A7AFB9" opacity="0.7">
    <circle cx="320" cy="326" r="30" fill="#191D22" />
    <circle cx="320" cy="326" r="12" fill="#CBD2DA" />
  </g>
) : wheel === "track" ? (
  <g fill="#A7AFB9">
    <path d="M320 288 l6 27 -12 0 z" />
    <path d="M320 364 l6 -27 -12 0 z" />
    <path d="M282 326 l27 6 0 -12 z" />
    <path d="M358 326 l-27 6 0 -12 z" />
    <path d="M293 299 l20 20 -9 9 z" />
    <path d="M347 353 l-20 -20 9 -9 z" />
    <path d="M293 353 l20 -20 -9 -9 z" />
    <path d="M347 299 l-20 20 9 9 z" />
  </g>
) : (
  <g fill="#A7AFB9">
    <path d="M320 288 l6 27 -12 0 z" />
    <path d="M320 364 l6 -27 -12 0 z" />
    <path d="M282 326 l27 6 0 -12 z" />
    <path d="M358 326 l-27 6 0 -12 z" />
    <path d="M293 299 l20 20 -9 9 z" />
    <path d="M347 353 l-20 -20 9 -9 z" />
  </g>
)}
```

Mirror the same three-way conditional for the rear group using its centre `838,326` and the existing rear spoke coordinates, and add a seventh/eighth spoke pair for `"track"`.

- [ ] **Step 6: Add the `paint` prop to `CarRear`**

In `components/art/CarRear.tsx`, add `paint?: string` to its props, import `{ makePaintRamp }` from `"./paint"`, and derive the body tint the same way: `const resolvedTint = paint ? makePaintRamp(paint) : tint;` then replace uses of `tint` with `resolvedTint`. Keep its existing default tint and accent behaviour otherwise.

- [ ] **Step 7: Verify the home page still renders unchanged**

Run: `npx tsc --noEmit`
Expected: no errors. If `Models.tsx` fails to resolve `carTints` from `CarSide`, update its import to `import { carTints } from "../art/paint";`.

Run: `npm run build`
Expected: build succeeds.

Run: `npm test`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add components/art/paint.ts components/art/CarSide.tsx components/art/CarRear.tsx tests/paint.test.ts
git commit -m "feat: add parametric paint ramps and wheel styles"
```

---

### Task 4: Palette and faded grid layer

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `.grid-backdrop` utility class; `--color-ink-900` and `--color-ink-950` are `#000000`; `--color-volt-500` is `#C6FF33`.

- [ ] **Step 1: Update the palette tokens**

In `app/globals.css` `@theme`, change the black and lime anchors:

```css
  --color-ink-950: #000000;
  --color-ink-900: #000000;
```

Leave `ink-850` through `ink-50` untouched so dark hovers and the gray ramp keep their hierarchy.

Replace the volt ramp:

```css
  --color-volt-200: #f2ffcc;
  --color-volt-300: #e2ff99;
  --color-volt-400: #d4ff5c;
  --color-volt-500: #c6ff33;
  --color-volt-600: #6f8f00;
  --color-volt-700: #557000;
```

- [ ] **Step 2: Add the grid backdrop class**

In `app/globals.css` inside `@layer components`, after `.shell`:

```css
  .grid-backdrop {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      linear-gradient(to right, rgba(0, 0, 0, 0.055) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.055) 1px, transparent 1px);
    background-size: 48px 48px;
    -webkit-mask-image: radial-gradient(
      125% 125% at 50% 40%,
      #000 0%,
      #000 32%,
      rgba(0, 0, 0, 0) 78%
    );
    mask-image: radial-gradient(
      125% 125% at 50% 40%,
      #000 0%,
      #000 32%,
      rgba(0, 0, 0, 0) 78%
    );
  }
```

Confirm the class contains no `transform`, `filter`, `backdrop-filter`, or `will-change`.

- [ ] **Step 3: Mount the layer and lift content above it**

Modify `app/layout.tsx`. Inside `<body>`, before the children wrapper, add the layer, and give the wrapper a stacking position:

```tsx
<body className="flex min-h-full flex-col bg-white">
  <div className="grid-backdrop" aria-hidden="true" />
  <div className="relative z-10 flex min-h-full flex-col">
    {children}
  </div>
</body>
```

- [ ] **Step 4: Make light section surfaces translucent so the grid shows through**

In each of these files, change the section's opaque light surface to a translucent one. Leave the black panels (`bg-ink-950`), the footer and the hero showroom fully opaque.

- `components/site/Models.tsx`: `bg-white` → `bg-white/85`
- `components/site/Performance.tsx`: outer section `bg-white` → `bg-white/85`; keep the inner `bg-ink-950` panel opaque
- `components/site/Charging.tsx`: `bg-ink-50` → `bg-ink-50/80`
- `components/site/Sustainability.tsx`: `bg-white` → `bg-white/85`
- `components/site/Testimonials.tsx`: `bg-ink-50` → `bg-ink-50/80`
- `components/site/Reserve.tsx`: `bg-white` → `bg-white/85`

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds.

Start the server and capture a full-page screenshot with a scroll-through pass, then check by eye that the grid is visible mid-page, fades at the corners, and disappears under the black panels:

```bash
cd /workspace && (npm start -- --port 3000 &) && sleep 4
node -e "
const { chromium } = require('/usr/local/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await p.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 240));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 400));
  });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const hidden = await p.\$\$eval('.reveal', els => els.filter(e => getComputedStyle(e).opacity !== '1').length);
  const mask = await p.\$eval('.grid-backdrop', el => getComputedStyle(el).maskImage.slice(0, 40));
  console.log({ overflow, hidden, mask });
  await p.screenshot({ path: '/tmp/opencode/shots/grid-check.png', fullPage: true });
  await b.close();
})();
"
```

Expected: `overflow: 0`, `hidden: 0`, and `mask` starts with `radial-gradient`.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/layout.tsx components/site
git commit -m "feat: apply black and lime palette with faded grid backdrop"
```

---

### Task 5: Shared chrome and model card links

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `components/site/Navbar.tsx`
- Modify: `components/site/Models.tsx`

**Interfaces:**
- Consumes: `cars` from `@/lib/cars`; `carTints` from `@/components/art/paint`.
- Produces: every route shares `Navbar` and `Footer`; model cards link to `/models/<slug>`.

- [ ] **Step 1: Move `Navbar` and `Footer` into the layout**

In `app/layout.tsx`, import both and render them around the children:

```tsx
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
```

```tsx
<div className="relative z-10 flex min-h-full flex-col">
  <Navbar />
  {children}
  <Footer />
</div>
```

Remove `Navbar` and `Footer` from `app/page.tsx` along with their imports.

- [ ] **Step 2: Make nav anchors work from any route**

In `components/site/Navbar.tsx`, change the `links` array hrefs to root-relative and update the two reserve hrefs:

```tsx
const links = [
  { label: "Models", href: "/#models" },
  { label: "Technology", href: "/#technology" },
  { label: "Charging", href: "/#charging" },
  { label: "Sustainability", href: "/#sustainability" },
  { label: "Company", href: "/#company" },
];
```

`href="#reserve"` → `href="/#reserve"` in both the desktop `ButtonLink` and the drawer `ButtonLink`. The logo link `href="#top"` becomes `href="/#top"`.

- [ ] **Step 3: Drive the model cards from `lib/cars.ts` and link them**

Replace the inline `models` array in `components/site/Models.tsx` with a derivation from `cars`. Keep the three visual treatments keyed by slug:

```tsx
import Link from "next/link";
import { cars } from "@/lib/cars";
import { carTints } from "../art/paint";

const treatment: Record<string, {
  tint: keyof typeof carTints;
  badge: string | null;
  surface: string;
  text: string;
  muted: string;
  hairline: string;
  stage: string;
}> = {
  "voltsprint-s": {
    tint: "SILVER", badge: null, surface: "bg-white", text: "text-ink-900",
    muted: "text-ink-500", hairline: "border-ink-100",
    stage: "from-sky-100 via-white to-ink-50",
  },
  "voltsprint-gt": {
    tint: "MIDNIGHT", badge: "Most popular", surface: "bg-ink-950",
    text: "text-white", muted: "text-ink-300", hairline: "border-white/12",
    stage: "from-ink-900 via-ink-850 to-ink-950",
  },
  "voltsprint-r": {
    tint: "GRAPHITE", badge: "Track package", surface: "bg-white",
    text: "text-ink-900", muted: "text-ink-500", hairline: "border-ink-100",
    stage: "from-ink-100 via-white to-sky-100",
  },
};
```

Then map over `cars`, look up `treatment[car.slug]`, and render the card as a `Link`:

```tsx
{cars.map((car, index) => {
  const look = treatment[car.slug];
  return (
    <Reveal key={car.slug} delay={index * 90}>
      <Link
        href={`/models/${car.slug}`}
        className={`group flex h-full flex-col rounded-3xl border ${look.hairline} ${look.surface} p-7 transition-shadow duration-300 hover:shadow-lift`}
      >
        {/* existing card internals, swapping the hard-coded values for car.* */}
        <span className="mt-6 inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-volt-600">
          View details
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </Reveal>
  );
})}
```

Card values now come from the model: `car.name`, `car.tagline`, `car.specs.power`, `car.specs.range`, `car.specs.sprint`, `car.specs.charge`, `car.specs.drivetrain`, and a price formatted with `new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(car.basePrice)`.

`<CarSide>` receives `tint={carTints[look.tint]}` and `accent` removed so it uses the lime default.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`
Expected: all clean.

Start the server, then confirm each card links correctly:

```bash
node -e "
const { chromium } = require('/usr/local/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const hrefs = await p.\$\$eval('#models a[href^=\"/models/\"]', els => els.map(e => e.getAttribute('href')));
  console.log(hrefs);
  await b.close();
})();
"
```

Expected: three distinct `/models/voltsprint-*` hrefs.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/page.tsx components/site/Navbar.tsx components/site/Models.tsx
git commit -m "feat: share chrome across routes and link model cards"
```

---

### Task 6: Showroom stage art

**Files:**
- Create: `components/art/ShowroomStage.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type ShowroomStageProps = { uid: string; className?: string; intensity?: "hero" | "detail"; children?: ReactNode }`
  - `default function ShowroomStage(props): JSX.Element` — renders the dark set piece and places `children` on the turntable.

- [ ] **Step 1: Implement the stage**

Create `components/art/ShowroomStage.tsx`. The viewBox is `0 0 1440 760`. Layers paint in this order:

1. Background wall: `<rect>` fill `#000000`.
2. Vertical light panels: three tall translucent lime-tinted rectangles at x = 180, 700, 1220, width 90, from y = 60 to y = 520, fill `#C6FF33` at opacity 0.07, blurred with a `feGaussianBlur` filter.
3. Horizon glow: radial gradient ellipse centred at (720, 470), rx 620, ry 150, white at opacity 0.06.
4. Floor: `<rect>` from y = 470 to y = 760 filled with a vertical linear gradient `#0a0c0e` → `#000000`.
5. Turntable disc: ellipse centred at (720, 610), rx 470, ry 96, fill `#111417`, plus a lime rim stroke at opacity 0.25.
6. Floor grid lines: four horizontal lines across the floor at y = 520, 570, 640, 720, stroke `#ffffff` at opacity 0.05, plus a gentle reflection fade using a mask identical in shape to the approach in `components/art/HeroScene.tsx`.
7. Spotlight cones: two long triangular paths from the top corners converging toward the disc, fill white at opacity 0.05, blurred.
8. Foreground vignette: radial gradient ellipse centred at (720, 560), rx 820, ry 420, transparent centre to black edges at opacity 0.55.
9. `{children}` rendered last, inside a `<g>` positioned so the caller can place the car on the disc.

Use `uid` to namespace every `id` in `defs`, exactly as `CarSide.tsx` does with its `id()` helper, so multiple stages can coexist on a page.

- [ ] **Step 2: Verify it renders**

Add a temporary route-free check by importing it into `components/site/ShowroomHero.tsx` in the next task; for now confirm typecheck:

Run: `npx tsc --noEmit`
Expected: no errors (the file is unused but must typecheck).

- [ ] **Step 3: Commit**

```bash
git add components/art/ShowroomStage.tsx
git commit -m "feat: add showroom stage art"
```

---

### Task 7: Cinematic showroom hero

**Files:**
- Create: `components/site/ShowroomHero.tsx`
- Modify: `app/globals.css` (keyframes)
- Modify: `app/page.tsx` (swap `Hero` for `ShowroomHero`)

**Interfaces:**
- Consumes: `ShowroomStage`, `CarSide`, `Reveal`, `ButtonLink`, `WatchVideoButton`, `Bolt`, `ArrowRight`.
- Produces: `default function ShowroomHero()`.

- [ ] **Step 1: Add the keyframes**

Add to `app/globals.css` after the existing `@keyframes`:

```css
@keyframes turntable-sway {
  0%, 100% { transform: translateX(-14px); }
  50% { transform: translateX(14px); }
}

@keyframes spot-sweep {
  0%, 100% { transform: translateX(-60px); opacity: 0.35; }
  50% { transform: translateX(60px); opacity: 0.75; }
}

@keyframes stage-push {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.035); }
}

@keyframes reflection-shimmer {
  0%, 100% { opacity: 0.16; }
  50% { opacity: 0.3; }
}
```

Add the matching theme animation tokens inside `@theme`:

```css
  --animate-turntable: turntable-sway 20s ease-in-out infinite;
  --animate-spot: spot-sweep 8s ease-in-out infinite;
  --animate-stage: stage-push 26s ease-in-out infinite;
  --animate-shimmer: reflection-shimmer 6s ease-in-out infinite;
```

- [ ] **Step 2: Build the hero**

Create `components/site/ShowroomHero.tsx` as a client component. Requirements:

- Section wrapper `id="top"`, `relative isolate overflow-hidden bg-black text-white`.
- A `<div>` with `class="animate-stage"` wrapping a `<ShowroomStage uid="hero-stage" intensity="hero">`.
- Inside the stage, place `<CarSide uid="hero-car" paint="#C6FF33" wheel="track" className="..." />` on the turntable, itself wrapped in a `<div className="animate-turntable">`.
- Copy block, centered above the stage with `z-10`:
  - Eyebrow pill: `2026 Performance Lineup` with the `Bolt` icon, `border-white/15 bg-white/5 text-white/70`.
  - `<h1>` — `Pure Power.` / `Zero Limits.` / `All Electric.` with the lime underline on the last line, `text-[clamp(2.6rem,7.4vw,5.4rem)]`, `text-white`.
  - Paragraph from the current hero, `text-white/60`.
  - `EXPLORE MODELS` (`ButtonLink href="/#models" variant="primary" size="lg"`) and the existing `<WatchVideoButton className="w-full sm:w-auto" />`, wrapped in `Reveal delay={240}`.
- A stats strip below the stage reusing the existing `specs` array from `components/site/Hero.tsx`, on a translucent white surface: `rounded-3xl border border-white/10 bg-white/5 backdrop-blur`.
- Pause animations off-screen: an `IntersectionObserver` on the section sets a `data-paused` attribute, and a CSS rule `[data-paused="true"] * { animation-play-state: paused; }` is added to `globals.css`. Remember the ESLint rule `react-hooks/set-state-in-effect` — do not call `setState` synchronously in the effect body; wrap it in `queueMicrotask` as `components/ui/Reveal.tsx` already does.
- Keep the `Reveal` entrance animations for the copy.

Add the pause rule to `app/globals.css`:

```css
  [data-paused="true"] * {
    animation-play-state: paused;
  }
```

Skeleton to start from:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import ShowroomStage from "../art/ShowroomStage";
import CarSide from "../art/CarSide";
import Reveal from "../ui/Reveal";
import { ButtonLink } from "../ui/Button";
import { ArrowRight, Bolt } from "../ui/Icons";
import WatchVideoButton from "./WatchVideoButton";

const specs = [
  { value: "1,020", unit: "hp", label: "Peak output" },
  { value: "610", unit: "km", label: "WLTP range" },
  { value: "350", unit: "kW", label: "DC charging" },
  { value: "2.4", unit: "s", label: "0–100 km/h" },
];

export default function ShowroomHero() {
  const ref = useRef<HTMLElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const next = !entry.isIntersecting;
          queueMicrotask(() => setPaused(next));
        }
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      data-paused={paused}
      className="relative isolate overflow-hidden bg-black text-white"
    >
      <div className="animate-stage">
        <ShowroomStage uid="hero-stage" className="absolute inset-0 h-full w-full">
          <g className="animate-turntable">
            <CarSide uid="hero-car" paint="#C6FF33" wheel="track" x={220} y={120} width={1000} height={383} />
          </g>
        </ShowroomStage>
      </div>

      <div className="shell relative z-10 pt-16 text-center sm:pt-20 lg:pt-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-display text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white/70 backdrop-blur">
            <Bolt className="h-3.5 w-3.5 text-volt-500" />
            2026 Performance Lineup
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mx-auto mt-7 max-w-5xl font-display text-[clamp(2.6rem,7.4vw,5.4rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-white">
            Pure Power.
            <br />
            Zero Limits.
            <br />
            <span className="relative inline-block">
              All Electric.
              <span className="absolute -bottom-1 left-1/2 h-1.5 w-[68%] -translate-x-1/2 rounded-full bg-volt-500 sm:-bottom-2" />
            </span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Engineered from a clean sheet, the VOLTSPRINT coupe pairs a 900-volt
            architecture with active aerodynamics and a track-bred chassis. Zero
            emissions. Zero compromise.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/#models" variant="primary" size="lg" className="w-full sm:w-auto">
              Explore Models
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <WatchVideoButton className="w-full sm:w-auto" />
          </div>
        </Reveal>
      </div>

      <div className="shell relative z-10 mt-16 pb-16">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-center backdrop-blur sm:grid-cols-4">
          {specs.map((spec) => (
            <div key={spec.label} className="px-5 py-7 sm:px-6 sm:py-8">
              <dd className="font-display text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
                {spec.value}
                <span className="ml-1 text-base font-bold text-volt-500">{spec.unit}</span>
              </dd>
              <dt className="mt-2 font-display text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-white/50">
                {spec.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

The stage must sit behind the copy. Give the stage wrapper `absolute inset-0` and the copy blocks `relative z-10`, and set a sensible `min-h` on the section so the stage has room. Adjust `y` on `CarSide` so the car lands on the turntable disc rather than floating.

- [ ] **Step 3: Wire it into the page**

In `app/page.tsx`, replace the `Hero` import with `ShowroomHero` and render it where `Hero` was. Leave `components/site/Hero.tsx` in the repository untouched for now.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` and `npm run build`.
Expected: clean.

Capture the hero at 1440×1000 and 390×844 and confirm by eye: the car is on the turntable, the spotlight sweep reads, copy is legible, nothing is clipped.

Then confirm reduced motion:

```bash
node -e "
const { chromium } = require('/usr/local/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await p.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  const opacity = await p.\$eval('.reveal', el => getComputedStyle(el).opacity);
  console.log('reduced-motion reveal opacity:', opacity);
  await b.close();
})();
"
```

Expected: `1`.

- [ ] **Step 5: Commit**

```bash
git add components/site/ShowroomHero.tsx app/globals.css app/page.tsx
git commit -m "feat: add cinematic showroom hero"
```

---

### Task 8: Interior art

**Files:**
- Create: `components/art/CarInterior.tsx`
- Create: `components/art/CarSeat.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type InteriorArtProps = { uid: string; trimHex: string; accentHex: string; className?: string; label?: string }`
  - `default function CarInterior(props): JSX.Element` — viewBox `0 0 1200 620`.
  - `default function CarSeat(props): JSX.Element` — viewBox `0 0 700 700`.

- [ ] **Step 1: Implement `CarInterior.tsx`**

Cockpit seen from the driver's seat, viewBox `0 0 1200 620`, layers in order:

1. Windshield band: `<path d="M0 40 L1200 40 L1200 210 L0 250 Z">` filled with a vertical gradient `#0a0c0e` → `#1b222c`, plus a soft white glow ellipse at the top centre.
2. A-pillars: two dark wedges at the left and right edges, fill `#0E1114`.
3. Dashboard main form: `<path d="M0 250 L1200 210 L1200 400 L0 430 Z">` filled with `trimHex` darkened by overlaying a black rect at opacity 0.25.
4. Instrument cluster: rounded rect at (230, 268, 240, 96), fill `#05070A`, with two circular gauges and a lime arc (`accentHex`) indicating charge.
5. Centre display: rounded rect at (560, 250, 320, 180), fill `#05070A`, with a lime accent bar and three short content lines in `#8A929C`.
6. Centre console: `<path d="M520 430 L700 430 L760 620 L470 620 Z">` fill `#0E1114`, with a lime trim line along its right edge.
7. Steering wheel: outer circle at (330, 400) r = 118, stroke `#15181C` width 26; an inner hub circle r = 40 fill `#15181C`; three spokes as thick strokes; a lime marker at 12 o'clock.
8. Driver and passenger seats: two rounded forms at the lower left and lower right, fill `trimHex`, each with a headrest ellipse, shoulder bolsters and dashed `accentHex` stitching along the seams.
9. Door card, left edge: a vertical panel x 0–80, y 250–620, fill `#14181C`, a speaker circle, and a horizontal `trimHex` band.
10. Stitching accents: `<path>` strokes with `stroke={accentHex}` `strokeDasharray="6 6"` along the dash top edge and both seat seams.
11. Vignette: radial gradient overlay, black at the edges, opacity 0.4.

Use the `id()` namespacing pattern from `CarSide.tsx`. Set `role="img"` with `label` (default `"VOLTSPRINT cabin, driver's view"`) unless a `decorative` flag is added later.

- [ ] **Step 2: Implement `CarSeat.tsx`**

A single sport seat in three-quarter view, viewBox `0 0 700 700`:

1. Backdrop: rounded rect, fill `#0E1114`.
2. Seat back: `<path>` from (200, 120) to (500, 120) tapering to (240, 420) and (520, 420), fill `trimHex`.
3. Headrest: rounded rect (300, 70, 120, 80), fill `trimHex` darkened 20%.
4. Shoulder bolsters: two paths flanking the seat back, fill `trimHex` lightened 12%.
5. Base cushion: rounded path (180, 420) to (540, 640), fill `trimHex`.
6. Side bolsters: two paths along the cushion edges, darker by 15%.
7. Stitching: dashed `accentHex` strokes along the centre seam, both bolsters and the cushion edge.
8. Logo embossing: a small lime `accentHex` lightning bolt centred on the headrest.
9. Floor shadow: blurred ellipse under the base.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` and `npm run build`.
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add components/art/CarInterior.tsx components/art/CarSeat.tsx
git commit -m "feat: add interior cockpit and seat art"
```

---

### Task 9: Build state provider and configurator

**Files:**
- Create: `components/configurator/BuildProvider.tsx`
- Create: `components/configurator/Configurator.tsx`

**Interfaces:**
- Consumes: `Car`, `Build`, `defaultBuild`, `computeBuildPrice`, `serialiseBuild`; `CarSide`, `CarRear`, `CarInterior`; `ButtonLink`.
- Produces:
  - `type BuildContextValue = { car: Car; build: Build; update: (patch: Partial<Build>) => void; togglePack: (id: string) => void }`
  - `default function BuildProvider({ car, children }: { car: Car; children: ReactNode })`
  - `function useBuild(): BuildContextValue`
  - `default function Configurator()` — takes no props.

**Why state lives in a provider:** the spec requires the showroom header and the Exterior/Interior tabs to reflect the *current* selection. A single provider must own `build` so the header, the configurator and the tabs all read the same state. Do not keep a second copy of the state in the configurator.

- [ ] **Step 1: Implement `BuildProvider.tsx`**

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Car } from "@/lib/cars";
import { defaultBuild, serialiseBuild, type Build } from "@/lib/build";

type BuildContextValue = {
  car: Car;
  build: Build;
  update: (patch: Partial<Build>) => void;
  togglePack: (id: string) => void;
};

const BuildContext = createContext<BuildContextValue | null>(null);

export function useBuild(): BuildContextValue {
  const value = useContext(BuildContext);
  if (!value) throw new Error("useBuild must be used inside BuildProvider");
  return value;
}

export default function BuildProvider({
  car,
  children,
}: {
  car: Car;
  children: ReactNode;
}) {
  const [build, setBuild] = useState<Build>(() => defaultBuild(car));
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const query = serialiseBuild(build);
    window.history.replaceState(null, "", `${window.location.pathname}?${query}`);
  }, [build]);

  const update = useCallback((patch: Partial<Build>) => {
    setBuild((current) => ({ ...current, ...patch }));
  }, []);

  const togglePack = useCallback((id: string) => {
    setBuild((current) => ({
      ...current,
      packs: current.packs.includes(id)
        ? current.packs.filter((pack) => pack !== id)
        : [...current.packs, id],
    }));
  }, []);

  return (
    <BuildContext.Provider value={{ car, build, update, togglePack }}>
      {children}
    </BuildContext.Provider>
  );
}
```

- [ ] **Step 2: Implement `Configurator.tsx`**

```tsx
"use client";

import { useState } from "react";
import CarSide from "../art/CarSide";
import CarRear from "../art/CarRear";
import CarInterior from "../art/CarInterior";
import { ButtonLink } from "../ui/Button";
import { computeBuildPrice, serialiseBuild } from "@/lib/build";
import { useBuild } from "./BuildProvider";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type Option = {
  id: string;
  name: string;
  price: number;
  hex?: string;
  trimHex?: string;
  material?: string;
};

type OptionGroupProps = {
  label: string;
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
  showSwatch?: boolean;
};

function OptionGroup({
  label,
  options,
  selectedId,
  onSelect,
  showSwatch = false,
}: OptionGroupProps) {
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const handled = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!handled.includes(event.key)) return;
    event.preventDefault();
    const index = options.findIndex((option) => option.id === selectedId);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % options.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + options.length) % options.length;
    } else if (event.key === "Home") {
      next = 0;
    } else {
      next = options.length - 1;
    }
    onSelect(options[next].id);
    event.currentTarget
      .querySelectorAll<HTMLButtonElement>('[role="radio"]')
      [next]?.focus();
  };

  return (
    <div>
      <p className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-600">
        {label}
      </p>
      <div
        role="radiogroup"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="mt-3 grid gap-2"
      >
        {options.map((option) => {
          const selected = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(option.id)}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                selected
                  ? "border-ink-900 bg-ink-900 text-white"
                  : "border-ink-200 bg-white text-ink-900 hover:border-ink-400"
              }`}
            >
              {showSwatch ? (
                <span
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 rounded-full border border-black/20"
                  style={{ backgroundColor: option.hex ?? option.trimHex ?? "#888888" }}
                />
              ) : null}
              <span className="flex-1">
                <span className="block font-display text-xs font-bold uppercase tracking-[0.12em]">
                  {option.name}
                </span>
                {option.material ? (
                  <span className={selected ? "text-white/60" : "text-ink-500"}>
                    {option.material}
                  </span>
                ) : null}
              </span>
              <span className="text-xs font-semibold">
                {option.price > 0 ? `+${usd.format(option.price)}` : "Included"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Configurator() {
  const { car, build, update, togglePack } = useBuild();
  const [view, setView] = useState<"exterior" | "interior" | "rear">("exterior");

  const priced = computeBuildPrice(car, build);
  const paint = car.paints.find((o) => o.id === build.paint) ?? car.paints[0];
  const wheels = car.wheels.find((o) => o.id === build.wheels) ?? car.wheels[0];
  const interior =
    car.interiors.find((o) => o.id === build.interior) ?? car.interiors[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div>
        <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white/70">
          {view === "exterior" ? (
            <CarSide
              uid="config-exterior"
              paint={paint.hex}
              wheel={wheels.style}
              className="h-auto w-full"
            />
          ) : null}
          {view === "interior" ? (
            <CarInterior
              uid="config-interior"
              trimHex={interior.trimHex}
              accentHex={interior.accentHex}
              className="h-auto w-full"
            />
          ) : null}
          {view === "rear" ? (
            <CarRear uid="config-rear" paint={paint.hex} className="h-auto w-full" />
          ) : null}
        </div>

        <div role="tablist" aria-label="Preview view" className="mt-4 flex gap-2">
          {(["exterior", "interior", "rear"] as const).map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={view === name}
              onClick={() => setView(name)}
              className={`cursor-pointer rounded-full px-4 py-2 font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                view === name
                  ? "bg-ink-900 text-white"
                  : "bg-ink-100 text-ink-600 hover:bg-ink-200"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8">
        <OptionGroup
          label="Exterior colour"
          options={car.paints}
          selectedId={build.paint}
          onSelect={(id) => update({ paint: id })}
          showSwatch
        />
        <OptionGroup
          label="Wheels"
          options={car.wheels}
          selectedId={build.wheels}
          onSelect={(id) => update({ wheels: id })}
        />
        <OptionGroup
          label="Interior"
          options={car.interiors}
          selectedId={build.interior}
          onSelect={(id) => update({ interior: id })}
          showSwatch
        />

        <fieldset>
          <legend className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-600">
            Packages
          </legend>
          <div className="mt-3 grid gap-2">
            {car.packs.map((pack) => (
              <label
                key={pack.id}
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-ink-200 bg-white px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={build.packs.includes(pack.id)}
                  onChange={() => togglePack(pack.id)}
                  className="mt-1 h-5 w-5 cursor-pointer accent-volt-600"
                />
                <span className="flex-1">
                  <span className="block font-display text-xs font-bold uppercase tracking-[0.12em] text-ink-900">
                    {pack.name}
                  </span>
                  <span className="text-sm text-ink-500">{pack.blurb}</span>
                </span>
                <span className="text-xs font-semibold text-ink-900">
                  +{usd.format(pack.price)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div
          aria-live="polite"
          className="rounded-3xl border border-ink-100 bg-white p-6"
        >
          <div className="flex items-center justify-between text-sm text-ink-500">
            <span>Base price</span>
            <span>{usd.format(priced.base)}</span>
          </div>
          <ul className="mt-3 grid gap-2">
            {priced.lines.map((line) => (
              <li
                key={line.label}
                className="flex items-center justify-between text-sm text-ink-600"
              >
                <span>{line.label}</span>
                <span>+{usd.format(line.amount)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4">
            <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-600">
              Total
            </span>
            <span className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink-900">
              {usd.format(priced.total)}
            </span>
          </div>
        </div>

        <ButtonLink
          href={`/?car=${car.slug}&${serialiseBuild(build)}#reserve`}
          variant="dark"
          size="lg"
          className="w-full"
        >
          Reserve this build
        </ButtonLink>
      </div>
    </div>
  );
}
```

Every swatch button shows a visible text label, never colour alone.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` and `npm run build`.
Expected: clean.

Run: `npm test`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add components/configurator/BuildProvider.tsx components/configurator/Configurator.tsx
git commit -m "feat: add shared build state and live configurator"
```

---

### Task 10: Car detail page

**Files:**
- Create: `app/models/[slug]/page.tsx`
- Create: `components/configurator/ShowroomHeader.tsx`
- Create: `components/configurator/DetailTabs.tsx`

**Interfaces:**
- Consumes: `cars`, `carSlugs`, `getCar`; `ShowroomStage`, `CarSide`, `CarInterior`, `CarSeat`, `CarRear`; `BuildProvider`, `useBuild`, `Configurator`; `Reveal`, `SectionHeading`, `ButtonLink`, `CountUp`.
- Produces:
  - a statically prerendered page at `/models/<slug>`
  - `default function ShowroomHeader({ car }: { car: Car })` — client component reading `useBuild()`.
  - `default function DetailTabs({ car }: { car: Car })` — client component reading `useBuild()`.

**Important:** the showroom header and the Exterior/Interior/Colour tabs must render the *currently selected* paint and interior, so they must be client components rendered inside the same `BuildProvider` as the configurator. Do not pass the `car` into `Configurator`; pass it into `BuildProvider`.

- [ ] **Step 1: Confirm the dynamic route API from local docs**

Run: `ls node_modules/next/dist/docs/` and read the pages covering dynamic routes, `generateStaticParams`, `generateMetadata`, and `notFound`. Confirm whether `params` is a Promise in this version and copy the exact signature shape from the docs.

- [ ] **Step 2: Implement the route**

Create `app/models/[slug]/page.tsx` as an async server component using the signatures confirmed in Step 1. Required behaviour:

- `export function generateStaticParams()` returns `carSlugs.map((slug) => ({ slug }))`.
- `export async function generateMetadata({ params })` awaits params, loads the car, and returns `{ title: `${car.name} — VOLTSPRINT`, description: car.summary, openGraph: { title: car.name, description: car.summary } }`. Return `{}` when the car is missing.
- The page awaits params, calls `getCar(slug)`, and calls `notFound()` when undefined.
- Wrap the interactive region in the provider so the header, configurator and tabs share one build state. The static sections can stay server-rendered and be passed through as `children`, because a server component may pass server-rendered children into a client component:

```tsx
<BuildProvider car={car}>
  <ShowroomHeader car={car} />
  <div id="configure" className="scroll-mt-24">
    <Configurator />
  </div>
  <DetailTabs car={car} />
</BuildProvider>
```

- Renders, in order:
  1. **Showroom header** — `ShowroomHeader` (client) — `bg-black text-white`, breadcrumb `Home / Models / {car.name}` with `Link`s, `car.name` as `<h1>` at `text-[clamp(2.4rem,6.5vw,4.6rem)]`, `car.tagline`, three headline stats from `car.specs` (power, range, sprint), and `<ShowroomStage uid="detail-stage" intensity="detail">` containing `<CarSide uid="detail-car" paint={paint.hex} wheel={wheels.style} />` using the *current* `build.paint` and `build.wheels` resolved through `useBuild()`. Primary `ButtonLink href="#configure"` labelled "Configure & reserve"; secondary link to `/#reserve` labelled "Book a test drive".
  2. **Configurator** — `<div id="configure" className="scroll-mt-24">` with `<Configurator />` (no props).
  3. **Detail tabs** — `<DetailTabs car={car} />`.
  4. **Spec table** — every field of `car.specs` in a two-column definition list inside a `rounded-3xl` card.
  5. **Other models** — the other two entries of `cars` as links to their detail pages, each showing `name`, `tagline` and formatted `basePrice`.
  6. **Reserve CTA band** — a black `rounded-[36px]` band with a lime `ButtonLink href={`/?car=${car.slug}#reserve`}`.
- Use `car.story` for the Exterior and Interior tab copy.

`ShowroomHeader` skeleton:

```tsx
"use client";

import type { Car } from "@/lib/cars";
import CarSide from "../art/CarSide";
import ShowroomStage from "../art/ShowroomStage";
import { useBuild } from "./BuildProvider";

export default function ShowroomHeader({ car }: { car: Car }) {
  const { build } = useBuild();
  const paint = car.paints.find((o) => o.id === build.paint) ?? car.paints[0];
  const wheels = car.wheels.find((o) => o.id === build.wheels) ?? car.wheels[0];
  // breadcrumb, h1, tagline, three stats, stage with CarSide(paint, wheel), CTAs
}
```

Add a small visible build caption in the header (for example `paint.name` and `wheels.name`) so the header demonstrably tracks the selection, and give it `data-testid="header-build"`.

- [ ] **Step 3: Implement `DetailTabs.tsx`**

Client component, props `{ car: Car }`. Four tabs: Exterior, Interior, Colour, Performance.

- Read the live selection with `useBuild()` and resolve `paint`, `wheels` and `interior` the same way as the header, so the panels track the configurator.
- `role="tablist"` with four `role="tab"` buttons; each has `aria-selected`, `aria-controls`, `id`, and `tabIndex={selected ? 0 : -1}`.
- Panels: `role="tabpanel"` with `aria-labelledby` and `tabIndex={0}`.
- Keyboard: `ArrowRight`/`ArrowLeft` move selection and focus, `Home`/`End` jump to first/last.
- Exterior panel: first `car.story` block heading and body plus `<CarSide uid="tab-exterior" paint={paint.hex} wheel={wheels.style} />`.
- Interior panel: second `car.story` block plus `<CarInterior uid="tab-interior" trimHex={interior.trimHex} accentHex={interior.accentHex} />` and `<CarSeat uid="tab-seat" trimHex={interior.trimHex} accentHex={interior.accentHex} />`, plus a list of the four interior names and materials.
- Colour panel: a grid of all six paints; each cell renders `<CarSide uid={`tab-paint-${paint.id}`} paint={paint.hex} />` at small size with the paint name and price.
- Performance panel: a definition list of `car.specs` plus the `CountUp` treatment for the numeric figures where a number is available.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`.
Expected: clean, and the build output lists the three `/models/...` routes as prerendered.

Confirm each route responds and renders the car name:

```bash
node -e "
const { chromium } = require('/usr/local/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  for (const slug of ['voltsprint-s','voltsprint-gt','voltsprint-r']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    const res = await p.goto('http://localhost:3000/models/' + slug, { waitUntil: 'networkidle' });
    const h1 = await p.\$eval('h1', el => el.textContent);
    console.log(slug, res.status(), h1);
    await p.close();
  }
  const nf = await b.newPage();
  const r = await nf.goto('http://localhost:3000/models/does-not-exist');
  console.log('unknown slug status:', r.status());
  await b.close();
})();
"
```

Expected: status 200 and the matching name for each slug; the unknown slug returns 404.

Also confirm the header tracks the configurator selection (the shared-provider requirement):

```bash
node -e "
const { chromium } = require('/usr/local/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3000/models/voltsprint-gt', { waitUntil: 'networkidle' });
  const before = await p.\$eval('[data-testid=header-build]', el => el.textContent);
  await p.getByRole('radio', { name: /Bronze/i }).click();
  const after = await p.\$eval('[data-testid=header-build]', el => el.textContent);
  console.log('header before:', before);
  console.log('header after:', after);
  if (before === after) { console.error('header did not track selection'); process.exit(1); }
  await b.close();
})();
"
```

Expected: `header after` mentions `Bronze` and differs from `header before`.

- [ ] **Step 5: Commit**

```bash
git add app/models components/configurator/DetailTabs.tsx components/configurator/ShowroomHeader.tsx
git commit -m "feat: add car detail pages with editorial tabs"
```

---

### Task 11: Reserve handoff

**Files:**
- Modify: `components/site/Reserve.tsx`

**Interfaces:**
- Consumes: `getCar`, `parseBuild`, `computeBuildPrice`.
- Produces: the reserve form prefills the model and shows a "Your build" summary when `?car=` is present.

- [ ] **Step 1: Read the build from the URL**

`components/site/Reserve.tsx` is already a client component. Add `useSearchParams` from `next/navigation`. Because the home page is statically rendered, the component that calls `useSearchParams` must sit inside a `<Suspense>` boundary. Split the file:

- Keep `Reserve` as the default export and have it render the existing section, but wrap the form body in `<Suspense fallback={null}>`.
- Move the current form plus the new summary into an inner component `ReserveForm` that calls `useSearchParams`.

Derive once:

```tsx
const params = useSearchParams();
const carSlug = params.get("car");
const car = carSlug ? getCar(carSlug) : undefined;
const build = car ? parseBuild(car, params) : undefined;
const priced = car && build ? computeBuildPrice(car, build) : undefined;
```

Initialise the form state from the car when present:

```tsx
const [fields, setFields] = useState<Fields>(() => ({
  ...initialFields,
  model: car ? car.name : initialFields.model,
}));
```

- [ ] **Step 2: Render the build summary**

When `car` and `build` and `priced` all exist, render above the form (inside the form card) a compact summary:

- Heading "Your build".
- The car name and its chosen paint, wheels and interior names, plus each selected pack name.
- The total from `priced.total`, formatted as USD with no decimals.
- A `<Link href={`/models/${car.slug}`}>` labelled "Edit configuration" that returns to the detail page with the build still in the URL — build the href with `/models/${car.slug}?${serialiseBuild(build)}`.

When `car` is absent, render nothing extra and behave exactly as before.

- [ ] **Step 3: Verify the handoff end to end**

```bash
node -e "
const { chromium } = require('/usr/local/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3000/models/voltsprint-gt', { waitUntil: 'networkidle' });
  await p.getByRole('radio', { name: /Bronze/i }).click();
  await p.getByRole('button', { name: /Reserve this build/i }).click();
  await p.waitForLoadState('networkidle');
  const model = await p.\$eval('#reserve-model', el => el.value);
  const summary = await p.\$eval('[data-testid=build-summary]', el => el.textContent);
  console.log('prefilled model:', model);
  console.log('summary:', summary.slice(0, 120));
  await b.close();
})();
"
```

Expected: the model select shows `VOLTSPRINT GT` and the summary mentions `Bronze`.

Add `data-testid="build-summary"` to the summary container to make this check stable.

- [ ] **Step 4: Run the full verification suite**

Run: `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`.
Expected: all clean.

- [ ] **Step 5: Commit**

```bash
git add components/site/Reserve.tsx
git commit -m "feat: prefill reserve form from configurator build"
```

---

### Task 12: Final verification sweep

**Files:**
- No production files. Verification only.

**Interfaces:**
- Consumes: everything above.
- Produces: a verified build.

- [ ] **Step 1: Static checks**

Run:

```bash
npx tsc --noEmit
npm run lint
npm test
npm run build
```

Expected: all clean; the build lists `/` and the three `/models/[slug]` routes as prerendered.

- [ ] **Step 2: Cross-size sweep**

Start the production server, then run this script. It fails loudly on the first violation:

```bash
cd /workspace && (npm start -- --port 3000 &) && sleep 4
node -e "
const { chromium } = require('/usr/local/lib/node_modules/playwright');

const routes = ['/', '/models/voltsprint-s', '/models/voltsprint-gt', '/models/voltsprint-r'];
const sizes = [{ width: 1440, height: 900 }, { width: 390, height: 844 }];

(async () => {
  const b = await chromium.launch();
  const failures = [];
  for (const route of routes) {
    for (const vp of sizes) {
      const p = await b.newPage({ viewport: vp });
      const errors = [];
      p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      p.on('pageerror', e => errors.push(String(e)));
      const res = await p.goto('http://localhost:3000' + route, { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      await p.evaluate(async () => {
        const step = Math.round(window.innerHeight * 0.7);
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 200));
        }
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 400));
      });
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const hidden = await p.\$\$eval('.reveal', els => els.filter(e => getComputedStyle(e).opacity !== '1').length);
      const label = route + ' @' + vp.width;
      if (res.status() !== 200) failures.push(label + ' status ' + res.status());
      if (overflow !== 0) failures.push(label + ' overflow ' + overflow);
      if (hidden !== 0) failures.push(label + ' hiddenReveals ' + hidden);
      if (errors.length) failures.push(label + ' errors ' + errors.join('|'));
      await p.close();
    }
  }
  await b.close();
  if (failures.length) { console.error('FAILURES:\n' + failures.join('\n')); process.exit(1); }
  console.log('cross-size sweep passed for ' + routes.length + ' routes x ' + sizes.length + ' sizes');
})();
"
```

Expected: `cross-size sweep passed for 4 routes x 2 sizes`.

- [ ] **Step 3: Reduced motion**

```bash
node -e "
const { chromium } = require('/usr/local/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const failures = [];
  for (const route of ['/', '/models/voltsprint-gt']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await p.goto('http://localhost:3000' + route, { waitUntil: 'networkidle' });
    await p.waitForTimeout(700);
    const hidden = await p.\$\$eval('.reveal', els => els.filter(e => getComputedStyle(e).opacity !== '1').length);
    const running = await p.\$\$eval('*', els => els.filter(e => {
      const s = getComputedStyle(e);
      return s.animationName !== 'none' && s.animationPlayState === 'running' && parseFloat(s.animationDuration) > 0.05;
    }).length);
    if (hidden !== 0) failures.push(route + ' hiddenReveals ' + hidden);
    if (running !== 0) failures.push(route + ' runningAnimations ' + running);
    await p.close();
  }
  await b.close();
  if (failures.length) { console.error('FAILURES:\n' + failures.join('\n')); process.exit(1); }
  console.log('reduced-motion passed');
})();
"
```

Expected: `reduced-motion passed`.

- [ ] **Step 4: Accessibility spot checks**

```bash
node -e "
const { chromium } = require('/usr/local/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3000/models/voltsprint-gt', { waitUntil: 'networkidle' });

  const gridHidden = await p.\$eval('.grid-backdrop', el => el.getAttribute('aria-hidden'));
  const swatches = await p.\$\$eval('[role=radio]', els => els.map(e => (e.getAttribute('aria-label') || e.textContent || '').trim()).filter(Boolean));
  const live = await p.\$\$eval('[aria-live=polite]', els => els.length);

  const tabs = p.locator('[role=tab]');
  await tabs.first().focus();
  await p.keyboard.press('ArrowRight');
  const selected = await p.\$\$eval('[role=tab]', els => els.filter(e => e.getAttribute('aria-selected') === 'true').length);

  const failures = [];
  if (gridHidden !== 'true') failures.push('grid backdrop is not aria-hidden');
  if (swatches.length < 6) failures.push('swatch accessible names: ' + swatches.length);
  if (live < 1) failures.push('no aria-live polite region');
  if (selected !== 1) failures.push('tab selection after ArrowRight: ' + selected);

  await b.close();
  if (failures.length) { console.error('FAILURES:\n' + failures.join('\n')); process.exit(1); }
  console.log('a11y spot checks passed; sample swatch name:', swatches[0]);
})();
"
```

Expected: `a11y spot checks passed; sample swatch name: Obsidian`.

- [ ] **Step 5: Visual pass**

Capture full-page screenshots of `/` and each detail page at 1440 wide and 390 wide. Confirm by eye:

- The grid is visible mid-page and dissolves at the corners.
- The hero showroom reads as a showroom; the car sits on the turntable.
- Each detail page shows the car, the configurator, the tabs, the specs and the reserve band.
- Changing paint visibly recolours the car on the staged view.
- Changing interior visibly retints the cockpit and the seat.
- No text sits on a background with insufficient contrast.

- [ ] **Step 6: Report**

Summarise: routes added, palette change, grid behaviour, hero behaviour, configurator capabilities, test results, and any deviations from the spec.

---

## Notes for the implementer

- `components/site/Hero.tsx` becomes unused after Task 7. Leave it in place; removing files is out of scope for this plan.
- `lib/cars.ts` must never import from a `.tsx` file. If a shared type is needed in the component layer, `import type` it.
- The `node --test` runner discovers `tests/*.test.ts` automatically; run `npm test` from the repository root.
- If `allowImportingTsExtensions` causes a conflict with `next build` type generation, fall back to excluding `tests` from the Next `tsconfig` include list and run the tests with `node --test --experimental-strip-types` explicitly.
- Spec §6 names `router.replace` for the URL sync. This plan uses `window.history.replaceState` instead, which satisfies the same intent (shareable, refresh-safe URL) without an RSC round-trip on every option click and without any risk of the provider remounting and resetting the selection. This is a deliberate, minor deviation.
- `components/configurator/ShowroomHeader.tsx` is an addition beyond the spec's file list (spec §10). It exists because the showroom header must be a client component to read the shared build state.
- The `packs` param is omitted from the URL when no packages are selected, so a default build produces `paint=…&wheels=…&interior=…` only. `parseBuild` treats a missing `packs` param as an empty selection.
