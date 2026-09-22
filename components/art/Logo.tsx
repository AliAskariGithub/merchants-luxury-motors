type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
  withWordmark?: boolean;
};

export default function Logo({
  className,
  tone = "dark",
  withWordmark = true,
}: LogoProps) {
  const wordColor = tone === "dark" ? "text-neutral-900" : "text-white";
  const subColor = tone === "dark" ? "text-amber-700" : "text-amber-400";

  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className ?? ""}`}>
      {/* Luxury Automotive Shield Crest */}
      <span className="relative grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900 via-black to-neutral-950 p-1 shadow-md ring-1 ring-amber-500/30">
        <svg viewBox="0 0 36 36" className="relative h-6 w-6 sm:h-7 sm:w-7" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="logo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="45%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="logo-shield-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#262626" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
          </defs>
          <path
            d="M18 2.2L5 6.8v11c0 8.2 5.5 13.2 13 16 7.5-2.8 13-7.8 13-16v-11L18 2.2z"
            fill="url(#logo-shield-fill)"
            stroke="url(#logo-gold)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M18 5L7.5 8.6v8.6c0 6.4 4.3 10.4 10.5 12.8 6.2-2.4 10.5-6.4 10.5-12.8V8.6L18 5z"
            stroke="url(#logo-gold)"
            strokeWidth="0.75"
            strokeOpacity="0.4"
            fill="none"
          />
          <path
            d="M11.5 22.5V14.2l4.8 6.2a2.1 2.1 0 003.4 0l4.8-6.2v8.3"
            stroke="url(#logo-gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="9.2" r="1.3" fill="url(#logo-gold)" />
          <circle cx="14.2" cy="10" r="0.85" fill="url(#logo-gold)" />
          <circle cx="21.8" cy="10" r="0.85" fill="url(#logo-gold)" />
        </svg>
      </span>

      {withWordmark ? (
        <span className="flex flex-col text-left">
          <span
            className={`font-display text-[0.98rem] sm:text-[1.1rem] font-black uppercase leading-none tracking-[0.14em] sm:tracking-[0.15em] ${wordColor}`}
          >
            Merchants
          </span>
          <span className={`font-display text-[0.6rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] ${subColor} mt-1 whitespace-nowrap`}>
            Luxury Motors • Karachi
          </span>
        </span>
      ) : null}
    </span>
  );
}
