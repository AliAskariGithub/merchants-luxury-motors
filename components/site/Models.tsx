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
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            align="center"
            title="Pakistan's Most-Selling Vehicles, Ready for Immediate Delivery"
            description="Every vehicle on our Khalid Bin Waleed Road showroom floor has undergone rigorous CPLC verification, physical inspection, and biometric authentication."
          />
        </div>

        {/* Enhanced Category Filter Tabs with sharp corners and count badges */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <div className="inline-flex p-1 bg-neutral-100 border border-neutral-300 shadow-sm rounded-none gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar max-w-full">
            {CATEGORIES.map((tab) => {
              const count = cars.filter((c) => {
                if (tab.id === "all") return true;
                if (tab.id === "suv") return c.category.toLowerCase().includes("suv");
                if (tab.id === "sedan") return c.category.toLowerCase().includes("sedan");
                if (tab.id === "hatchback") return c.category.toLowerCase().includes("hatchback");
                return true;
              }).length;

              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`group relative shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 font-display text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-none ${
                    isActive
                      ? "bg-neutral-950 text-white shadow-md"
                      : "text-neutral-600 hover:text-neutral-950 hover:bg-white"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`inline-flex items-center justify-center px-1.5 py-0.5 text-[0.625rem] font-bold rounded-none ${
                      isActive
                        ? "bg-amber-400 text-neutral-950"
                        : "bg-neutral-200 text-neutral-700 group-hover:bg-neutral-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vehicle Grid: Pure image resting state, on-hover image fade + info overlay */}
        <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car, index) => (
            <Reveal key={car.slug} delay={index * 80} className="flex">
              <div className="group relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden rounded-none border border-neutral-200/90 bg-neutral-950 shadow-sm transition-all duration-300 hover:border-neutral-900 hover:shadow-2xl">
                {/* Car Image: Crisp resting state, fades smoothly to dark backdrop on hover */}
                <Image
                  src={car.heroImage}
                  alt={car.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-20"
                />

                {/* Resting State subtle caption (visible on mobile / glances, fades out when hovered) */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3.5 sm:p-4 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-amber-400 block truncate">
                        {car.brand}
                      </span>
                      <h3 className="font-display text-sm sm:text-base font-bold uppercase text-white truncate drop-shadow-sm">
                        {car.name}
                      </h3>
                    </div>
                    <span className="font-display text-sm sm:text-base font-black text-white shrink-0 drop-shadow-sm">
                      {car.priceFormatted}
                    </span>
                  </div>
                </div>

                {/* Direct background click link to separate detail page */}
                <Link
                  href={`/inventory/${car.slug}`}
                  className="absolute inset-0 z-0"
                  aria-label={`View full details of ${car.name}`}
                />

                {/* On-Hover Information Overlay */}
                <div className="relative z-10 flex h-full w-full flex-col justify-between p-4 sm:p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto bg-gradient-to-t from-black/90 via-black/60 to-black/30">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 bg-amber-400 text-neutral-950 px-2 py-0.5 text-[0.65rem] font-black uppercase tracking-wider rounded-none">
                      {car.year} • {car.category}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider rounded-none">
                      <ShieldCheck className="h-3 w-3" /> CPLC Verified
                    </span>
                  </div>

                  {/* Vehicle Details Overview */}
                  <div className="my-auto flex flex-col">
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-amber-400">
                      {car.brand}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-black uppercase text-white tracking-tight leading-snug">
                      {car.name}
                    </h3>

                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="font-display text-xl sm:text-2xl font-black text-white">
                        {car.priceFormatted}
                      </span>
                      <span className="text-[0.65rem] uppercase tracking-wider text-neutral-400">
                        • {car.condition}
                      </span>
                    </div>

                    {/* Quick Specs */}
                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/15 pt-2.5 text-[0.7rem] text-neutral-200">
                      <div className="flex items-center gap-1.5 truncate">
                        <Gauge className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{cleanCardSpec(car.specs.power)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Fuel className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{cleanCardSpec(car.specs.fuelEconomy)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions to separate detail page & WhatsApp */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/inventory/${car.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-none bg-amber-500 hover:bg-amber-400 px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-neutral-950 transition-colors shadow-md"
                    >
                      View Details
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>

                    <a
                      href={getWhatsAppUrl(`Hi! I'm interested in the ${car.name} priced at ${car.priceFormatted} at your Khalid Bin Waleed showroom.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp about ${car.name}`}
                      className="grid h-9 w-9 place-items-center rounded-none bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0 shadow-md"
                    >
                      <WhatsApp className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* All Cars CTA Button below the cards */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center text-center">
          <Reveal delay={120}>
            <Link
              href="/inventory"
              className="inline-flex items-center justify-center gap-2.5 rounded-none border-2 border-neutral-950 bg-neutral-950 px-8 sm:px-10 py-3.5 sm:py-4 font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-white shadow-md transition-all duration-300 hover:bg-amber-500 hover:border-amber-500 hover:text-neutral-950 hover:shadow-xl hover:-translate-y-0.5"
            >
              All Cars
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <p className="mt-3 text-xs text-neutral-500 uppercase tracking-wider">
            Explore complete 150+ inspected vehicle showroom catalog
          </p>
        </div>
      </div>
    </section>
  );
}
