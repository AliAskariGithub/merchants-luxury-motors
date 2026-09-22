"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { cars, getCar } from "@/lib/cars";
import { KARACHI_SHOWROOM, getWhatsAppUrl } from "@/lib/showroom";
import { Check, Mail, Phone, Pin, WhatsApp, ShieldCheck } from "../ui/Icons";
import Reveal from "../ui/Reveal";

type BookingFields = {
  fullName: string;
  phone: string;
  email: string;
  selectedCar: string;
  visitDate: string;
  visitTime: string;
  cityArea: string;
  notes: string;
};

const initialFields: BookingFields = {
  fullName: "",
  phone: "",
  email: "",
  selectedCar: cars[0].slug,
  visitDate: "",
  visitTime: "Afternoon (2:00 PM – 5:00 PM)",
  cityArea: "DHA / Clifton, Karachi",
  notes: "",
};

function BookingFormContent() {
  const params = useSearchParams();
  const carSlug = params.get("car");
  const preselected = carSlug ? getCar(carSlug) : undefined;

  const [fields, setFields] = useState<BookingFields>(() => ({
    ...initialFields,
    selectedCar: preselected ? preselected.slug : cars[0].slug,
  }));

  const [submitted, setSubmitted] = useState(false);

  const currentCar = getCar(fields.selectedCar) || cars[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
      {/* Form or Confirmation */}
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-4 sm:p-10 shadow-lg">
        {submitted ? (
          <div className="py-6 sm:py-8 text-center">
            <div className="mx-auto grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>

            <h3 className="mt-5 sm:mt-6 font-display text-xl sm:text-2xl font-black uppercase text-neutral-900">
              Showroom Appointment Received!
            </h3>

            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-neutral-600">
              Thank you, <span className="font-bold text-neutral-900">{fields.fullName}</span>.
              Our Senior Automotive Consultant will contact you at{" "}
              <span className="font-bold text-neutral-900">{fields.phone}</span> shortly to confirm
              your private viewing of the{" "}
              <span className="font-bold text-neutral-900">{currentCar.name}</span> at our Khalid
              Bin Waleed showroom.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={getWhatsAppUrl(`Hi! I just booked a viewing for the ${currentCar.name} on your website. My name is ${fields.fullName}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-emerald-500"
              >
                <WhatsApp className="h-4 w-4" />
                Connect on WhatsApp Now
              </a>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="rounded-full border border-neutral-300 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-100"
              >
                Book Another Car
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                VIP Showroom Visit
              </span>
              <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold uppercase text-neutral-900">
                Schedule a Private Viewing
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Enjoy priority access to our vehicle fleet with dedicated sales advisory and test drive.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mansoor"
                  value={fields.fullName}
                  onChange={(e) => setFields({ ...fields, fullName: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={fields.phone}
                  onChange={(e) => setFields({ ...fields, phone: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Vehicle of Interest *
                </label>
                <select
                  value={fields.selectedCar}
                  onChange={(e) => setFields({ ...fields, selectedCar: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                >
                  {cars.map((car) => (
                    <option key={car.slug} value={car.slug}>
                      {car.name} ({car.priceFormatted})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Karachi Area / City
                </label>
                <select
                  value={fields.cityArea}
                  onChange={(e) => setFields({ ...fields, cityArea: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value="DHA / Clifton, Karachi">DHA / Clifton, Karachi</option>
                  <option value="PECHS / Tariq Road, Karachi">PECHS / Tariq Road, Karachi</option>
                  <option value="KDA Scheme 1 / Tipu Sultan">KDA Scheme 1 / Tipu Sultan</option>
                  <option value="Gulshan-e-Iqbal / Johar">Gulshan-e-Iqbal / Johar</option>
                  <option value="North Nazimabad / Federal B">North Nazimabad / Federal B</option>
                  <option value="Outside Karachi (Nationwide)">Outside Karachi (Nationwide)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Preferred Visit Date
                </label>
                <input
                  type="date"
                  value={fields.visitDate}
                  onChange={(e) => setFields({ ...fields, visitDate: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Preferred Time Window
                </label>
                <select
                  value={fields.visitTime}
                  onChange={(e) => setFields({ ...fields, visitTime: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value="Morning (11:00 AM – 1:00 PM)">Morning (11:00 AM – 1:00 PM)</option>
                  <option value="Afternoon (2:30 PM – 5:30 PM)">Afternoon (2:30 PM – 5:30 PM)</option>
                  <option value="Evening (6:00 PM – 9:00 PM)">Evening (6:00 PM – 9:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Additional Requests (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Inquire about trade-in of my current car or Bank Alfalah financing..."
                value={fields.notes}
                onChange={(e) => setFields({ ...fields, notes: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base sm:text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-amber-500 py-3.5 sm:py-4 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 transition-all hover:bg-amber-400 shadow-lg cursor-pointer"
            >
              Confirm Showroom Appointment
            </button>
          </form>
        )}
      </div>

      {/* Showroom Details & Direct Contact Card */}
      <div className="space-y-4 sm:space-y-6">
        <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-neutral-900 p-5 sm:p-8 text-white">
          <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            Showroom Location
          </span>
          <h3 className="mt-2 font-display text-lg sm:text-xl font-bold uppercase text-white">
            {KARACHI_SHOWROOM.name}
          </h3>

          <div className="mt-6 space-y-4 text-sm text-neutral-300">
            <div className="flex items-start gap-3">
              <Pin className="mt-1 h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <p className="font-semibold text-white">Main Showroom:</p>
                <p className="mt-0.5">{KARACHI_SHOWROOM.address}</p>
                <p className="mt-1 text-xs text-neutral-400">{KARACHI_SHOWROOM.landmark}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <span className="font-semibold text-white">Telephone:</span>{" "}
                <a href={`tel:${KARACHI_SHOWROOM.phonePrimary}`} className="hover:underline">
                  {KARACHI_SHOWROOM.phoneDisplay}
                </a>{" "}
                / {KARACHI_SHOWROOM.landlineDisplay}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <span className="font-semibold text-white">Email:</span>{" "}
                <a href={`mailto:${KARACHI_SHOWROOM.email}`} className="hover:underline">
                  {KARACHI_SHOWROOM.email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-xs">
            <div className="font-bold text-amber-300">Operating Hours:</div>
            <div className="mt-1 text-neutral-200">{KARACHI_SHOWROOM.timings.weekdays}</div>
            <div className="text-neutral-400">{KARACHI_SHOWROOM.timings.fridayBreak}</div>
            <div className="mt-1 text-neutral-300">{KARACHI_SHOWROOM.timings.sunday}</div>
          </div>

          <div className="mt-6">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/40 py-3 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-900/60 hover:text-white"
            >
              <WhatsApp className="h-4 w-4" />
              Instant WhatsApp Support
            </a>
          </div>
        </div>

        {/* CPLC Assurance Banner */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-neutral-800">
          <div className="flex items-center gap-3 text-emerald-800">
            <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-600" />
            <h4 className="font-display text-sm font-bold uppercase">
              100% CPLC & Sindh Excise Guaranteed
            </h4>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-neutral-600">
            Biometric verification device installed directly inside the showroom for rapid, legal, and
            transparent vehicle transfer under the Government of Sindh Excise regulations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Reserve() {
  return (
    <section id="reserve" className="scroll-mt-24 bg-neutral-100 py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Visit Our Dealership
            </span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-black uppercase tracking-tight text-neutral-900">
              Experience the Vehicles in Person
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              Located on Karachi&apos;s prime automobile avenue. Walk-ins always welcome, or reserve a
              VIP consultation slot below.
            </p>
          </div>
        </Reveal>

        <Suspense fallback={<div className="text-center py-12 text-sm text-neutral-500">Loading booking portal...</div>}>
          <BookingFormContent />
        </Suspense>
      </div>
    </section>
  );
}
