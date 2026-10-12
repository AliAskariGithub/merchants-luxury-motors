"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cars } from "@/lib/cars";
import { getWhatsAppUrl } from "@/lib/showroom";
import {
  ArrowUpRight,
  Gauge,
  Fuel,
  ShieldCheck,
  SearchIcon,
  WhatsApp,
  Close,
} from "@/components/ui/Icons";

const BRANDS = ["All", "Toyota", "Honda", "Suzuki", "Kia", "Hyundai", "Changan"];
const CATEGORIES = ["All", "Executive Sedan", "Sport Sedan", "Compact Sedan", "Economy Hatchback", "Hot Hatchback", "Compact SUV", "Crossover SUV", "Luxury SUV"];
const FUELS = ["All", "Petrol", "Diesel", "Hybrid"];

function InventoryContent() {
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get("brand") || "All";
  const initialCategory = searchParams.get("category") || "All";
  const initialMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 0;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [sortBy, setSortBy] = useState<"price-desc" | "price-asc" | "year-desc">("price-desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = car.name.toLowerCase().includes(q);
          const matchBrand = car.brand.toLowerCase().includes(q);
          const matchCategory = car.category.toLowerCase().includes(q);
          const matchSummary = car.summary.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCategory && !matchSummary) return false;
        }

        // Brand
        if (selectedBrand !== "All" && selectedBrand.toLowerCase() !== "all") {
          if (car.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
        }

        // Category
        if (selectedCategory !== "All" && selectedCategory.toLowerCase() !== "all") {
          if (!car.category.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
        }

        // Fuel
        if (selectedFuel !== "All") {
          const fuel = car.specs.engine.toLowerCase() + car.specs.charge.toLowerCase();
          if (selectedFuel === "Hybrid" && !fuel.includes("hybrid")) return false;
          if (selectedFuel === "Diesel" && !fuel.includes("diesel")) return false;
          if (selectedFuel === "Petrol" && !fuel.includes("petrol") && !fuel.includes("vvt") && !fuel.includes("vtec")) return false;
        }

        // Max price
        if (maxPrice > 0 && car.pricePkr > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-desc") return b.pricePkr - a.pricePkr;
        if (sortBy === "price-asc") return a.pricePkr - b.pricePkr;
        if (sortBy === "year-desc") return b.year - a.year;
        return 0;
      });
  }, [searchQuery, selectedBrand, selectedCategory, selectedFuel, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedBrand("All");
    setSelectedCategory("All");
    setSelectedFuel("All");
    setMaxPrice(0);
    setSortBy("price-desc");
  };

  return (
    <div className="shell">
      {/* Centered Header */}
      <div className="mb-10 text-center">
        <h1 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-black uppercase tracking-tight text-neutral-900">
          Available Vehicles
        </h1>
        <p className="mt-2.5 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-neutral-600">
          Explore Pakistan&apos;s most-selling cars including Toyota Corolla, Honda Civic, Suzuki Alto, and leading brand sedans and SUVs currently on display at our Khalid Bin Waleed Road showroom in Karachi.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="mb-8 rounded-none border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm">
        {/* Search and Brand Bar */}
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-center">
          <div className="relative sm:col-span-2 lg:col-span-5">
            <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search Corolla, Civic, Alto, Swift, Sportage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-none border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-10 text-base sm:text-sm focus:border-amber-500 focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                aria-label="Clear search"
              >
                <Close className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="sm:col-span-1 lg:col-span-4">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full rounded-none border border-neutral-200 bg-neutral-50 py-3 px-4 text-base sm:text-sm font-medium focus:border-amber-500 focus:outline-none"
            >
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b === "All" ? "All Brands (Toyota, Honda, Suzuki...)" : b}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-1 lg:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full rounded-none border border-neutral-200 bg-neutral-50 py-3 px-4 text-base sm:text-sm font-medium focus:border-amber-500 focus:outline-none"
            >
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="year-desc">Model Year: Newest</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Row */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-neutral-100 pt-4 text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 w-full sm:w-auto">
            <span className="shrink-0 font-bold uppercase tracking-wider text-neutral-500 text-[0.6875rem] sm:text-xs">Quick Filters:</span>
            {[
              { label: "All", active: selectedCategory === "All" && selectedFuel === "All" },
              { label: "Sedans", active: selectedCategory === "Sedan" },
              { label: "SUVs", active: selectedCategory === "SUV" },
              { label: "Hatchbacks", active: selectedCategory === "Hatchback" },
            ].map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => {
                  if (pill.label === "Sedans") {
                    setSelectedCategory("Sedan");
                    setSelectedFuel("All");
                  } else if (pill.label === "SUVs") {
                    setSelectedCategory("SUV");
                    setSelectedFuel("All");
                  } else if (pill.label === "Hatchbacks") {
                    setSelectedCategory("Hatchback");
                    setSelectedFuel("All");
                  } else {
                    resetFilters();
                  }
                }}
                className={`shrink-0 rounded-none border px-3.5 py-1.5 font-medium transition-all text-xs ${
                  pill.active
                    ? "border-neutral-900 bg-neutral-900 text-white shadow-xs"
                    : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-black hover:bg-neutral-100"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <span className="font-semibold text-neutral-500 text-xs">
              Showing <span className="font-bold text-neutral-900">{filteredCars.length}</span> of {cars.length}
            </span>

            {(searchQuery || selectedBrand !== "All" || selectedFuel !== "All" || selectedCategory !== "All" || maxPrice > 0) && (
              <button
                type="button"
                onClick={resetFilters}
                className="font-bold text-amber-700 hover:underline text-xs"
              >
                Clear Filters
              </button>
            )}

            <div className="hidden sm:flex rounded-none border border-neutral-200 bg-neutral-50 p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`rounded-none px-2.5 py-1 text-xs font-bold uppercase ${
                  viewMode === "grid" ? "bg-white shadow text-neutral-900" : "text-neutral-500"
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`rounded-none px-2.5 py-1 text-xs font-bold uppercase ${
                  viewMode === "list" ? "bg-white shadow text-neutral-900" : "text-neutral-500"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Display */}
      {filteredCars.length === 0 ? (
        <div className="rounded-none border border-neutral-200 bg-white p-16 text-center shadow-sm">
          <h3 className="font-display text-xl font-bold uppercase text-neutral-900">
            No Vehicles Match Your Current Filters
          </h3>
          <p className="mt-2 text-sm text-neutral-500">
            We constantly acquire new stock on Khalid Bin Waleed Road. Inquire directly or reset your filters.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-none bg-neutral-900 px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white"
            >
              Reset Filters
            </button>
            <a
              href={getWhatsAppUrl("Hi! I am looking for a specific car that wasn't in your online inventory list.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-none bg-emerald-600 px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white"
            >
              <WhatsApp className="h-4 w-4" /> WhatsApp Us Your Request
            </a>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <div
              key={car.slug}
              className="group flex flex-col overflow-hidden rounded-none border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                <Image
                  src={car.heroImage}
                  alt={car.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute left-4 top-4 z-10">
                  <span className="inline-flex items-center gap-1 rounded-none bg-black/75 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-amber-300 backdrop-blur border border-amber-500/30">
                    {car.condition}
                  </span>
                </div>

                <div className="absolute right-4 top-4 z-10">
                  <span className="inline-flex items-center gap-1 rounded-none bg-emerald-950/80 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur border border-emerald-500/30">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    CPLC Clear
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white">
                  <span className="font-display text-xs font-semibold uppercase text-neutral-300">
                    {car.brand} • {car.year}
                  </span>
                  <span className="text-xs text-neutral-300">{car.mileage}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h3 className="font-display text-base sm:text-lg font-black uppercase text-neutral-900 group-hover:text-amber-600 transition-colors">
                  {car.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-500 line-clamp-2">{car.summary}</p>

                {/* Specs */}
                <div className="my-3.5 sm:my-5 grid grid-cols-2 gap-1.5 sm:gap-2 rounded-none bg-neutral-50 p-2.5 sm:p-3 text-[0.7rem] sm:text-xs border border-neutral-100">
                  <div className="flex items-center gap-1.5 text-neutral-700 truncate">
                    <Gauge className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{car.specs.power}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-700 truncate">
                    <Fuel className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{car.specs.transmission}</span>
                  </div>
                </div>

                {/* Price and Buttons */}
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-100 pt-3.5 sm:pt-4">
                  <div className="min-w-0">
                    <span className="block text-[0.6rem] sm:text-[0.625rem] font-bold uppercase tracking-wider text-neutral-400 truncate">
                      Showroom Price
                    </span>
                    <span className="font-display text-base sm:text-lg lg:text-xl font-black text-neutral-900 truncate block">
                      {car.priceFormatted}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <a
                      href={getWhatsAppUrl(`Hi! I'm interested in the ${car.name} (${car.priceFormatted}) listed in your online inventory.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-none border border-emerald-500/40 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm shrink-0"
                      aria-label="Inquire on WhatsApp"
                    >
                      <WhatsApp className="h-4 w-4" />
                    </a>

                    <Link
                      href={`/inventory/${car.slug}`}
                      className="inline-flex items-center gap-1 rounded-none bg-neutral-900 px-3 sm:px-4 py-2 sm:py-2.5 font-display text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 hover:text-black transition-colors shrink-0"
                    >
                      Details
                      <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredCars.map((car) => (
            <div
              key={car.slug}
              className="group flex flex-col sm:flex-row overflow-hidden rounded-none border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] sm:w-72 shrink-0 bg-neutral-950">
                <Image
                  src={car.heroImage}
                  alt={car.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 288px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <span className="text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-amber-700">
                      {car.brand} • {car.year} • {car.condition}
                    </span>
                    <h3 className="mt-1 font-display text-lg sm:text-xl font-black uppercase text-neutral-900">
                      {car.name}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="block text-[0.6rem] sm:text-[0.625rem] font-bold uppercase text-neutral-400">Price</span>
                    <span className="font-display text-xl sm:text-2xl font-black text-neutral-900">
                      {car.priceFormatted}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-xs text-neutral-600 line-clamp-2">{car.summary}</p>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-neutral-100 pt-3.5 sm:pt-4 text-xs">
                  <div className="flex flex-wrap gap-2.5 sm:gap-4 text-neutral-600 text-[0.75rem] sm:text-xs">
                    <span>Power: <strong>{car.specs.power}</strong></span>
                    <span>Transmission: <strong>{car.specs.transmission}</strong></span>
                    <span>Registration: <strong>{car.registration}</strong></span>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-start sm:justify-end">
                    <a
                      href={getWhatsAppUrl(`Hi! I'd like details on the ${car.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-none border border-emerald-500/40 bg-emerald-50 px-3.5 sm:px-4 py-2 font-display text-[0.7rem] sm:text-xs font-bold uppercase text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors shrink-0"
                    >
                      <WhatsApp className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                    <Link
                      href={`/inventory/${car.slug}`}
                      className="rounded-none bg-neutral-900 px-4 sm:px-5 py-2 font-display text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 hover:text-black transition-colors shrink-0"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InventoryClient() {
  return (
    <Suspense fallback={<div className="shell text-center py-20 text-neutral-500">Loading showroom inventory...</div>}>
      <InventoryContent />
    </Suspense>
  );
}
