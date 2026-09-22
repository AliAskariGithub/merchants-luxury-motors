"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { KARACHI_SHOWROOM, getWhatsAppUrl } from "@/lib/showroom";
import Reveal from "../ui/Reveal";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Close,
  WhatsApp,
} from "../ui/Icons";

export default function ShowroomHero() {
  const [showTourModal, setShowTourModal] = useState(false);
  
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // High-performance Parallax Scroll for Hero Section
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;

      if (scrollY <= 1100) {
        // Background video parallax: moves down smoothly at 48% scroll speed with subtle scale zoom
        if (videoLayerRef.current) {
          const videoY = scrollY * 0.48;
          const videoScale = 1.08 + scrollY * 0.00025;
          videoLayerRef.current.style.transform = `translate3d(0, ${videoY}px, 0) scale(${videoScale})`;
        }

        // Hero text parallax: lifts slightly upwards with smooth fade
        if (heroContentRef.current) {
          const contentY = scrollY * -0.22;
          const contentOpacity = Math.max(0, 1 - scrollY / 500);
          heroContentRef.current.style.transform = `translate3d(0, ${contentY}px, 0)`;
          heroContentRef.current.style.opacity = `${contentOpacity}`;
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section: 100% Clean, Spacious & Unobstructed */}
      <section className="relative isolate flex min-h-[600px] lg:h-[calc(100vh-5rem)] max-h-[850px] items-center justify-center overflow-hidden bg-black text-white">
        {/* Background Video Layer with Deep Parallax Runway */}
        <div
          ref={videoLayerRef}
          className="pointer-events-none absolute -inset-y-28 inset-x-0 -z-10 overflow-hidden will-change-transform"
          style={{
            transform: "translate3d(0, 0px, 0) scale(1.08)",
          }}
        >
          <video
            src="/videos/hero-showroom.mp4"
            poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover object-center opacity-50 transition-opacity duration-700 sm:opacity-55"
          />
          {/* Subtle Luxury Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/35 to-black" />
        </div>

        {/* Main Hero Content with Parallax Fade/Shift */}
        <div
          ref={heroContentRef}
          className="shell relative z-10 py-12 sm:py-16 text-center will-change-transform"
        >
          <Reveal>
            <div className="mx-auto inline-flex max-w-full items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1.5 font-display text-[0.7rem] sm:text-xs font-semibold text-amber-300 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)] text-center">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-amber-400" />
              <span>100% CPLC Cleared • Sindh Biometric On-Spot</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mx-auto mt-5 max-w-5xl font-display text-[clamp(1.75rem,5.5vw,4.25rem)] font-extrabold leading-[1.06] tracking-tight text-white px-2">
              Karachi&apos;s Premier
              <br />
              <span className="bg-gradient-to-r from-white via-neutral-100 to-amber-200 bg-clip-text text-transparent">
                Luxury Car Dealership
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base px-2">
              Serving Karachi for over 18 years on Main Khalid Bin Waleed Road. Explore Pakistan&apos;s
              most exclusive collection of Land Cruisers, Mercedes-Benz, Porsche, hybrids and exotic
              imports with complete peace of mind.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
              <Link
                href="/inventory"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-amber-500 px-7 sm:px-8 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-neutral-950 shadow-md transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_8px_25px_rgba(245,158,11,0.4)]"
              >
                Explore In-Stock Cars
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => setShowTourModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 bg-black/40 px-6 sm:px-7 py-3.5 font-display text-xs font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/50 hover:bg-white/15"
              >
                <Play className="h-4 w-4 text-amber-400" />
                Watch Showroom Tour
              </button>
            </div>
          </Reveal>
        </div>

        {/* Showroom Tour Video Modal */}
        {/* Showroom Tour Video Modal */}
        {showTourModal ? (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            <button
              type="button"
              aria-label="Close tour modal"
              onClick={() => setShowTourModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <div className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/20 bg-neutral-950 p-3.5 sm:p-6 shadow-2xl">
              <div className="mb-3 sm:mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-wider text-white">
                    Merchants Luxury Motors — Virtual Showroom Walkthrough
                  </h3>
                  <p className="text-[0.7rem] sm:text-xs text-neutral-400">
                    Plot 167/C, Parsa City Luxuria, Main Khalid Bin Waleed Road, Karachi
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTourModal(false)}
                  className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-white"
                >
                  <Close className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black">
                <video
                  src="/videos/hero-showroom.mp4"
                  controls
                  autoPlay
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-[0.75rem] sm:text-xs">Visit our 3-floor showroom in person. Timings: 10:30 AM – 9:00 PM</span>
                </div>
                <a
                  href={getWhatsAppUrl("Hi! I would like to book an appointment to visit your Khalid Bin Waleed showroom.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-400 hover:underline text-[0.75rem] sm:text-xs"
                >
                  <WhatsApp className="h-3.5 w-3.5 shrink-0" /> Book Showroom Visit
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {/* Showroom Credentials Bar - MOVED DOWN BELOW THE HERO SECTION */}
      <section className="relative z-20 border-y border-white/10 bg-neutral-950 py-6 sm:py-8 text-white shadow-lg">
        <div className="shell">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur sm:grid-cols-4">
            {KARACHI_SHOWROOM.metrics.map((stat) => (
              <div key={stat.label} className="px-2.5 py-3.5 sm:px-6 sm:py-5 text-center">
                <dd className="font-display text-xl font-black tracking-tight text-white sm:text-3xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 font-display text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.14em] text-neutral-400">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
