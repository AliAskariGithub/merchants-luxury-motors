"use client";

import { useState } from "react";
import { KARACHI_SHOWROOM, getWhatsAppUrl } from "@/lib/showroom";
import { Pin, Phone, Mail, WhatsApp, Check, ShieldCheck, ArrowRight } from "@/components/ui/Icons";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Vehicle Inquiry",
    message: "",
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
            Showroom Location & Contact
          </span>
          <h1 className="mt-3 font-display text-2xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Visit Our Karachi Showroom
          </h1>
          <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base leading-relaxed text-neutral-300">
            Located on Main Khalid Bin Waleed Road, P.E.C.H.S., Karachi. Walk in during our regular
            showroom hours or reach out directly to schedule a private viewing or test drive.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-8 lg:gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-4 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-8 sm:py-12 text-center">
                <div className="mx-auto grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h2 className="mt-5 sm:mt-6 font-display text-xl sm:text-2xl font-black uppercase text-neutral-900">
                  Message Dispatched!
                </h2>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-neutral-900">{formData.name}</span>. Our
                  duty sales officer will call or WhatsApp you at{" "}
                  <span className="font-bold text-neutral-900">{formData.phone}</span> within 15
                  minutes during showroom hours.
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <a
                    href={getWhatsAppUrl(`Hi! I just sent a message through your contact form. My name is ${formData.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-display text-xs font-bold uppercase text-white hover:bg-emerald-500"
                  >
                    <WhatsApp className="h-4 w-4" /> Message on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-full border border-neutral-300 px-6 py-3 font-display text-xs font-bold uppercase text-neutral-700 hover:bg-neutral-100"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                    Direct Inquiry
                  </span>
                  <h2 className="mt-1 font-display text-xl sm:text-2xl font-black uppercase text-neutral-900">
                    Send Us a Message
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Guaranteed response within 15 minutes during showroom hours.
                  </p>
                </div>

                <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mansoor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="tariq@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700">Subject of Inquiry</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Vehicle Purchase / Test Drive">Vehicle Purchase / Test Drive</option>
                      <option value="Meezan / Alfalah Bank Financing">Meezan / Alfalah Bank Financing</option>
                      <option value="Sell or Consign My Car">Sell or Consign My Car</option>
                      <option value="Vehicle Trade-In Exchange">Vehicle Trade-In Exchange</option>
                      <option value="Sindh Biometric & Transfer">Sindh Biometric & Transfer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the car you are inquiring about or your preferred time to visit our Khalid Bin Waleed showroom..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-neutral-950 py-3.5 sm:py-4 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 hover:text-black transition-colors shadow-md"
                >
                  Send Message to Showroom
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Physical Address, Timings & Directions (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-neutral-900 p-5 sm:p-8 text-white">
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                Karachi Flagship Address
              </span>
              <h3 className="mt-2 font-display text-lg sm:text-xl font-bold uppercase text-white">
                {KARACHI_SHOWROOM.name}
              </h3>

              <div className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <Pin className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                  <div>
                    <p className="font-bold text-white text-sm">Physical Showroom:</p>
                    <p className="mt-0.5">{KARACHI_SHOWROOM.address}</p>
                    <p className="mt-1 text-neutral-400">{KARACHI_SHOWROOM.landmark}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">Direct Line:</span>{" "}
                    <a href={`tel:${KARACHI_SHOWROOM.phonePrimary}`} className="hover:underline text-amber-300 font-bold">
                      {KARACHI_SHOWROOM.phoneDisplay}
                    </a>{" "}
                    / {KARACHI_SHOWROOM.landlineDisplay}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <WhatsApp className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">WhatsApp Desk:</span>{" "}
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      {KARACHI_SHOWROOM.phoneDisplay} (Instant Reply)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">Email:</span>{" "}
                    <a href={`mailto:${KARACHI_SHOWROOM.email}`} className="hover:underline">
                      {KARACHI_SHOWROOM.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="mt-5 sm:mt-6 rounded-2xl bg-white/10 p-3.5 sm:p-4 text-xs">
                <p className="font-bold text-amber-300">Showroom Operating Hours:</p>
                <p className="mt-1 text-neutral-200">{KARACHI_SHOWROOM.timings.weekdays}</p>
                <p className="text-neutral-400">{KARACHI_SHOWROOM.timings.fridayBreak}</p>
                <p className="mt-1 text-neutral-300">{KARACHI_SHOWROOM.timings.sunday}</p>
              </div>

              <div className="mt-5 sm:mt-6">
                <a
                  href={getWhatsAppUrl("Hi! I am navigating to your showroom on Khalid Bin Waleed Road right now.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 py-3 font-display text-xs font-bold uppercase tracking-wider text-black hover:bg-emerald-400 transition-colors"
                >
                  <WhatsApp className="h-4 w-4" /> WhatsApp Us for Live Location
                </a>
              </div>
            </div>

            {/* Driving Directions Guide */}
            <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-5 sm:p-7 shadow-sm text-xs text-neutral-600">
              <h4 className="font-display text-sm font-bold uppercase text-neutral-900">
                Karachi Landmark Directions
              </h4>
              <ul className="mt-3 space-y-2.5">
                <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-neutral-900 shrink-0">• From Shahrah-e-Faisal:</span>
                  <span>Turn onto Khalid Bin Waleed Road at Nursery Flyover, proceed 800 meters toward Tariq Road; showroom is located on the right inside Parsa City Luxuria.</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-neutral-900 shrink-0">• From Tariq Road:</span>
                  <span>Proceed past PECHS Block 3 market onto Khalid Bin Waleed Road; showroom is on the left hand side. Valet parking provided.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
