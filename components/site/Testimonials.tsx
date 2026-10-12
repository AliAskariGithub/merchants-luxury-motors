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

  const go = useCallback(
    (next: number) => {
      setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length);
    },
    [testimonials.length]
  );

  // Auto-advance every 5 seconds (5000ms), smoothly sliding right to left
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, testimonials.length]);

  return (
    <section className="scroll-mt-24 bg-stone-100 py-20 sm:py-24 lg:py-28 border-b border-stone-200">
      <div className="shell">
        <SectionHeading
          align="center"
          title="Endorsed by Executives & Families Across Pakistan"
          description="Over 12,000 discerning clients across Clifton, DHA, PECHS, and nationwide have trusted Merchants Luxury Motors for their automotive investments."
        />

        {/* Carousel container with smooth right-to-left slide */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto mt-10 sm:mt-14 max-w-4xl"
        >
          <Reveal>
            <div className="relative overflow-hidden rounded-none border border-stone-300/80 bg-white shadow-md">
              {/* Smooth Sliding Track */}
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {testimonials.map((item) => (
                  <div key={item.name} className="w-full shrink-0 p-6 sm:p-12">
                    <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500/25" />

                    <div className="mt-3 sm:mt-4 flex gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <StarFilled key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      ))}
                    </div>

                    <blockquote className="mt-4 sm:mt-5 font-display text-base sm:text-xl font-bold leading-relaxed text-neutral-900 min-h-[4.5rem]">
                      &ldquo;{item.comment}&rdquo;
                    </blockquote>

                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-200 pt-4 sm:pt-6">
                      <div>
                        <h3 className="font-display text-sm sm:text-base font-bold text-neutral-900">
                          {item.name}
                        </h3>
                        <p className="text-xs text-neutral-500">{item.role}</p>
                        <p className="mt-0.5 text-xs font-semibold text-amber-700">
                          Purchased: {item.vehicle}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => go(index - 1)}
                          aria-label="Previous review"
                          className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-none border border-neutral-300 bg-stone-50 text-neutral-800 hover:bg-neutral-900 hover:text-white shadow-sm transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => go(index + 1)}
                          aria-label="Next review"
                          className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-none border border-neutral-300 bg-stone-50 text-neutral-800 hover:bg-neutral-900 hover:text-white shadow-sm transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Dots Indicator with slide progress */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-none transition-all duration-300 ${
                  index === i ? "w-8 bg-neutral-950" : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
