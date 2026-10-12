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
      className={`${centered ? "mx-auto max-w-3xl lg:max-w-4xl text-center flex flex-col items-center" : "max-w-3xl"} ${className}`}
    >
      <Reveal delay={80}>
        <h2
          className={`font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight text-balance ${
            isDark ? "text-ink-900" : "text-white"
          } ${centered ? "text-center" : ""}`}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={140}>
          <p
            className={`mt-3.5 sm:mt-4 text-sm sm:text-base leading-relaxed max-w-2xl text-pretty ${
              isDark ? "text-neutral-600" : "text-neutral-300"
            } ${centered ? "text-center" : ""}`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
