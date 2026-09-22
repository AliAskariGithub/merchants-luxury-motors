import type { Metadata } from "next";
import Link from "next/link";
import { KARACHI_SHOWROOM, getWhatsAppUrl } from "@/lib/showroom";
import { ShieldCheck, Check, WhatsApp, Phone, ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Services & Financing | Merchants Luxury Motors Karachi",
  description:
    "Explore our complete automotive services in Karachi: Islamic & conventional auto financing, vehicle exchange/trade-in, Sindh Excise biometric transfers, and Japanese auction sheet verifications.",
};

const SERVICES_LIST = [
  {
    id: "financing",
    title: "Meezan & Alfalah Auto Financing",
    subtitle: "Riba-Free Islamic Ijarah & Conventional Loans",
    description:
      "Official corporate financing desk with Meezan Bank Car Ijarah, Bank Alfalah, and Faysal Islamic. Fast-track approvals within 3 to 5 working days with competitive KIBOR spreads and customized down-payment schedules.",
    badge: "Fast-Track Approval",
    features: [
      "Up to 80% financing of vehicle invoice value",
      "Lowest Takaful and insurance rates in Karachi",
      "Flexible tenure options from 1 to 5 years",
      "Doorstep documentation pickup across Karachi",
    ],
  },
  {
    id: "exchange",
    title: "Vehicle Exchange & Trade-In",
    subtitle: "Upgrade to a Land Cruiser, S-Class or Hybrid",
    description:
      "Trade in your current car against any vehicle in our showroom. We evaluate your vehicle at fair market value and deduct it directly from your purchase, allowing seamless upgrade without waiting to sell first.",
    badge: "Instant Adjustment",
    features: [
      "Transparent 150-point valuation on the spot",
      "Same-day settlement of difference amount",
      "We accept local assemblies & Japanese imports",
      "Complete paperwork handled by our legal desk",
    ],
  },
  {
    id: "biometric",
    title: "Sindh Excise Biometric & Transfer",
    subtitle: "Government of Sindh Approved On-Site Desk",
    description:
      "Avoid long queues and delays at the Civic Center. Our showroom is equipped with biometric verification hardware for instant legal ownership transfer under Sindh Excise and Taxation laws.",
    badge: "On-Spot Biometric",
    features: [
      "Direct verification with NADRA biometric database",
      "Issuance of original computerized Smart Card",
      "Clearance of all token tax and motor vehicle cess",
      "Official transfer receipt provided on the same day",
    ],
  },
  {
    id: "auction-sheet",
    title: "Japanese Auction Sheet Verification",
    subtitle: "100% Genuine Odometer & History Guarantee",
    description:
      "Before purchasing any imported Japanese vehicle in Karachi, verify its authentic condition report. We provide verified digital auction sheets directly from USS, TAA, CAA, and ARAI auction houses.",
    badge: "100% Verifiable",
    features: [
      "Accurate grade (4.5 / 5A / S) translation",
      "Verification of authentic export odometer reading",
      "Confirmation of accident or flood damage history",
      "Chassis number tracking directly on Japanese portals",
    ],
  },
  {
    id: "detailing",
    title: "Ceramic Coating & Detailing Studio",
    subtitle: "Engineered for Harsh Karachi Coastal Climate",
    description:
      "Protect your luxury vehicle against Karachi's salty sea air, high humidity, and intense UV sun rays. Our detailing bay applies international grade 9H ceramic coatings and paint protection film (PPF).",
    badge: "Coastal Protection",
    features: [
      "9H multi-layer nano-ceramic paint shield",
      "Underbody rust-proofing bitumen underseal",
      "Interior leather nourishing and antimicrobial coating",
      "Self-healing TPU front-end Paint Protection Film",
    ],
  },
  {
    id: "nationwide-delivery",
    title: "Insured Nationwide Delivery",
    subtitle: "Doorstep Carrier Service Across Pakistan",
    description:
      "Purchasing from Lahore, Islamabad, Peshawar, or Quetta? We arrange closed-container, fully insured vehicle transport right to your doorstep with real-time GPS tracking.",
    badge: "Doorstep Delivery",
    features: [
      "Dedicated enclosed flatbed car carriers",
      "Comprehensive in-transit marine transit insurance",
      "Pre-dispatch 4K video inspection and report",
      "Full documentation dispatched via secure courier",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-neutral-100 py-12 sm:py-16">
      <div className="shell">
        {/* Banner */}
        <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-neutral-950 p-6 sm:p-14 text-white">
          <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            Showroom Services & Financing
          </span>
          <h1 className="mt-3 font-display text-2xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Comprehensive Dealership Care
          </h1>
          <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base leading-relaxed text-neutral-300">
            From Meezan Bank Islamic Car Ijarah to on-site Sindh Excise biometric transfers and
            nationwide delivery, Merchants Luxury Motors provides complete, transparent automotive
            solutions under one roof.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES_LIST.map((svc) => (
            <div
              key={svc.id}
              className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-5 sm:p-8 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-amber-100 px-3 py-1 font-display text-[0.625rem] font-bold uppercase tracking-wider text-amber-900">
                    {svc.badge}
                  </span>
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>

                <h3 className="mt-4 sm:mt-5 font-display text-lg sm:text-xl font-bold uppercase text-neutral-900">
                  {svc.title}
                </h3>
                <p className="text-xs font-semibold text-amber-700 mt-1">{svc.subtitle}</p>

                <p className="mt-2.5 sm:mt-3 text-xs leading-relaxed text-neutral-600">{svc.description}</p>

                <ul className="mt-4 sm:mt-5 space-y-2 border-t border-neutral-100 pt-3.5 sm:pt-4 text-xs text-neutral-700">
                  {svc.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 sm:mt-8 border-t border-neutral-100 pt-4">
                <a
                  href={getWhatsAppUrl(`Hi! I would like to inquire about your ${svc.title} service at your Karachi showroom.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-amber-600 transition-colors"
                >
                  <WhatsApp className="h-4 w-4 text-emerald-600" />
                  Inquire This Service &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bank Financing Comparison Box */}
        <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-5 sm:p-10 shadow-sm">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-neutral-100 pb-5 sm:pb-6">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                Authorized Banking Desk
              </span>
              <h2 className="mt-1 sm:mt-2 font-display text-xl sm:text-2xl font-black uppercase text-neutral-900">
                Partner Financial Institutions
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Our in-house finance officers manage the application directly with senior bank managers.
              </p>
            </div>

            <a
              href={getWhatsAppUrl("Hi! I would like a quote for car financing with Meezan Bank / Bank Alfalah.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 hover:text-black transition-colors w-full sm:w-auto"
            >
              Get Bank Financing Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {KARACHI_SHOWROOM.bankingPartners.map((bp) => (
              <div key={bp.name} className="rounded-xl sm:rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xs sm:text-sm font-bold uppercase text-neutral-900">{bp.name}</h4>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[0.625rem] font-bold uppercase text-emerald-800">
                    {bp.type}
                  </span>
                </div>
                <div className="mt-3 text-xs text-neutral-600 space-y-1">
                  <p><strong>Rate:</strong> {bp.rate}</p>
                  <p><strong>Tenure:</strong> {bp.tenure}</p>
                  <p><strong>Processing:</strong> {bp.processingTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
