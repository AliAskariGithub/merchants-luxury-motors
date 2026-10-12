import Link from "next/link";
import { KARACHI_SHOWROOM, getWhatsAppUrl } from "@/lib/showroom";
import Reveal from "../ui/Reveal";
import SectionHeading from "./SectionHeading";
import { ShieldCheck, Check, ArrowRight, WhatsApp, Pin } from "../ui/Icons";

export default function ShowroomGuarantees() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center gap-6">
          <SectionHeading
            align="center"
            title={
              <>
                Flawless Documentation.
                <br />
                Uncompromising Trust.
              </>
            }
            description="Purchasing a vehicle in Karachi requires complete certainty regarding customs duties, CPLC records, and Sindh Excise ownership. We guarantee 100% legal transparency on every vehicle in our showroom."
          />

          <Reveal delay={120}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-none border border-neutral-300 bg-neutral-900 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-amber-500 hover:text-black"
            >
              All Showroom Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* 4 Guarantees Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {KARACHI_SHOWROOM.guarantees.map((item, index) => (
            <Reveal key={item.title} delay={index * 80} className="flex">
              <div className="flex h-full w-full flex-col justify-between rounded-3xl border border-neutral-200 bg-neutral-50/70 p-7 transition-all duration-300 hover:border-amber-400 hover:bg-white hover:shadow-xl">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500/15 text-amber-600">
                      <ShieldCheck className="h-6 w-6" />
                    </span>
                    <span className="rounded-none bg-emerald-100 px-3 py-1 font-display text-[0.625rem] font-bold uppercase tracking-wider text-emerald-800">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-base font-bold tracking-tight text-neutral-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-neutral-800 border-t border-neutral-200 pt-4">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Guaranteed in Writing</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Showroom Visit & Nationwide Delivery Assurance */}
        <div className="mt-12 rounded-3xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900 to-black p-8 text-white sm:p-10 shadow-lg">
          <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Pin className="h-4 w-4" />
                <span>Khalid Bin Waleed Road • PECHS Block 3, Karachi</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold uppercase text-white sm:text-2xl">
                Purchasing from Outside Karachi?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                We safely transport vehicles nationwide — including Lahore, Islamabad, Faisalabad,
                Multan, and Peshawar via insured enclosed carrier trucks. Full biometric documentation
                and live 4K video inspection prior to vehicle dispatch.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <a
                href={getWhatsAppUrl("Hi! I would like to inquire about buying a car from outside Karachi with nationwide delivery.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-none bg-emerald-500 px-6 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-emerald-400"
              >
                <WhatsApp className="h-4 w-4" />
                Inquire Delivery
              </a>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-none border border-neutral-700 bg-neutral-800 px-6 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-neutral-700"
              >
                Our Facility
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
