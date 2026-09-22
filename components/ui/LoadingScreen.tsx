"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const progressObj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        // Smooth exit animation
        if (containerRef.current && centerContentRef.current && bottomContentRef.current) {
          const exitTl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = originalOverflow;
              setIsDone(true);
            },
          });

          exitTl
            .to([centerContentRef.current, bottomContentRef.current], {
              opacity: 0,
              y: -25,
              scale: 0.96,
              duration: 0.45,
              ease: "power2.inOut",
            })
            .to(
              containerRef.current,
              {
                clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
                duration: 0.75,
                ease: "expo.inOut",
              },
              "-=0.1"
            );
        } else {
          document.body.style.overflow = originalOverflow;
          setIsDone(true);
        }
      },
    });

    // Animate counter from 0 to 100
    tl.to(progressObj, {
      value: 100,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
    });

    // Big Logo gentle float and entrance scale
    if (crestRef.current) {
      gsap.fromTo(
        crestRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.5)" }
      );
    }

    return () => {
      tl.kill();
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#070709] text-white select-none will-change-[clip-path]"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      {/* Ambient luxury radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-black/50 to-transparent" />

      {/* Top Bar with Skip Button */}
      <div className="relative z-10 flex items-center justify-between p-6 sm:px-12 sm:py-8">
        <span className="font-display text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
          Premier Dealership • Karachi
        </span>
        <button
          type="button"
          onClick={() => {
            document.body.style.overflow = "";
            setIsDone(true);
          }}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-display text-[0.68rem] font-semibold uppercase tracking-widest text-neutral-300 hover:border-amber-500/50 hover:bg-white/10 hover:text-white transition-all"
        >
          Skip Intro &rarr;
        </button>
      </div>

      {/* Big Logo in the Center */}
      <div
        ref={centerContentRef}
        className="relative z-10 my-auto flex flex-col items-center px-6 text-center"
      >
        {/* Large Automotive Crest Emblem */}
        <div ref={crestRef} className="relative mb-6 sm:mb-8">
          {/* Majestic Outer Radial Glow */}
          <div className="absolute -inset-8 rounded-full bg-amber-500/25 blur-3xl animate-pulse" />

          {/* Large Shield Base */}
          <div className="relative grid h-32 w-32 sm:h-44 sm:w-44 place-items-center rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-2 ring-amber-500/40">
            <svg
              viewBox="0 0 36 36"
              className="h-24 w-24 sm:h-32 sm:w-32 drop-shadow-[0_4px_20px_rgba(245,158,11,0.45)]"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="screen-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="45%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="screen-shield-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e1e24" />
                  <stop offset="100%" stopColor="#08080a" />
                </linearGradient>
              </defs>
              <path
                d="M18 2.2L5 6.8v11c0 8.2 5.5 13.2 13 16 7.5-2.8 13-7.8 13-16v-11L18 2.2z"
                fill="url(#screen-shield-fill)"
                stroke="url(#screen-gold)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M18 5L7.5 8.6v8.6c0 6.4 4.3 10.4 10.5 12.8 6.2-2.4 10.5-6.4 10.5-12.8V8.6L18 5z"
                stroke="url(#screen-gold)"
                strokeWidth="0.75"
                strokeOpacity="0.45"
                fill="none"
              />
              <path
                d="M11.5 22.5V14.2l4.8 6.2a2.1 2.1 0 003.4 0l4.8-6.2v8.3"
                stroke="url(#screen-gold)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="18" cy="9.2" r="1.4" fill="url(#screen-gold)" />
              <circle cx="14.2" cy="10" r="0.95" fill="url(#screen-gold)" />
              <circle cx="21.8" cy="10" r="0.95" fill="url(#screen-gold)" />
            </svg>
          </div>
        </div>

        {/* Brand Name Typography */}
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-[0.25em] text-white">
          Merchants
        </h1>
        <p className="mt-2 font-display text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
          Luxury Motors • Karachi
        </p>
        <p className="mt-2 text-[0.72rem] sm:text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
          Khalid Bin Waleed Road • Premier Showroom
        </p>
      </div>

      {/* Loading Bar at Bottom with Text to Left Bottom and Percentage to Right Bottom */}
      <div
        ref={bottomContentRef}
        className="relative z-10 w-full px-6 pb-8 sm:px-12 sm:pb-12 md:px-20"
      >
        <div className="mx-auto max-w-5xl">
          {/* Top Row: Left Bottom Text and Right Bottom Percentage */}
          <div className="mb-3 flex items-end justify-between gap-2">
            <span className="font-mono text-[0.65rem] sm:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-neutral-300 truncate">
              {progress < 40
                ? "AUTHENTICATING CPLC INVENTORY..."
                : progress < 85
                ? "CALIBRATING VEHICLE SHOWCASE..."
                : "WELCOME TO SHOWROOM"}
            </span>
            <span className="font-mono text-base sm:text-2xl font-black tracking-wider text-amber-400 shrink-0">
              {progress}%
            </span>
          </div>

          {/* Loading Bar Spanning Across the Bottom */}
          <div className="relative h-2 sm:h-2.5 w-full overflow-hidden rounded-full bg-neutral-850 border border-neutral-800 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-[width] duration-100 ease-out shadow-[0_0_16px_rgba(245,158,11,0.65)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
