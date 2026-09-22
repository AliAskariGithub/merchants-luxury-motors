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
