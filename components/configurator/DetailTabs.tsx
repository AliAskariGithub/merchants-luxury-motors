"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { Car } from "@/lib/cars";
import CarSide from "../art/CarSide";
import CarInterior from "../art/CarInterior";
import CarSeat from "../art/CarSeat";
import CountUp from "../ui/CountUp";
import { useBuild } from "./BuildProvider";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type TabId = "exterior" | "interior" | "colour" | "performance";

const TABS: { id: TabId; label: string }[] = [
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "colour", label: "Colour" },
  { id: "performance", label: "Performance" },
];

const SPEC_LABELS: Record<keyof Car["specs"], string> = {
  power: "Peak power",
  torque: "Peak torque",
  range: "WLTP range",
  sprint: "0–100 km/h",
  charge: "Peak charge",
  drivetrain: "Drivetrain",
  topSpeed: "Top speed",
  seats: "Seats",
  weight: "Weight",
  fuelEconomy: "Fuel economy",
  transmission: "Transmission",
  engine: "Engine",
};

function Figure({ value }: { value: string }) {
  const match = value.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  const parsed = match ? Number(match[1].replace(/,/g, "")) : Number.NaN;
  if (!match || Number.isNaN(parsed) || parsed >= 1000) return <>{value}</>;
  const decimals = match[1].includes(".") ? 1 : 0;
  return (
    <>
      <CountUp value={parsed} decimals={decimals} />
      {match[2]}
    </>
  );
}

export default function DetailTabs({ car }: { car: Car }) {
  const { build } = useBuild();
  const [active, setActive] = useState<TabId>("exterior");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const paint = car.paints.find((option) => option.id === build.paint) ?? car.paints[0];
  const wheels = car.wheels.find((option) => option.id === build.wheels) ?? car.wheels[0];
  const interior =
    car.interiors.find((option) => option.id === build.interior) ?? car.interiors[0];

  const specEntries = (Object.keys(SPEC_LABELS) as (keyof Car["specs"])[]).map((key) => ({
    key,
    label: SPEC_LABELS[key],
    value: String(car.specs[key]),
  }));

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const handled = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!handled.includes(event.key)) return;
    event.preventDefault();
    const index = TABS.findIndex((tab) => tab.id === active);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % TABS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + TABS.length) % TABS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else {
      next = TABS.length - 1;
    }
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const exteriorStory = car.story[0];
  const interiorStory = car.story[1] ?? car.story[0];

  return (
    <section className="bg-ink-50/80 py-20 sm:py-24">
      <div className="shell">
        <div
          role="tablist"
          aria-label={`${car.name} details`}
          onKeyDown={onKeyDown}
          className="flex flex-wrap gap-2"
        >
          {TABS.map((tab, index) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`detail-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`detail-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`cursor-pointer rounded-full px-5 py-2.5 font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                  selected
                    ? "bg-ink-900 text-white"
                    : "bg-white text-ink-600 hover:bg-ink-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {active === "exterior" ? (
          <div
            role="tabpanel"
            id="detail-panel-exterior"
            aria-labelledby="detail-tab-exterior"
            tabIndex={0}
            className="mt-8 grid items-center gap-10 rounded-3xl border border-ink-100 bg-white/85 p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:p-10"
          >
            <div>
              <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-ink-900">
                {exteriorStory.heading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-500">
                {exteriorStory.body}
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-ink-50 via-white to-ink-100">
              <CarSide
                uid="tab-exterior"
                paint={paint.hex}
                wheel={wheels.style}
                label={`${car.name} exterior in ${paint.name}`}
                className="h-auto w-full"
              />
            </div>
          </div>
        ) : null}

        {active === "interior" ? (
          <div
            role="tabpanel"
            id="detail-panel-interior"
            aria-labelledby="detail-tab-interior"
            tabIndex={0}
            className="mt-8 grid gap-10 rounded-3xl border border-ink-100 bg-white/85 p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:p-10"
          >
            <div>
              <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-ink-900">
                {interiorStory.heading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-500">
                {interiorStory.body}
              </p>
              <ul className="mt-7 grid gap-2">
                {car.interiors.map((option) => {
                  const selected = option.id === interior.id;
                  return (
                    <li
                      key={option.id}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                        selected
                          ? "border-ink-900 bg-ink-900 text-white"
                          : "border-ink-200 bg-white text-ink-700"
                      }`}
                    >
                      <span className="font-display text-xs font-bold uppercase tracking-[0.12em]">
                        {option.name}
                      </span>
                      <span className={selected ? "text-white/60" : "text-ink-500"}>
                        {option.material}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-3xl border border-ink-100 bg-black">
                <CarInterior
                  uid="tab-interior"
                  trimHex={interior.trimHex}
                  accentHex={interior.accentHex}
                  className="h-auto w-full"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
                <CarSeat
                  uid="tab-seat"
                  trimHex={interior.trimHex}
                  accentHex={interior.accentHex}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        ) : null}

        {active === "colour" ? (
          <div
            role="tabpanel"
            id="detail-panel-colour"
            aria-labelledby="detail-tab-colour"
            tabIndex={0}
            className="mt-8 rounded-3xl border border-ink-100 bg-white/85 p-8 lg:p-10"
          >
            <p className="max-w-2xl text-base leading-relaxed text-ink-500">
              Six finishes, each applied over the same carbon-composite body.
              Select one in the configurator above to update the whole page.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {car.paints.map((option) => {
                const selected = option.id === paint.id;
                return (
                  <div
                    key={option.id}
                    className={`overflow-hidden rounded-3xl border bg-white transition-colors ${
                      selected ? "border-ink-900" : "border-ink-100"
                    }`}
                  >
                    <div className="bg-gradient-to-br from-ink-50 via-white to-ink-100">
                      <CarSide
                        uid={`tab-paint-${option.id}`}
                        paint={option.hex}
                        wheel={wheels.style}
                        label={`${car.name} in ${option.name}`}
                        className="h-auto w-full"
                      />
                    </div>
                    <div className="flex items-center justify-between border-t border-ink-100 px-5 py-4">
                      <span className="font-display text-xs font-bold uppercase tracking-[0.12em] text-ink-900">
                        {option.name}
                      </span>
                      <span className="text-xs font-semibold text-ink-500">
                        {option.price > 0 ? `+${usd.format(option.price)}` : "Included"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {active === "performance" ? (
          <div
            role="tabpanel"
            id="detail-panel-performance"
            aria-labelledby="detail-tab-performance"
            tabIndex={0}
            className="mt-8 rounded-3xl border border-ink-100 bg-white/85 p-8 lg:p-10"
          >
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {specEntries.map((spec) => (
                <div
                  key={spec.key}
                  className="flex items-baseline justify-between gap-4 border-b border-ink-100 pb-4"
                >
                  <dt className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-500">
                    {spec.label}
                  </dt>
                  <dd className="font-display text-lg font-extrabold tracking-[-0.02em] text-ink-900">
                    <Figure value={spec.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    </section>
  );
}
