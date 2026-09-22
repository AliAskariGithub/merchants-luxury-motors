import { makePaintRamp } from "./paint";

type CarRearProps = {
  uid?: string;
  className?: string;
  accent?: string;
  paint?: string;
};

export default function CarRear({
  uid = "rear",
  className,
  accent = "#C6FF33",
  paint,
}: CarRearProps) {
  const id = (name: string) => `${uid}-${name}`;
  const resolvedTint = paint ? makePaintRamp(paint) : null;

  return (
    <svg
      viewBox="0 0 900 460"
      role="img"
      aria-label="VOLTSPRINT coupe rear view with full-width light bar"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id("body")} x1="0.15" y1="0" x2="0.85" y2="1">
          {resolvedTint ? (
            <>
              <stop offset="0" stopColor={resolvedTint.low} />
              <stop offset="0.16" stopColor={resolvedTint.top} />
              <stop offset="0.4" stopColor={resolvedTint.top} />
              <stop offset="0.6" stopColor={resolvedTint.mid} />
              <stop offset="0.82" stopColor={resolvedTint.deep} />
              <stop offset="1" stopColor={resolvedTint.lowerBand} />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#5F6771" />
              <stop offset="0.16" stopColor="#AEB6C0" />
              <stop offset="0.4" stopColor="#EEF2F6" />
              <stop offset="0.6" stopColor="#C2C9D2" />
              <stop offset="0.82" stopColor="#7C848E" />
              <stop offset="1" stopColor="#3A4047" />
            </>
          )}
        </linearGradient>
        <linearGradient id={id("glass")} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#2E343B" />
          <stop offset="0.4" stopColor="#14171B" />
          <stop offset="1" stopColor="#05070A" />
        </linearGradient>
        <linearGradient id={id("lower")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A2F35" />
          <stop offset="1" stopColor="#0B0D10" />
        </linearGradient>
        <radialGradient id={id("halo")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={accent} stopOpacity="0.42" />
          <stop offset="0.55" stopColor={accent} stopOpacity="0.1" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id={id("glow")} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={id("soft")} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <ellipse cx="450" cy="250" rx="430" ry="230" fill={`url(#${id("halo")})`} />
      <ellipse
        cx="450"
        cy="406"
        rx="320"
        ry="14"
        fill="#000000"
        opacity="0.5"
        filter={`url(#${id("soft")})`}
      />

      {/* rear tyres peeking at the outer edges */}
      <path d="M40 402 L40 362 C40 336 66 322 100 322 L150 322 L150 402 Z" fill="#0A0C0E" />
      <path d="M860 402 L860 362 C860 336 834 322 800 322 L750 322 L750 402 Z" fill="#0A0C0E" />
      <path d="M52 402 L52 366 C52 346 70 336 96 336 L132 336 L132 402 Z" fill="#191D22" />
      <path d="M848 402 L848 366 C848 346 830 336 804 336 L768 336 L768 402 Z" fill="#191D22" />

      {/* body */}
      <path
        d="M340 124 L560 124
           C602 124 642 134 674 152
           C742 182 794 228 814 280
           C832 324 838 358 834 386
           L812 402 L88 402 L66 386
           C62 358 68 324 86 280
           C106 228 158 182 226 152
           C258 134 298 124 340 124 Z"
        fill={`url(#${id("body")})`}
      />

      {/* shoulder highlights */}
      <path
        d="M344 138 C300 146 264 164 236 190 C204 220 182 254 170 288"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        opacity="0.5"
      />
      <path
        d="M556 138 C600 146 636 164 664 190 C696 220 718 254 730 288"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        opacity="0.5"
      />

      {/* rear glass */}
      <path
        d="M348 148 L552 148
           C584 152 608 166 626 188
           C646 214 656 240 658 262
           L242 262 C244 240 254 214 274 188
           C292 166 316 152 348 148 Z"
        fill={`url(#${id("glass")})`}
      />
      <path
        d="M362 158 L500 154 C456 168 418 190 390 218 L288 256 C304 220 328 180 362 158 Z"
        fill="#FFFFFF"
        opacity="0.15"
      />
      <path d="M450 148 L450 262" stroke="#05070A" strokeWidth="6" opacity="0.7" />

      {/* rear wing */}
      <path d="M262 132 L638 132 L652 152 L248 152 Z" fill="#1B1F24" />
      <path d="M272 135 L628 135 L632 141 L268 141 Z" fill="#FFFFFF" opacity="0.35" />

      {/* full-width light bar */}
      <rect x="106" y="272" width="688" height="26" rx="13" fill="#2A0A06" />
      <rect
        x="112"
        y="277"
        width="676"
        height="16"
        rx="8"
        fill="#FF4A2E"
        filter={`url(#${id("glow")})`}
      />
      <rect x="112" y="277" width="676" height="6" rx="3" fill="#FFD9CE" opacity="0.85" />
      <rect x="106" y="302" width="688" height="5" rx="2.5" fill={accent} opacity="0.9" />

      {/* centre badge */}
      <rect x="398" y="228" width="104" height="20" rx="7" fill="#0C0E11" opacity="0.85" />
      <text
        x="450"
        y="242.5"
        textAnchor="middle"
        fontFamily="Sora, sans-serif"
        fontSize="10.5"
        fontWeight="800"
        letterSpacing="2.6"
        fill={accent}
      >
        VOLTSPRINT
      </text>

      {/* bumper + diffuser */}
      <path
        d="M66 348 L834 348 C830 378 812 394 780 400 L120 400 C88 394 70 378 66 348 Z"
        fill={`url(#${id("lower")})`}
      />
      <g fill="#3C434B" opacity="0.9">
        <rect x="306" y="356" width="12" height="42" rx="5" />
        <rect x="362" y="356" width="12" height="44" rx="5" />
        <rect x="418" y="356" width="12" height="44" rx="5" />
        <rect x="474" y="356" width="12" height="44" rx="5" />
        <rect x="530" y="356" width="12" height="44" rx="5" />
        <rect x="586" y="356" width="12" height="42" rx="5" />
      </g>
      <g fill="#FF4A2E" opacity="0.6">
        <rect x="150" y="360" width="64" height="8" rx="4" />
        <rect x="686" y="360" width="64" height="8" rx="4" />
      </g>
      <path
        d="M120 348 L450 348 L450 354 L120 354 Z"
        fill="#FFFFFF"
        opacity="0.18"
      />
    </svg>
  );
}
