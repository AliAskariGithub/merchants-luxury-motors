"use client";

import { useState } from "react";
import Link from "next/link";
import { KARACHI_SHOWROOM, formatPkr, calculateMonthlyEmi } from "@/lib/showroom";
import Reveal from "../ui/Reveal";
import SectionHeading from "./SectionHeading";
import { ShieldCheck, Check, ArrowRight } from "../ui/Icons";

export default function Sustainability() {
  // Simple interactive loan calculator
  const [carPrice, setCarPrice] = useState(12200000); // 1.22 Crore default (Haval H6)
  const [downPercent, setDownPercent] = useState(30);
  const [tenureYears, setTenureYears] = useState(3);

  const monthlyInstallment = calculateMonthlyEmi(carPrice, downPercent, tenureYears, 13.5);

  return (
    <section id="financing" className="scroll-mt-24 bg-neutral-50 py-14 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Bank Financing & Trade-In"
              title={
                <>
                  Fast-Track Auto Finance.
                  <br />
                  Islamic & Conventional.
                </>
              }
              description="We have official corporate dealership partnerships with Pakistan's premier automotive banks. Enjoy prioritized 3 to 5-day approvals, competitive KIBOR spreads, and doorstep document collection in Karachi."
            />

            {/* Banking Partners List */}
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {KARACHI_SHOWROOM.bankingPartners.map((bank) => (
                <div
                  key={bank.name}
                  className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-sm font-bold text-neutral-900">
                        {bank.name}
                      </h3>
                      <span className="text-xs text-neutral-500">{bank.rate} • {bank.tenure}</span>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider ${
                        bank.type === "Islamic"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {bank.type}
                    </span>
                  </div>

                  <ul className="mt-3 grid grid-cols-1 gap-2 text-xs text-neutral-600 sm:grid-cols-2">
                    {bank.features.slice(0, 2).map((feat) => (
                      <li key={feat} className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-neutral-800 hover:bg-neutral-100 hover:border-black transition-colors w-full sm:w-auto text-center"
              >
                View Full Financing Details
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/sell-car"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-neutral-800 hover:bg-neutral-100 hover:border-black transition-colors w-full sm:w-auto text-center"
              >
                Exchange / Trade-In
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Calculator Card */}
          <Reveal delay={140}>
            <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-4 sm:p-9 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-neutral-900">
                    Karachi Auto Loan Estimator
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Estimated monthly installment with Meezan Car Ijarah / Alfalah
                  </p>
                </div>
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 shrink-0" />
              </div>

              <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5 text-sm">
                {/* Vehicle Price Selection */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-neutral-700">
                    <span>Vehicle Price</span>
                    <span className="text-amber-600">{formatPkr(carPrice)}</span>
                  </div>
                  <select
                    value={carPrice}
                    onChange={(e) => setCarPrice(Number(e.target.value))}
                    className="mt-1.5 sm:mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm font-semibold text-neutral-800 focus:border-amber-500 focus:outline-none"
                  >
                    <option value={8900000}>Hyundai Tucson GLS Sport — ₨ 89.00 Lakh</option>
                    <option value={9850000}>Honda Civic RS Turbo — ₨ 98.50 Lakh</option>
                    <option value={12200000}>Haval H6 HEV Hybrid — ₨ 1.22 Crore</option>
                    <option value={41000000}>Lexus RX450h F-Sport — ₨ 4.10 Crore</option>
                    <option value={64500000}>Toyota Prado TX-L 2.8L — ₨ 6.45 Crore</option>
                    <option value={108000000}>Toyota Land Cruiser ZX LC300 — ₨ 10.80 Crore</option>
                  </select>
                </div>

                {/* Down Payment Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-neutral-700">
                    <span>Down Payment ({downPercent}%)</span>
                    <span className="text-amber-600 font-bold">{formatPkr(carPrice * (downPercent / 100))}</span>
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
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>20% (Minimum)</span>
                    <span>50%</span>
                    <span>70%</span>
                  </div>
                </div>

                {/* Financing Tenure */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-neutral-700">
                    <span>Tenure Period</span>
                    <span className="text-amber-600 font-bold">{tenureYears} Years ({tenureYears * 12} Months)</span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {[1, 2, 3, 4, 5, 7].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setTenureYears(yr)}
                        className={`rounded-xl py-2 text-xs font-bold transition-all ${
                          tenureYears === yr
                            ? "bg-neutral-900 text-white shadow"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        {yr} {yr === 1 ? "Yr" : "Yrs"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Result */}
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 text-center">
                  <span className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                    Estimated Monthly Payment
                  </span>
                  <span className="mt-1 block font-display text-2xl sm:text-3xl font-black text-neutral-900">
                    ₨ {monthlyInstallment.toLocaleString("en-PK")}{" "}
                    <span className="text-xs font-bold text-neutral-500">/ month</span>
                  </span>
                  <p className="mt-1.5 sm:mt-2 text-xs text-neutral-600 leading-relaxed">
                    *Indicative calculation based on 13.5% markup rate. Official Takaful/Insurance and tracker included in final quote.
                  </p>
                </div>

                <Link
                  href="/contact?subject=financing"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-neutral-950 hover:bg-amber-400 transition-colors shadow-md"
                >
                  Apply for Pre-Approval
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
