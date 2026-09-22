"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cars, type Car } from "@/lib/cars";
import { KARACHI_SHOWROOM, formatPkr, calculateMonthlyEmi, getWhatsAppUrl } from "@/lib/showroom";
import {
  ShieldCheck,
  Check,
  WhatsApp,
  Phone,
  ArrowRight,
  Gauge,
  Fuel,
  Close,
  Play,
  ArrowUpRight,
} from "@/components/ui/Icons";

export default function CarDetailClient({
  car,
  relatedCars,
}: {
  car: Car;
  relatedCars: Car[];
}) {
  const [activeMediaTab, setActiveMediaTab] = useState<"exterior" | "interior" | "video">("exterior");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // EMI Calculator state
  const [downPercent, setDownPercent] = useState(30);
  const [tenureYears, setTenureYears] = useState(3);
  const monthlyEmi = calculateMonthlyEmi(car.pricePkr, downPercent, tenureYears, 13.5);

  // Appointment Modal
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const currentGallery = activeMediaTab === "interior" ? car.interiorImages : car.exteriorImages;
  const currentImage = currentGallery[selectedImageIndex] || car.heroImage;

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentSubmitted(true);
  };

  return (
    <div className="shell">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href="/inventory" className="hover:text-black">Inventory</Link>
        <span>/</span>
        <span className="font-semibold text-neutral-900 truncate">{car.name}</span>
      </nav>

      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
              {car.condition}
            </span>
            <span className="rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              100% CPLC Cleared
            </span>
            <span className="text-xs font-medium text-neutral-500">
              Stock ID: MLM-{car.slug.substring(0, 6).toUpperCase()}
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-black uppercase text-neutral-900 sm:text-4xl lg:text-5xl">
            {car.name}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-3xl">
            {car.summary}
          </p>
        </div>

        {/* Pricing & Quick Action Box */}
        <div className="flex flex-col items-start lg:items-end shrink-0 w-full lg:w-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Karachi Showroom Price
          </span>
          <span className="font-display text-2xl font-black text-amber-600 sm:text-4xl">
            {car.priceFormatted}
          </span>
          <span className="text-xs text-neutral-500 mt-0.5">
            Est. Installment: <strong>{formatPkr(monthlyEmi)}/mo</strong>
          </span>

          <div className="mt-4 flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <a
              href={getWhatsAppUrl(`Hi Merchants Luxury Motors! I am inquiring about the ${car.name} (${car.priceFormatted}) on display at your Khalid Bin Waleed showroom.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-emerald-500 transition-colors w-full sm:w-auto"
            >
              <WhatsApp className="h-4 w-4" />
              WhatsApp Inquiry
            </a>

            <button
              type="button"
              onClick={() => setAppointmentOpen(true)}
              className="rounded-full bg-neutral-900 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 hover:text-black transition-colors w-full sm:w-auto text-center"
            >
              Book Private Viewing
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Gallery on Left, Details & EMI on Right */}
      <div className="grid gap-8 lg:gap-10 lg:grid-cols-12">
        {/* Left Column: Media Suite & Specs (8 Cols) */}
        <div className="space-y-8 lg:col-span-8">
          {/* Media Suite Card */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-3.5 sm:p-6 shadow-sm">
            {/* Media Tabs Switcher */}
            <div className="mb-4 flex items-center justify-between gap-2 border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMediaTab("exterior");
                    setSelectedImageIndex(0);
                  }}
                  className={`shrink-0 rounded-full px-3.5 sm:px-4 py-2 font-display text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMediaTab === "exterior"
                      ? "bg-neutral-900 text-white shadow"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  Exterior ({car.exteriorImages.length})
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveMediaTab("interior");
                    setSelectedImageIndex(0);
                  }}
                  className={`shrink-0 rounded-full px-3.5 sm:px-4 py-2 font-display text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMediaTab === "interior"
                      ? "bg-neutral-900 text-white shadow"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  Interior ({car.interiorImages.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMediaTab("video")}
                  className={`shrink-0 rounded-full px-3.5 sm:px-4 py-2 font-display text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 ${
                    activeMediaTab === "video"
                      ? "bg-amber-500 text-black shadow"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Video Walkaround
                </button>
              </div>

              {activeMediaTab !== "video" && (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="hidden md:inline-flex shrink-0 text-xs font-bold uppercase tracking-wider text-amber-700 hover:underline"
                >
                  Fullscreen
                </button>
              )}
            </div>

            {/* Media Viewer Area */}
            {activeMediaTab === "video" ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-inner">
                <video
                  src={car.videoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  onClick={() => setLightboxOpen(true)}
                  className="group relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-neutral-950 shadow-inner"
                >
                  <Image
                    src={currentImage}
                    alt={`${car.name} ${activeMediaTab} angle`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-4 right-4 rounded-full bg-black/75 px-3 py-1.5 text-xs font-bold uppercase text-white backdrop-blur">
                    Click to Enlarge
                  </span>
                </div>

                {/* Thumbnails Row */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {currentGallery.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImageIndex(i)}
                      className={`relative h-16 w-24 sm:h-20 sm:w-32 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                        selectedImageIndex === i
                          ? "border-amber-500 shadow-md scale-95"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 96px, 128px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pakistani Documentation & Verification Panel */}
          <div className="rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-emerald-950/10 p-4 sm:p-8">
            <div className="flex items-center gap-2 sm:gap-2.5 text-emerald-800">
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-emerald-600" />
              <h2 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight">
                Authenticity & Legal Verification Record
              </h2>
            </div>

            <dl className="mt-5 sm:mt-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 text-xs">
              <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 border border-emerald-100">
                <dt className="font-bold uppercase tracking-wider text-neutral-400 text-[0.625rem] sm:text-xs">CPLC Clearance</dt>
                <dd className="mt-1 font-bold text-emerald-700 text-xs sm:text-sm">{car.cplcStatus}</dd>
                <p className="mt-0.5 text-[0.625rem] sm:text-[0.6875rem] text-neutral-500">Physical certificate verified</p>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 border border-emerald-100">
                <dt className="font-bold uppercase tracking-wider text-neutral-400 text-[0.625rem] sm:text-xs">Sindh Excise Biometric</dt>
                <dd className="mt-1 font-bold text-neutral-900 text-xs sm:text-sm">{car.registration}</dd>
                <p className="mt-0.5 text-[0.625rem] sm:text-[0.6875rem] text-neutral-500">On-spot transfer ready</p>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 border border-emerald-100">
                <dt className="font-bold uppercase tracking-wider text-neutral-400 text-[0.625rem] sm:text-xs">Auction / Import Grade</dt>
                <dd className="mt-1 font-bold text-neutral-900 text-xs sm:text-sm">{car.auctionGrade}</dd>
                <p className="mt-0.5 text-[0.625rem] sm:text-[0.6875rem] text-neutral-500">Verifiable sheet online</p>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 border border-emerald-100">
                <dt className="font-bold uppercase tracking-wider text-neutral-400 text-[0.625rem] sm:text-xs">Mileage Verification</dt>
                <dd className="mt-1 font-bold text-neutral-900 text-xs sm:text-sm">{car.mileage}</dd>
                <p className="mt-0.5 text-[0.625rem] sm:text-[0.6875rem] text-neutral-500">Guaranteed authentic</p>
              </div>
            </dl>
          </div>

          {/* Full Technical Specifications Grid */}
          <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-4 sm:p-8 shadow-sm">
            <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-neutral-900">
              Technical Specifications
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Factory performance, drivetrain, and dimension ratings
            </p>

            <dl className="mt-5 sm:mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2 text-sm border-t border-neutral-100 pt-4 sm:pt-6">
              {[
                { label: "Engine / Powertrain", value: car.specs.engine },
                { label: "Peak Horsepower", value: car.specs.power },
                { label: "Peak Torque", value: car.specs.torque },
                { label: "Transmission", value: car.specs.transmission },
                { label: "Drivetrain", value: car.specs.drivetrain },
                { label: "0–100 km/h Sprint", value: car.specs.sprint },
                { label: "Top Speed", value: car.specs.topSpeed },
                { label: "Fuel Economy", value: car.specs.fuelEconomy },
                { label: "Range / Tank", value: car.specs.range },
                { label: "Seating Capacity", value: `${car.specs.seats} Passengers` },
                { label: "Kerb Weight", value: car.specs.weight },
                { label: "Charging / Alternator", value: car.specs.charge },
              ].map((spec) => (
                <div key={spec.label} className="flex flex-col xs:flex-row xs:items-baseline xs:justify-between border-b border-neutral-100 py-2.5 sm:py-3 gap-0.5 xs:gap-2">
                  <dt className="text-[0.6875rem] sm:text-xs font-bold uppercase tracking-wider text-neutral-500">
                    {spec.label}
                  </dt>
                  <dd className="font-bold text-neutral-900 text-left xs:text-right text-xs sm:text-sm">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Key Features Breakdown */}
          <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-4 sm:p-8 shadow-sm">
            <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-neutral-900">
              Key Features & Equipment
            </h2>

            <div className="mt-5 sm:mt-6 space-y-5 sm:space-y-6">
              {car.keyFeatures.map((group) => (
                <div key={group.category} className="border-t border-neutral-100 pt-4 sm:pt-5">
                  <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-700">
                    {group.category}
                  </h3>
                  <ul className="mt-2.5 sm:mt-3 grid gap-2 sm:grid-cols-2 text-xs text-neutral-700">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Financing Calculator & Showroom Contact (4 Cols) */}
        <div className="space-y-6 sm:space-y-8 lg:col-span-4">
          {/* Interactive Financing Calculator */}
          <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-4 sm:p-7 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Bank Financing Calculator
            </span>
            <h3 className="mt-1 font-display text-base sm:text-lg font-bold uppercase text-neutral-900">
              Plan Your Installments
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Partnerships with Meezan Car Ijarah and Bank Alfalah
            </p>

            <div className="mt-5 sm:mt-6 space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold text-neutral-700">
                  <span>Down Payment ({downPercent}%)</span>
                  <span>{formatPkr(car.pricePkr * (downPercent / 100))}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  step="5"
                  value={downPercent}
                  onChange={(e) => setDownPercent(Number(e.target.value))}
                  className="mt-2 w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-neutral-700">
                  <span>Loan Tenure</span>
                  <span>{tenureYears} Years ({tenureYears * 12} Mo)</span>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 5].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTenureYears(yr)}
                      className={`rounded-lg sm:rounded-xl py-2 font-bold uppercase text-xs ${
                        tenureYears === yr
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {yr}Y
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-neutral-50 p-3.5 sm:p-4 border border-neutral-100 text-center">
                <span className="block text-[0.6875rem] font-bold uppercase text-neutral-500">
                  Estimated Monthly EMI
                </span>
                <span className="mt-1 block font-display text-xl sm:text-2xl font-black text-neutral-900">
                  ₨ {monthlyEmi.toLocaleString("en-PK")}
                </span>
                <span className="text-[0.625rem] text-neutral-400">
                  Calculated at 13.5% indicative KIBOR spread
                </span>
              </div>

              <a
                href={getWhatsAppUrl(`Hi! I want to calculate bank financing options for the ${car.name} with ${downPercent}% down payment for ${tenureYears} years.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 hover:text-black transition-colors"
              >
                Inquire Bank Financing
              </a>
            </div>
          </div>

          {/* Visit Showroom Card */}
          <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-neutral-900 p-4 sm:p-7 text-white">
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              Inspection & Viewing
            </span>
            <h3 className="mt-1 font-display text-base sm:text-lg font-bold uppercase text-white">
              Visit Khalid Bin Waleed Showroom
            </h3>
            <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
              This vehicle is parked on our 1st floor display gallery. Walk in for a private inspection
              or test drive.
            </p>

            <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-xs text-neutral-300 border-t border-neutral-800 pt-3.5 sm:pt-4">
              <p className="font-medium text-white">{KARACHI_SHOWROOM.address}</p>
              <p>{KARACHI_SHOWROOM.timings.weekdays}</p>
              <p>Hotline: {KARACHI_SHOWROOM.phoneDisplay}</p>
            </div>

            <div className="mt-5 sm:mt-6 space-y-2">
              <button
                type="button"
                onClick={() => setAppointmentOpen(true)}
                className="w-full rounded-full bg-amber-500 py-3 font-display text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
              >
                Schedule VIP Appointment
              </button>

              <a
                href={`tel:${KARACHI_SHOWROOM.phonePrimary}`}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-700 py-3 font-display text-xs font-bold uppercase tracking-wider text-neutral-300 hover:bg-neutral-800 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call Showroom
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Showroom Inventory */}
      <div className="mt-12 sm:mt-20 border-t border-neutral-200 pt-10 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Similar Stock</span>
            <h2 className="mt-1 font-display text-xl sm:text-2xl font-black uppercase text-neutral-900">
              Other Vehicles at Karachi Showroom
            </h2>
          </div>
          <Link
            href="/inventory"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-800 hover:underline"
          >
            View All ({cars.length})
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {relatedCars.map((item) => (
            <Link
              key={item.slug}
              href={`/inventory/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative aspect-[16/10] w-full bg-neutral-950">
                <Image
                  src={item.heroImage}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5">
                <span className="text-[0.625rem] font-bold uppercase text-amber-700">
                  {item.brand} • {item.year}
                </span>
                <h3 className="font-display text-base font-bold uppercase text-neutral-900 group-hover:text-amber-600 transition-colors mt-0.5">
                  {item.name}
                </h3>
                <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
                  <span className="font-display text-base sm:text-lg font-black text-neutral-900">
                    {item.priceFormatted}
                  </span>
                  <span className="text-xs font-bold uppercase text-neutral-500 group-hover:text-black">
                    Details &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-3 sm:p-4">
          <button
            type="button"
            aria-label="Close Lightbox"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <Close className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="relative max-h-[85vh] max-w-5xl w-full aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl">
            <Image
              src={currentImage}
              alt={`${car.name} fullscreen view`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Private Viewing Appointment Modal */}
      {appointmentOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          <button
            type="button"
            aria-label="Close modal"
            onClick={() => setAppointmentOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="relative z-10 w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-display text-base font-bold uppercase text-neutral-900">
                Book Private Viewing
              </h3>
              <button
                type="button"
                onClick={() => setAppointmentOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-neutral-400 hover:bg-neutral-100"
              >
                <Close className="h-4 w-4" />
              </button>
            </div>

            {appointmentSubmitted ? (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="mt-4 font-display text-lg font-bold uppercase text-neutral-900">
                  Viewing Confirmed!
                </h4>
                <p className="mt-2 text-xs text-neutral-600">
                  We will contact {userName} at {userPhone} shortly to arrange your visit for the{" "}
                  {car.name}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAppointmentSubmitted(false);
                    setAppointmentOpen(false);
                  }}
                  className="mt-6 rounded-full bg-neutral-900 px-6 py-2.5 font-display text-xs font-bold uppercase text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleAppointmentSubmit} className="mt-4 space-y-3.5 sm:space-y-4 text-xs">
                <div>
                  <span className="text-neutral-500 font-medium">Selected Car:</span>
                  <p className="font-bold text-neutral-900 text-sm">{car.name} ({car.priceFormatted})</p>
                </div>

                <div>
                  <label className="block font-bold uppercase text-neutral-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mansoor"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-neutral-700">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="rounded-xl bg-neutral-50 p-3 text-neutral-600">
                  <p className="font-bold text-neutral-900">Showroom Address:</p>
                  <p className="mt-0.5">{KARACHI_SHOWROOM.address}</p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-neutral-900 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 hover:text-black transition-colors"
                >
                  Confirm Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
