import Link from "next/link";
import Logo from "../art/Logo";
import Reveal from "../ui/Reveal";
import { Pin, Phone, Mail, WhatsApp, ShieldCheck } from "../ui/Icons";
import { KARACHI_SHOWROOM, getWhatsAppUrl } from "@/lib/showroom";

const quickLinks = [
  { label: "Showroom Inventory", href: "/inventory" },
  { label: "About Dealership", href: "/about" },
  { label: "Sell / Consign Car", href: "/sell-car" },
  { label: "Bank Financing & EMI", href: "/services" },
  { label: "Showroom Location & Contact", href: "/contact" },
];

const popularVehicles = [
  { label: "Toyota Corolla Altis Grande 1.8", href: "/inventory/toyota-corolla-altis-grande" },
  { label: "Honda Civic RS 1.5L Turbo", href: "/inventory/honda-civic-rs-turbo" },
  { label: "Honda City 1.5L Aspire CVT", href: "/inventory/honda-city-aspire" },
  { label: "Suzuki Alto 660cc VXL AGS", href: "/inventory/suzuki-alto-vxl" },
  { label: "Toyota Yaris ATIV X 1.5L", href: "/inventory/toyota-yaris-ativ-x" },
  { label: "Kia Sportage 2.0L AWD", href: "/inventory/kia-sportage-awd" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-300">
      <div className="shell py-12 sm:py-16 lg:py-20">
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Dealership Branding & CPLC Badge */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo tone="light" />
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-neutral-400">
              Karachi&apos;s most trusted luxury and exotic car showroom for over 18 years on Main
              Khalid Bin Waleed Road, P.E.C.H.S.
            </p>

            <div className="mt-5 sm:mt-6 flex items-center gap-2.5 rounded-xl sm:rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-3 sm:p-3.5 text-xs text-emerald-300">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
              <span>100% CPLC & Sindh Police Verified Record on Every Vehicle.</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white">
              Navigation
            </h3>
            <ul className="mt-3.5 sm:mt-4 space-y-2 sm:space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured In-Stock Cars */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white">
              Featured In-Stock
            </h3>
            <ul className="mt-3.5 sm:mt-4 space-y-2 sm:space-y-2.5">
              {popularVehicles.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-neutral-400 transition-colors hover:text-amber-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Buyer Services & Assurance */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white">
              Buyer Assurance
            </h3>
            <ul className="mt-3.5 sm:mt-4 space-y-2 sm:space-y-2.5">
              <li>
                <Link
                  href="/services"
                  className="text-xs sm:text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  CPLC & Legal Verification
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-xs sm:text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  Sindh Biometric Transfer
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-xs sm:text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  Meezan & Alfalah Auto Finance
                </Link>
              </li>
              <li>
                <Link
                  href="/sell-car"
                  className="text-xs sm:text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  Vehicle Exchange & Trade-In
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-xs sm:text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  Japanese Auction Sheet Verification
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 flex flex-col items-center justify-between gap-3 sm:gap-4 border-t border-neutral-800 pt-6 sm:pt-8 text-xs text-neutral-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {KARACHI_SHOWROOM.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 sm:gap-x-4 gap-y-1">
            <span>Sindh Biometric On-Site</span>
            <span className="hidden sm:inline">•</span>
            <span>Japanese Auction Sheet Verifier</span>
            <span className="hidden sm:inline">•</span>
            <span>Meezan & Alfalah Bank Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
