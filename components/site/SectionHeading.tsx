import type { ReactNode } from "react";
import Reveal from "../ui/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <Reveal>
        <span
          className={`eyebrow inline-flex items-center gap-2.5 ${
            isDark ? "text-volt-600" : "text-volt-400"
          }`}
        >
          <span
            className={`h-px w-8 ${isDark ? "bg-volt-600" : "bg-volt-400"}`}
            aria-hidden="true"
          />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={`mt-4 font-display text-[clamp(1.9rem,4.2vw,3.1rem)] font-extrabold leading-[1.02] tracking-tight ${
            isDark ? "text-ink-900" : "text-white"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={140}>
          <p
            className={`mt-5 text-base leading-relaxed ${
              isDark ? "text-ink-500" : "text-ink-300"
            }`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
