import { test } from "node:test";
import assert from "node:assert/strict";
import { cars, carSlugs, getCar } from "../lib/cars.ts";

test("exposes the Karachi showroom car inventory", () => {
  assert.ok(cars.length >= 8);
  assert.ok(carSlugs.includes("land-cruiser-lc300-zx"));
  assert.ok(carSlugs.includes("mercedes-benz-s580-4matic"));
  assert.ok(carSlugs.includes("porsche-taycan-4s"));
});

test("every car has the required option counts, PKR pricing, and specs", () => {
  for (const car of cars) {
    assert.equal(car.paints.length, 6, `${car.slug} paints`);
    assert.equal(car.wheels.length, 3, `${car.slug} wheels`);
    assert.equal(car.interiors.length, 4, `${car.slug} interiors`);
    assert.equal(car.packs.length, 3, `${car.slug} packs`);
    assert.ok(car.pricePkr > 0, `${car.slug} price PKR`);
    assert.ok(car.story.length >= 2, `${car.slug} story blocks`);
    assert.ok(car.summary.length > 20, `${car.slug} summary`);
    assert.ok(car.exteriorImages.length >= 2, `${car.slug} exterior images`);
    assert.ok(car.interiorImages.length >= 2, `${car.slug} interior images`);
    assert.ok(car.specs.power.length > 0, `${car.slug} power`);
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
  assert.equal(getCar("land-cruiser-lc300-zx")?.shortName, "LC300 ZX");
  assert.equal(getCar("nope"), undefined);
});
