"use client";

import { useState, type KeyboardEvent } from "react";
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
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
