"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cars } from "@/lib/cars";
import { getWhatsAppUrl } from "@/lib/showroom";
import Reveal from "../ui/Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, ShieldCheck, Gauge, Fuel, WhatsApp } from "../ui/Icons";

const CATEGORIES = [
  { id: "all", label: "All Showroom Stock" },
  { id: "suv", label: "Luxury SUVs" },
  { id: "sedan", label: "Executive Sedans" },
  { id: "electric", label: "Hybrids & Electric" },
];

function cleanCardSpec(value: string): string {
  return value
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*@.*$/, "")
    .replace("in Karachi Traffic", "")
    .trim();
}

export default function Models() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCars = cars.filter((car) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "suv") return car.category.toLowerCase().includes("suv");
    if (activeCategory === "sedan") return car.category.toLowerCase().includes("sedan");
    if (activeCategory === "electric") {
      return (
        car.category.toLowerCase().includes("electric") ||
        car.category.toLowerCase().includes("hybrid") ||
        car.specs.charge.toLowerCase().includes("kw")
      );
    }
    return true;
  });

  return (
    <section id="inventory" className="scroll-mt-24 bg-neutral-50 py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Karachi Showroom Inventory"
            title={
              <>
                Prestigious Vehicles.
                <br />
                Ready for Immediate Delivery.
              </>
            }
            description="Every vehicle on our Khalid Bin Waleed Road showroom floor has undergone rigorous CPLC verification, physical inspection, and biometric authentication."
          />

          <Reveal delay={120} className="shrink-0">
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all hover:border-black hover:bg-black hover:text-white"
            >
              Browse Full 150+ Fleet
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 sm:mt-10 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-neutral-200 pb-3 sm:pb-4">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`shrink-0 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 font-display text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === tab.id
                  ? "bg-neutral-950 text-white shadow-md"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car, index) => (
            <Reveal key={car.slug} delay={index * 80} className="flex">
              <div className="group flex h-full w-full flex-col overflow-hidden rounded-2xl sm:rounded-[26px] border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-neutral-300">
                {/* Vehicle Image Banner with Badges */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={car.heroImage}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute left-3.5 sm:left-4 top-3.5 sm:top-4 z-10 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 sm:px-3 py-1 text-[0.625rem] sm:text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur border border-amber-500/30">
                      {car.condition}
                    </span>
                  </div>

                  <div className="absolute right-3.5 sm:right-4 top-3.5 sm:top-4 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/80 px-2.5 py-1 text-[0.625rem] sm:text-xs font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur border border-emerald-500/30">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      CPLC Clear
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details - non-redundant */}
                  <div className="absolute bottom-3 left-3.5 sm:left-4 right-3.5 sm:right-4 z-10 flex items-center justify-between text-white">
                    <span className="rounded-md bg-black/60 px-2 py-0.5 text-[0.65rem] sm:text-xs font-medium text-neutral-200 backdrop-blur-xs">
                      {car.category}
                    </span>
                    <span className="rounded-md bg-black/60 px-2 py-0.5 text-[0.65rem] sm:text-xs font-medium text-neutral-200 backdrop-blur-xs">
                      {car.registration}
                    </span>
                  </div>
                </div>

                {/* Car Content */}
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-neutral-900 group-hover:text-amber-600 transition-colors min-h-[2.75rem] sm:min-h-[3.25rem] line-clamp-2">
                    {car.name}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500 line-clamp-2 h-8">
                    {car.tagline}
                  </p>

                  {/* Key Quick Specs - with clean non-truncated display */}
                  <div className="my-3.5 sm:my-5 grid grid-cols-2 gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-neutral-50 p-2.5 sm:p-3.5 text-xs border border-neutral-100">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-700">
                      <Gauge className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600 shrink-0" />
                      <span className="font-semibold text-neutral-800 leading-snug truncate text-[0.7rem] sm:text-xs">
                        {cleanCardSpec(car.specs.power)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-700">
                      <Fuel className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600 shrink-0" />
                      <span className="font-semibold text-neutral-800 leading-snug truncate text-[0.7rem] sm:text-xs">
                        {cleanCardSpec(car.specs.fuelEconomy)}
                      </span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-100 pt-3.5 sm:pt-4">
                    <div className="min-w-0">
                      <span className="block text-[0.6rem] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500 truncate">
                        Showroom Price
                      </span>
                      <span className="font-display text-base sm:text-lg lg:text-xl font-black text-neutral-900 truncate block">
                        {car.priceFormatted}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <a
                        href={getWhatsAppUrl(`Hi! I'm interested in the ${car.name} priced at ${car.priceFormatted} at your Khalid Bin Waleed showroom.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp about ${car.name}`}
                        className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-emerald-500/40 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm shrink-0"
                      >
                        <WhatsApp className="h-4 w-4" />
                      </a>

                      <Link
                        href={`/inventory/${car.slug}`}
                        className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-neutral-900 px-3 sm:px-4 py-2 sm:py-2.5 font-display text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-amber-500 hover:text-black shrink-0"
                      >
                        Details
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
