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
  { id: "all", label: "All Vehicles" },
  { id: "sedan", label: "Sedans" },
  { id: "suv", label: "SUVs" },
  { id: "hatchback", label: "Hatchbacks" },
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
    if (activeCategory === "hatchback") return car.category.toLowerCase().includes("hatchback");
    return true;
  });

  return (
    <section id="inventory" className="scroll-mt-24 bg-neutral-50 py-20 sm:py-24 lg:py-28">
      <div className="shell">
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center gap-6">
          <SectionHeading
            align="center"
            title={
              <>
                Pakistan&apos;s Most-Selling Vehicles.
                <br />
                Ready for Immediate Delivery.
              </>
            }
            description="Every vehicle on our Khalid Bin Waleed Road showroom floor has undergone rigorous CPLC verification, physical inspection, and biometric authentication."
          />

          <Reveal delay={120}>
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 rounded-none border border-neutral-300 bg-white px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all hover:border-black hover:bg-black hover:text-white"
            >
              Browse Full 150+ Fleet
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Category Tabs centered with sharp corners */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar border-b border-neutral-200 pb-3 sm:pb-4">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`shrink-0 rounded-none px-4 sm:px-5 py-2 sm:py-2.5 font-display text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider transition-all ${
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
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5 pointer-events-none">
                    <span className="inline-flex items-center gap-1 rounded-none bg-black/80 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-amber-300 backdrop-blur border border-amber-500/30">
                      {car.year} • {car.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-none bg-emerald-950/90 px-2 py-1 text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur border border-emerald-500/30">
                      <ShieldCheck className="h-3 w-3" /> CPLC Verified
                    </span>
                  </div>

                  {/* Stock Status Tag */}
                  <div className="absolute bottom-3 left-3 pointer-events-none">
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-white/90 drop-shadow">
                      {car.condition} • {car.mileage}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-amber-600 block truncate">
                        {car.brand}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-black uppercase text-neutral-900 leading-snug line-clamp-1">
                        {car.name}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {car.summary}
                  </p>

                  {/* Quick Specs */}
                  <div className="my-3.5 sm:my-5 grid grid-cols-2 gap-2 sm:gap-3 rounded-none bg-neutral-50 p-2.5 sm:p-3.5 text-xs border border-neutral-100">
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
                        className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-none border border-emerald-500/40 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm shrink-0"
                      >
                        <WhatsApp className="h-4 w-4" />
                      </a>

                      <Link
                        href={`/inventory/${car.slug}`}
                        className="inline-flex items-center gap-1 sm:gap-1.5 rounded-none bg-neutral-900 px-3 sm:px-4 py-2 sm:py-2.5 font-display text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-amber-500 hover:text-black shrink-0"
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
