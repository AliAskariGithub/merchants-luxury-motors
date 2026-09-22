"use client";

import { KARACHI_SHOWROOM, getWhatsAppUrl } from "@/lib/showroom";
import { WhatsApp } from "./Icons";

export default function FloatingWhatsApp() {
  const whatsappUrl = getWhatsAppUrl(
    "Hello Merchants Luxury Motors! I am browsing your showroom website and would like more details about available vehicles on Khalid Bin Waleed Road."
  );

  return (
    <aside
      aria-label="WhatsApp quick contact"
      className="fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-8 select-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Merchants Luxury Motors for more details"
        className="group relative grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#34E77A] text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] ring-2 ring-white/60 transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_34px_rgba(37,211,102,0.65)]"
      >
        <WhatsApp className="h-7 w-7 sm:h-8 sm:w-8 drop-shadow-sm" />

        {/* Active Online Pulse Dot */}
        <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
        </span>

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-neutral-950/90 px-3.5 py-1.5 font-display text-xs font-semibold text-white opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
