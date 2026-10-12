import type { ReactNode } from "react";
import Reveal from "../ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow: _eyebrow,
  title,
  description,
  tone = "dark",
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center flex flex-col items-center" : "max-w-2xl"} ${className}`}
    >
      <Reveal delay={80}>
        <h2
          className={`font-display text-[clamp(1.9rem,4.2vw,3.1rem)] font-extrabold leading-[1.02] tracking-tight ${
            isDark ? "text-ink-900" : "text-white"
          } ${centered ? "text-center" : ""}`}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={140}>
          <p
            className={`mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed ${
              isDark ? "text-ink-500" : "text-ink-300"
            } ${centered ? "text-center" : ""}`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
