import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { KARACHI_SHOWROOM, getWhatsAppUrl } from "@/lib/showroom";
import { ShieldCheck, Check, WhatsApp, Phone, Pin, ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About Showroom | Merchants Luxury Motors Karachi",
  description:
    "Learn about Merchants Luxury Motors on Khalid Bin Waleed Road, Karachi. Over 18 years of trust in luxury automotive imports, verified CPLC documentation, and premium customer care.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-100 py-12 sm:py-16">
      <div className="shell">
        {/* Hero Banner */}
        <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-neutral-950 p-6 sm:p-14 text-white overflow-hidden relative text-center flex flex-col items-center">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="mt-1 font-display text-2xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
              18+ Years of Automotive Excellence in Karachi
            </h1>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed text-neutral-300">
              Established in 2008 on Main Khalid Bin Waleed Road, P.E.C.H.S., Merchants Luxury Motors
              has grown into Karachi&apos;s leading automotive dealership, specializing in Pakistan&apos;s
              most-selling sedans, family cars, Japanese imports, and premium SUVs.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={getWhatsAppUrl("Hello! I want to inquire about visiting your Khalid Bin Waleed showroom.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-none bg-emerald-500 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-black hover:bg-emerald-400 transition-colors w-full sm:w-auto"
              >
                <WhatsApp className="h-4 w-4" />
                Contact Sales Team
              </a>
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center gap-2 rounded-none border border-white/25 bg-white/10 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-colors w-full sm:w-auto"
              >
                View Available Fleet
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Showroom Metrics */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
          {KARACHI_SHOWROOM.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-3.5 sm:p-6 text-center shadow-sm"
            >
              <span className="font-display text-xl sm:text-3xl lg:text-4xl font-black text-amber-600 truncate block">
                {m.value}
              </span>
              <p className="mt-1 font-display text-[0.625rem] sm:text-xs font-bold uppercase tracking-wider text-neutral-500">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Showroom Story & Facilities */}
        <div className="mt-12 sm:mt-16 grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Our Karachi Facility
            </span>
            <h2 className="mt-1 sm:mt-2 font-display text-xl sm:text-2xl lg:text-3xl font-black uppercase text-neutral-900">
              Parsa City Luxuria, Khalid Bin Waleed Road
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-neutral-600">
              Khalid Bin Waleed Road has long been celebrated as the automotive heart of Karachi. Within
              this thriving hub, our multi-level showroom at Parsa City Luxuria provides a climate-controlled,
              secure environment where over 150 luxury vehicles are curated and presented with white-glove care.
            </p>

            <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3 text-xs text-neutral-700">
              <div className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Private executive VIP lounges for confidential financial discussions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>On-site Sindh Excise biometric verification desk for immediate transfers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Dedicated PDI (Pre-Delivery Inspection) bay equipped with OBD2 diagnostic scanners</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Secure indoor parking and valet services for visiting clients</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4 grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-950">
              <Image
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop"
                alt="Showroom display floor"
                fill
                sizes="(max-width: 640px) 50vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-950">
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop"
                alt="VIP customer lounge"
                fill
                sizes="(max-width: 640px) 50vw, 300px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Video Tour Section */}
        <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-4 sm:p-10 shadow-sm">
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                Virtual Tour
              </span>
              <h3 className="mt-1 font-display text-lg sm:text-xl font-bold uppercase text-neutral-900">
                Experience the Showroom from Anywhere
              </h3>
            </div>
            <a
              href={`tel:${KARACHI_SHOWROOM.phonePrimary}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-amber-600"
            >
              <Phone className="h-4 w-4 text-amber-600" />
              Call Reception: {KARACHI_SHOWROOM.phoneDisplay}
            </a>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black">
            <video
              src="/videos/hero-showroom.mp4"
              controls
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Legal & CPLC Assurance */}
        <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-emerald-950/10 p-5 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 text-emerald-800">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-emerald-600" />
                <span className="font-display text-xs font-bold uppercase tracking-wider">
                  The Merchants Peace of Mind
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-black uppercase text-neutral-900">
                100% CPLC & Sindh Police Cleared
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-600">
                Every vehicle offered on our showroom floor has undergone direct verification with the
                Car Protection and Liaison Committee (CPLC) and Sindh Excise and Taxation. We provide
                written legal indemnities and original documentation with every single transaction.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-none bg-neutral-950 px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 hover:text-black transition-colors w-full sm:w-auto"
            >
              Schedule a Visit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
