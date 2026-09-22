"use client";

import Link from "next/link";
import type { Car } from "@/lib/cars";
import CarSide from "../art/CarSide";
import ShowroomStage from "../art/ShowroomStage";
import { ButtonLink } from "../ui/Button";
import { Bolt } from "../ui/Icons";
import { useBuild } from "./BuildProvider";

export default function ShowroomHeader({ car }: { car: Car }) {
  const { build } = useBuild();
  const paint = car.paints.find((option) => option.id === build.paint) ?? car.paints[0];
  const wheels = car.wheels.find((option) => option.id === build.wheels) ?? car.wheels[0];

  const stats = [
    { label: "Peak power", value: car.specs.power },
    { label: "Range", value: car.specs.range },
    { label: "0–100 km/h", value: car.specs.sprint },
  ];

  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:py-20">
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-display text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-white/40">
              <li>
                <Link href="/" className="transition-colors hover:text-volt-500">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#models" className="transition-colors hover:text-volt-500">
                  Models
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/80">
                {car.name}
              </li>
            </ol>
          </nav>

          <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-display text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white/70">
            <Bolt className="h-3.5 w-3.5 text-volt-500" />
            {car.category}
          </p>

          <h1 className="mt-5 font-display text-[clamp(2.4rem,6.5vw,4.6rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-white">
            {car.name}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            {car.tagline}
          </p>

          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-5 text-center">
                <dd className="font-display text-xl font-extrabold tracking-[-0.02em] text-white">
                  {stat.value}
                </dd>
                <dt className="mt-1.5 font-display text-[0.625rem] font-bold uppercase tracking-[0.16em] text-white/45">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          <p
            data-testid="header-build"
            className="mt-6 font-display text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-volt-500"
          >
            Now showing — {paint.name} · {wheels.name}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#configure" variant="primary" size="lg" className="w-full sm:w-auto">
              Configure &amp; reserve
            </ButtonLink>
            <ButtonLink href="/#reserve" variant="light" size="lg" className="w-full sm:w-auto">
              Book a test drive
            </ButtonLink>
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] border border-white/10 bg-black">
          <ShowroomStage uid="detail-stage" intensity="detail" className="h-full w-full">
            <CarSide
              uid="detail-car"
              paint={paint.hex}
              wheel={wheels.style}
              x={195}
              y={298}
              width={1050}
              height={403}
            />
          </ShowroomStage>
        </div>
      </div>
    </section>
  );
}
