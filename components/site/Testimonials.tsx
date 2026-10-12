"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, StarFilled } from "../ui/Icons";
import { KARACHI_SHOWROOM } from "@/lib/showroom";
import Reveal from "../ui/Reveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const testimonials = KARACHI_SHOWROOM.testimonials;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, testimonials.length]);

  const active = testimonials[index];

  return (
    <section className="bg-white py-14 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          align="center"
          title="Endorsed by Executives & Families Across Pakistan."
          description="Over 12,000 discerning clients across Clifton, DHA, PECHS, and nationwide have trusted Merchants Luxury Motors for their automotive investments."
        />

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto mt-10 sm:mt-14 max-w-4xl"
        >
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[32px] border border-neutral-200 bg-neutral-50/80 p-5 sm:p-12 shadow-sm">
              <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500/20" />

              <div className="mt-3 sm:mt-4 flex gap-1 text-amber-400">
                {[...Array(active.rating)].map((_, i) => (
                  <StarFilled key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ))}
              </div>

              <blockquote className="mt-4 sm:mt-5 font-display text-base sm:text-xl font-bold leading-relaxed text-neutral-900">
                &ldquo;{active.comment}&rdquo;
              </blockquote>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-200 pt-4 sm:pt-6">
                <div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-neutral-900">
                    {active.name}
                  </h3>
                  <p className="text-xs text-neutral-500">{active.role}</p>
                  <p className="mt-0.5 text-xs font-semibold text-amber-700">
                    Purchased: {active.vehicle}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    aria-label="Previous review"
                    className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-none border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 shadow-sm transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(index + 1)}
                    aria-label="Next review"
                    className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-none border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 shadow-sm transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Dots Indicator */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-none transition-all ${
                  index === i ? "w-8 bg-neutral-900" : "w-2 bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
