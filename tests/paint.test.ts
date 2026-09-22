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
