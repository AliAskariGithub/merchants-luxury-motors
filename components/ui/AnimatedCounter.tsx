"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: string;
  className?: string;
  duration?: number;
};

export default function AnimatedCounter({
  value,
  className = "",
  duration = 1600,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Parse the number and prefix/suffix
    // Handles formats like "150+", "18+", "100%", "12,000+", "₨ 75.50 Lakh"
    const cleaned = value.replace(/,/g, "");
    const match = cleaned.match(/(\d+(?:\.\d+)?)/);

    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(match[1]);
    const numIndex = cleaned.indexOf(match[1]);
    const prefix = cleaned.slice(0, numIndex);
    const suffix = cleaned.slice(numIndex + match[1].length);
    const isCommaFormatted = value.includes(",");

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = Math.round(targetNumber * easeOutProgress);

            const formattedNum = isCommaFormatted
              ? currentNum.toLocaleString()
              : currentNum.toString();

            setDisplayValue(`${prefix}${formattedNum}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
