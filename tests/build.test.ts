import { test } from "node:test";
import assert from "node:assert/strict";
import { getCar } from "../lib/cars.ts";
import {
  defaultBuild,
  computeBuildPrice,
  parseBuild,
  serialiseBuild,
} from "../lib/build.ts";

const car = getCar("land-cruiser-lc300-zx")!;

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
