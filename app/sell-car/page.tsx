"use client";

import { useState } from "react";
import Link from "next/link";
import { KARACHI_SHOWROOM, getWhatsAppUrl } from "@/lib/showroom";
import { Check, ShieldCheck, WhatsApp, ArrowRight } from "@/components/ui/Icons";

export default function SellCarPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "2023",
    mileage: "",
    regCity: "Karachi (Sindh)",
    condition: "Bumper to Bumper Genuine",
    expectedPrice: "",
    inspectionLocation: "Doorstep Inspection at my Karachi residence",
    sellerName: "",
    sellerPhone: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-neutral-100 py-12 sm:py-16">
      <div className="shell">
        {/* Banner */}
        <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-neutral-950 p-6 sm:p-14 text-white">
          <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            Karachi Vehicle Purchase & Consignment
          </span>
          <h1 className="mt-3 font-display text-2xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Sell or Consign Your Luxury Car
          </h1>
          <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base leading-relaxed text-neutral-300">
            Get the best market price for your vehicle in Karachi. We offer instant cash buyouts with
            same-day bank transfers, or premium consignment placement on our prime Khalid Bin Waleed
            Road showroom floor.
          </p>
        </div>

        {/* 3 Step Process */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Free Valuation Request",
              desc: "Submit your car details online or via WhatsApp. Our valuation desk will provide an accurate market estimate within 30 minutes.",
            },
            {
              step: "02",
              title: "Inspection (Showroom or Doorstep)",
              desc: "Bring your car to our Khalid Bin Waleed showroom, or our certified inspection team will visit your home in Clifton, DHA, or anywhere in Karachi.",
            },
            {
              step: "03",
              title: "Instant Cash or Prime Consignment",
              desc: "Receive instant bank transfer with immediate Sindh biometric transfer, or display your car in front of thousands of Karachi buyers on our showroom floor.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-5 sm:p-7 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-display text-xl sm:text-2xl font-black text-amber-600">{item.step}</span>
                <h3 className="mt-2.5 sm:mt-3 font-display text-sm sm:text-base font-bold uppercase text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed text-neutral-600">{item.desc}</p>
              </div>
              <div className="mt-4 sm:mt-6 flex items-center gap-1 text-xs font-bold text-emerald-700">
                <Check className="h-4 w-4" /> 100% Hassle-Free
              </div>
            </div>
          ))}
        </div>

        {/* Valuation Form */}
        <div className="mt-10 sm:mt-14 grid gap-8 lg:gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8 rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-4 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-8 sm:py-10 text-center">
                <div className="mx-auto grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h2 className="mt-5 sm:mt-6 font-display text-xl sm:text-2xl font-black uppercase text-neutral-900">
                  Valuation Request Received!
                </h2>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-neutral-900">{formData.sellerName}</span>.
                  Our senior car acquisitions manager will contact you at{" "}
                  <span className="font-bold text-neutral-900">{formData.sellerPhone}</span> shortly
                  with an initial cash and consignment quotation for your{" "}
                  <span className="font-bold text-neutral-900">
                    {formData.year} {formData.make} {formData.model}
                  </span>.
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <a
                    href={getWhatsAppUrl(`Hi! I just requested a valuation for my ${formData.year} ${formData.make} ${formData.model} on your website. My name is ${formData.sellerName}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-display text-xs font-bold uppercase text-white hover:bg-emerald-500"
                  >
                    <WhatsApp className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-full border border-neutral-300 px-6 py-3 font-display text-xs font-bold uppercase text-neutral-700 hover:bg-neutral-100"
                  >
                    Submit Another Vehicle
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                    Online Valuation
                  </span>
                  <h2 className="mt-1 font-display text-xl sm:text-2xl font-black uppercase text-neutral-900">
                    Get an Instant Offer for Your Car
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Fill out your car specs below. We reply within 30 minutes during showroom hours.
                  </p>
                </div>

                <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Car Make / Brand *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Toyota, Mercedes-Benz, Porsche"
                      value={formData.make}
                      onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Model & Variant *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prado TX-L, Civic RS, Fortuner"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Model Year</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    >
                      {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Mileage (in km) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 24,000 km"
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Registration City</label>
                    <select
                      value={formData.regCity}
                      onChange={(e) => setFormData({ ...formData, regCity: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Karachi (Sindh)">Karachi (Sindh)</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Lahore (Punjab)">Lahore (Punjab)</option>
                      <option value="Unregistered / Fresh Import">Unregistered / Fresh Import</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Vehicle Body Condition</label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Bumper to Bumper Genuine">Bumper to Bumper Genuine</option>
                      <option value="1 or 2 Pieces Shower / Touchup">1 or 2 Pieces Shower / Touchup</option>
                      <option value="Minor Scratches Only">Minor Scratches Only</option>
                      <option value="Zero Meter Brand New">Zero Meter Brand New</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Expected Price in PKR</label>
                    <input
                      type="text"
                      placeholder="e.g. 1.35 Crore or 85 Lakh"
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kamran Siddiqui"
                      value={formData.sellerName}
                      onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0333-1234567"
                      value={formData.sellerPhone}
                      onChange={(e) => setFormData({ ...formData, sellerPhone: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700">Inspection Preference</label>
                  <select
                    value={formData.inspectionLocation}
                    onChange={(e) => setFormData({ ...formData, inspectionLocation: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Doorstep Inspection at my Karachi residence">
                      Doorstep Inspection (Clifton, DHA, PECHS, Gulshan, KDA)
                    </option>
                    <option value="I will bring the car to Khalid Bin Waleed Showroom">
                      I will bring the car to Khalid Bin Waleed Showroom
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-neutral-950 py-3.5 sm:py-4 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 hover:text-black transition-colors shadow-md"
                >
                  Request Instant Car Valuation
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Why Sell to Us */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-neutral-900 p-5 sm:p-7 text-white">
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                Karachi Seller Perks
              </span>
              <h3 className="mt-2 font-display text-lg sm:text-xl font-bold uppercase text-white">
                Why Sell to Merchants Motors?
              </h3>

              <ul className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4 text-xs text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Immediate Payment:</strong> Instant pay order or real-time RTGS / IBFT bank transfer to your account.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Sindh Biometric On-Spot:</strong> Official biometric transfer completed immediately to absolve you of any post-sale liabilities.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Fake Buyers:</strong> No strangers coming to your house. Completely safe, vetted corporate environment.</span>
                </li>
              </ul>

              <div className="mt-5 sm:mt-6 border-t border-neutral-800 pt-4 sm:pt-5">
                <a
                  href={getWhatsAppUrl("Hi! I want to sell my luxury car in Karachi. Can you evaluate it for me?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 py-3 font-display text-xs font-bold uppercase tracking-wider text-black hover:bg-emerald-400 transition-colors"
                >
                  <WhatsApp className="h-4 w-4" /> Direct WhatsApp Appraisal
                </a>
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <ShieldCheck className="h-5 w-5 shrink-0" />
                <h4 className="font-display text-xs font-bold uppercase">Trade-In Exchange Available</h4>
              </div>
              <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                Want to upgrade to a Land Cruiser LC300, S-Class, or Haval H6? Exchange your current vehicle
                and pay only the price difference with instant adjustment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
