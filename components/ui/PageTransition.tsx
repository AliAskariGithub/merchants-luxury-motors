"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const goldLayerRef = useRef<HTMLDivElement>(null);
  const darkLayerRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Skip animation on initial page load (handled by LoadingScreen)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Check for reduced motion preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const gold = goldLayerRef.current;
    const dark = darkLayerRef.current;
    const emblem = emblemRef.current;

    if (!gold || !dark) return;

    setIsTransitioning(true);

    // Diagonal GSAP transition from Top-Left (0, 0) to Bottom-Right (100%, 100%)
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        // Reset clip paths back to initial (collapsed at top-left)
        gsap.set([gold, dark], {
          clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
        });
      },
    });

    // 1. Initial state: Collapsed at Top-Left corner (0, 0)
    gsap.set(gold, {
      clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
      opacity: 1,
    });
    gsap.set(dark, {
      clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
      opacity: 1,
    });
    if (emblem) gsap.set(emblem, { opacity: 0, scale: 0.85 });

    // 2. ENTER: Wipe diagonally from Top-Left across the screen
    tl.to(gold, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 0.38,
      ease: "power3.inOut",
    })
      .to(
        dark,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.42,
          ease: "power3.inOut",
        },
        "-=0.28"
      );

    // 3. MID-POINT: Subtle flash of luxury showroom emblem
    if (emblem) {
      tl.to(
        emblem,
        {
          opacity: 1,
          scale: 1,
          duration: 0.18,
          ease: "power2.out",
        },
        "-=0.15"
      ).to(emblem, {
        opacity: 0,
        scale: 1.05,
        duration: 0.15,
        ease: "power2.in",
      });
    }

    // 4. EXIT: Wipe out towards Bottom-Right corner (100%, 100%)
    tl.to(dark, {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      duration: 0.42,
      ease: "power3.inOut",
    }).to(
      gold,
      {
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        duration: 0.38,
        ease: "power3.inOut",
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9990] select-none ${
        isTransitioning ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Accent Leading Layer: Amber Gold */}
      <div
        ref={goldLayerRef}
        className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-2xl will-change-[clip-path]"
        style={{ clipPath: "polygon(0 0, 0 0, 0 0, 0 0)" }}
      />

      {/* Main Curtain Layer: Deep Obsidian Black */}
      <div
        ref={darkLayerRef}
        className="absolute inset-0 flex items-center justify-center bg-[#09090b] will-change-[clip-path]"
        style={{ clipPath: "polygon(0 0, 0 0, 0 0, 0 0)" }}
      >
        {/* Subtle Luxury Center Monogram shown during the wipe */}
        <div
          ref={emblemRef}
          className="flex flex-col items-center justify-center text-center opacity-0"
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-neutral-900 border border-amber-500/30 p-2 shadow-xl">
            <svg viewBox="0 0 36 36" className="h-10 w-10" fill="none">
              <path
                d="M18 2.2L5 6.8v11c0 8.2 5.5 13.2 13 16 7.5-2.8 13-7.8 13-16v-11L18 2.2z"
                fill="#171717"
                stroke="#F59E0B"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M11.5 22.5V14.2l4.8 6.2a2.1 2.1 0 003.4 0l4.8-6.2v8.3"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="mt-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.25em] text-amber-400">
            Merchants Motors
          </span>
        </div>
      </div>
    </div>
  );
}
