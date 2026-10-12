"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../art/Logo";
import { Close, Menu, Phone, WhatsApp, SearchIcon, ArrowRight } from "../ui/Icons";
import { KARACHI_SHOWROOM, getWhatsAppUrl } from "@/lib/showroom";

const links = [
  { label: "Inventory", href: "/inventory" },
  { label: "Showroom", href: "/about" },
  { label: "Sell / Trade", href: "/sell-car" },
  { label: "Financing", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // Quick search filter states
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setOpen(false);
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (selectedBrand !== "all") params.set("brand", selectedBrand);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedPrice !== "all") params.set("maxPrice", selectedPrice);
    router.push(`/inventory?${params.toString()}`);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-neutral-900 focus:px-5 focus:py-3 focus:font-display focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-white"
      >
        Skip to content
      </a>

      {/* Top Utility Bar with Karachi Location & Hotline */}
      <div className="hidden border-b border-white/10 bg-black py-2 text-xs text-neutral-300 lg:block">
        <div className="shell flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Plot 167/C, Main Khalid Bin Waleed Road, P.E.C.H.S., Karachi
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400">Hours: Mon – Sat: 10:30 AM – 9:00 PM</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${KARACHI_SHOWROOM.phonePrimary}`}
              className="flex items-center gap-1.5 font-medium text-neutral-300 transition-colors hover:text-amber-400"
            >
              <Phone className="h-3 w-3 text-amber-400" />
              Hotline: {KARACHI_SHOWROOM.phoneDisplay}
            </a>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400">
              Landline: {KARACHI_SHOWROOM.landlineDisplay}
            </span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-[border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-neutral-200 shadow-[0_10px_30px_-22px_rgba(16,19,22,0.35)]"
            : "border-neutral-100"
        }`}
      >
        <div className="shell flex h-20 items-center justify-between gap-4 sm:gap-6">
          <Link href="/" aria-label="Merchants Luxury Motors Karachi" className="shrink-0">
            <Logo tone="dark" />
          </Link>

          {/* Clean, Non-Wrapping Desktop Navigation Links */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative whitespace-nowrap font-display text-sm font-semibold text-neutral-700 transition-colors duration-200 hover:text-black"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-amber-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Zone: Integrated Search Bar & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Navbar Integrated Search Widget */}
            <div ref={searchContainerRef} className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-expanded={searchOpen}
                aria-label="Search vehicle inventory"
                className={`flex items-center gap-1.5 sm:gap-2 rounded-none border px-2.5 py-2 sm:px-3.5 text-xs font-medium transition-all ${
                  searchOpen
                    ? "border-amber-500 bg-amber-50/50 text-neutral-900 shadow-xs"
                    : "border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-neutral-400 hover:bg-white"
                }`}
              >
                <SearchIcon className="h-3.5 w-3.5 text-neutral-500" />
                <span className="hidden md:inline">Search Fleet</span>
                <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[0.625rem] font-bold text-neutral-600">
                  150+
                </span>
              </button>

              {/* Mobile Dimmed Backdrop Overlay */}
              <div
                className={`fixed inset-0 z-40 bg-neutral-950/50 backdrop-blur-xs transition-opacity duration-200 sm:hidden ${
                  searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setSearchOpen(false)}
                aria-hidden="true"
              />

              {/* Expandable Search Filter Popover in Navbar - Perfectly Centered & Responsive on Mobile */}
              <div
                className={`fixed left-3 right-3 top-20 z-50 max-h-[85vh] overflow-y-auto sm:overflow-visible sm:max-h-none sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[420px] sm:max-w-[420px] rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-2xl transition-all duration-200 ease-out origin-top sm:origin-top-right transform ${
                  searchOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-2">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Search Showroom Inventory
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-neutral-400 hover:text-neutral-800 transition-colors p-1"
                    aria-label="Close search popover"
                  >
                    <Close className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleSearchSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search model (e.g. Land Cruiser, S580, Taycan)..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-3 pr-8 text-base sm:text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none"
                      autoFocus={searchOpen}
                    />
                    {keyword && (
                      <button
                        type="button"
                        onClick={() => setKeyword("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
                        aria-label="Clear keyword"
                      >
                        <Close className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[0.65rem] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Make
                      </label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-base sm:text-xs font-medium text-neutral-800 focus:border-amber-500 focus:outline-none"
                      >
                        <option value="all">All Brands</option>
                        <option value="toyota">Toyota</option>
                        <option value="mercedes-benz">Mercedes-Benz</option>
                        <option value="porsche">Porsche</option>
                        <option value="haval">Haval</option>
                        <option value="audi">Audi</option>
                        <option value="lexus">Lexus</option>
                        <option value="honda">Honda</option>
                        <option value="hyundai">Hyundai</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[0.65rem] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Body Style
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-base sm:text-xs font-medium text-neutral-800 focus:border-amber-500 focus:outline-none"
                      >
                        <option value="all">All Body Types</option>
                        <option value="suv">Luxury SUVs</option>
                        <option value="sedan">Executive Sedans</option>
                        <option value="crossover">Crossovers & Hybrids</option>
                        <option value="electric">Electric Vehicles</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[0.65rem] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Budget in PKR
                    </label>
                    <select
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      className="w-full rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-base sm:text-xs font-medium text-neutral-800 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="all">Any Price Range</option>
                      <option value="15000000">Up to ₨ 1.50 Crore</option>
                      <option value="50000000">Up to ₨ 5.00 Crore</option>
                      <option value="80000000">Up to ₨ 8.00 Crore</option>
                      <option value="150000000">Above ₨ 8.00 Crore</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-none bg-amber-500 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-neutral-950 shadow-sm transition-all hover:bg-amber-400 cursor-pointer"
                  >
                    <SearchIcon className="h-3.5 w-3.5" />
                    Search Available Cars
                  </button>
                </form>
              </div>
            </div>

            {/* Primary Action Button: View Cars - hidden on compact mobile to give breathing room */}
            <Link
              href="/inventory"
              className="hidden sm:inline-flex rounded-none bg-amber-500 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-neutral-950 shadow-sm transition-all hover:bg-amber-400 shrink-0"
            >
              View Cars
            </Link>

            {/* Mobile Menu Toggle Button with Smooth Icon Morph */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              className="relative grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-none border border-neutral-200 text-neutral-800 transition-all hover:bg-neutral-100 lg:hidden overflow-hidden"
            >
              <span
                className={`absolute transition-all duration-300 ease-out transform ${
                  open ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                }`}
              >
                <Menu className="h-5 w-5" />
              </span>
              <span
                className={`absolute transition-all duration-300 ease-out transform ${
                  open ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"
                }`}
              >
                <Close className="h-5 w-5" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Ultra-Smooth Backdrop and Glide Animation */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ease-in-out ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop blur overlay */}
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 cursor-default bg-neutral-950/60 backdrop-blur-sm"
        />

        {/* Sliding drawer panel */}
        <div
          className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-neutral-100 px-6">
            <Logo tone="dark" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-neutral-800 transition-colors hover:bg-neutral-100"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Mobile Search */}
          <div className="border-b border-neutral-100 px-6 py-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search 150+ cars..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-8 text-base sm:text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none"
              />
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
                  aria-label="Clear search"
                >
                  <Close className="h-3.5 w-3.5" />
                </button>
              )}
            </form>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-4">
            <ul className="flex flex-col gap-1">
              {links.map((link, idx) => (
                <li
                  key={link.href}
                  className={`transition-all duration-300 ease-out transform ${
                    open
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: open ? `${70 + idx * 35}ms` : "0ms",
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 font-display text-sm font-bold uppercase tracking-wider text-neutral-900 transition-colors hover:bg-neutral-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className={`mt-6 rounded-2xl border border-neutral-100 bg-neutral-50 p-4 text-xs text-neutral-600 transition-all duration-300 ease-out transform ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: open ? "280ms" : "0ms",
              }}
            >
              <p className="font-bold uppercase tracking-wider text-neutral-900">Showroom Address:</p>
              <p className="mt-1">{KARACHI_SHOWROOM.address}</p>
              <p className="mt-2 font-bold uppercase tracking-wider text-neutral-900">Phone:</p>
              <p className="mt-0.5">{KARACHI_SHOWROOM.phoneDisplay} / {KARACHI_SHOWROOM.landlineDisplay}</p>
            </div>
          </nav>

          <div
            className={`border-t border-neutral-100 p-6 space-y-3 transition-all duration-300 ease-out transform ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: open ? "320ms" : "0ms",
            }}
          >
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-none bg-emerald-600 px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-white shadow"
            >
              <WhatsApp className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <Link
              href="/inventory"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-none bg-amber-500 px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-neutral-950 hover:bg-amber-400"
            >
              Browse All Cars
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
