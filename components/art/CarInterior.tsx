import { shade } from "./paint";

export type InteriorArtProps = {
  uid: string;
  trimHex: string;
  accentHex: string;
  className?: string;
  label?: string;
};

export default function CarInterior({
  uid,
  trimHex,
  accentHex,
  className,
  label = "VOLTSPRINT cabin, driver's view",
}: InteriorArtProps) {
  const id = (name: string) => `${uid}-${name}`;
  const trimTop = shade(trimHex, 0.14);
  const trimMid = trimHex;
  const trimLow = shade(trimHex, -0.28);
  const trimDeep = shade(trimHex, -0.48);

  return (
    <svg
      viewBox="0 0 1200 620"
      role="img"
      aria-label={label}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id("windshield")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0c0e" />
          <stop offset="1" stopColor="#1b222c" />
        </linearGradient>
        <linearGradient id={id("dash")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={trimLow} />
          <stop offset="0.55" stopColor={trimMid} />
          <stop offset="1" stopColor={trimDeep} />
        </linearGradient>
        <linearGradient id={id("dashTop")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={trimTop} stopOpacity="0.7" />
          <stop offset="1" stopColor={trimMid} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("sky")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("vignette")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000000" stopOpacity="0" />
          <stop offset="0.6" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="1" />
        </radialGradient>
        <filter id={id("soft")} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id={id("glow")} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* windshield band */}
      <path d="M0 40 L1200 40 L1200 210 L0 250 Z" fill={`url(#${id("windshield")})`} />
      <ellipse cx="600" cy="92" rx="380" ry="86" fill={`url(#${id("sky")})`} />

      {/* A-pillars */}
      <path d="M0 36 L150 40 L212 248 L0 252 Z" fill="#0E1114" />
      <path d="M1200 36 L1050 40 L988 210 L1200 214 Z" fill="#0E1114" />

      {/* dashboard */}
      <path d="M0 250 L1200 210 L1200 400 L0 430 Z" fill={`url(#${id("dash")})`} />
      <path d="M0 250 L1200 210 L1200 246 L0 288 Z" fill={`url(#${id("dashTop")})`} />

      {/* instrument cluster */}
      <rect x="228" y="264" width="248" height="106" rx="18" fill="#05070A" stroke="#1C2126" />
      <circle cx="304" cy="318" r="31" fill="#0B0E11" />
      <circle cx="304" cy="318" r="31" fill="none" stroke="#2E343B" strokeWidth="4" />
      <path
        d="M304 289 A29 29 0 0 1 329 335"
        fill="none"
        stroke={accentHex}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="406" cy="318" r="31" fill="#0B0E11" />
      <circle cx="406" cy="318" r="31" fill="none" stroke="#2E343B" strokeWidth="4" />
      <path
        d="M406 289 A29 29 0 0 1 429 324"
        fill="none"
        stroke="#5C646D"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="304" cy="318" r="4" fill={accentHex} filter={`url(#${id("glow")})`} />

      {/* centre display */}
      <rect x="556" y="244" width="332" height="188" rx="20" fill="#05070A" stroke="#1C2126" />
      <rect x="580" y="268" width="72" height="6" rx="3" fill={accentHex} />
      <rect x="580" y="300" width="212" height="9" rx="4.5" fill="#8A929C" opacity="0.7" />
      <rect x="580" y="322" width="168" height="9" rx="4.5" fill="#8A929C" opacity="0.5" />
      <rect x="580" y="344" width="238" height="9" rx="4.5" fill="#8A929C" opacity="0.35" />
      <rect x="580" y="382" width="120" height="30" rx="9" fill={accentHex} opacity="0.9" />

      {/* centre console */}
      <path d="M516 430 L706 430 L772 620 L462 620 Z" fill="#0E1114" />
      <path
        d="M700 432 L766 618"
        stroke={accentHex}
        strokeWidth="3"
        opacity="0.8"
        fill="none"
      />
      <rect x="556" y="470" width="34" height="86" rx="10" fill="#1A1E23" />

      {/* steering wheel */}
      <g>
        <circle cx="330" cy="398" r="120" fill="none" stroke="#15181C" strokeWidth="28" />
        <circle cx="330" cy="398" r="34" fill="#15181C" />
        <circle cx="330" cy="398" r="16" fill="#0B0E11" />
        <path d="M330 364 L330 288" stroke="#15181C" strokeWidth="22" strokeLinecap="round" />
        <path d="M300 420 L232 458" stroke="#15181C" strokeWidth="22" strokeLinecap="round" />
        <path d="M360 420 L428 458" stroke="#15181C" strokeWidth="22" strokeLinecap="round" />
        <rect x="322" y="278" width="16" height="11" rx="5" fill={accentHex} />
      </g>

      {/* door card, left */}
      <rect x="0" y="250" width="72" height="370" fill="#14181C" />
      <circle cx="36" cy="402" r="22" fill="#0B0E11" stroke="#262B31" strokeWidth="3" />
      <rect x="0" y="520" width="72" height="20" fill={trimMid} opacity="0.85" />

      {/* driver seat */}
      <g>
        <path
          d="M36 620 Q34 512 118 490 L268 490 Q330 506 342 620 Z"
          fill={trimLow}
        />
        <ellipse cx="180" cy="474" rx="66" ry="30" fill={trimDeep} />
        <path
          d="M150 500 Q190 512 226 500 L234 620 L150 620 Z"
          fill={trimMid}
        />
        <path
          d="M40 620 Q40 540 96 516 L120 620 Z"
          fill={trimTop}
          opacity="0.85"
        />
        <path
          d="M180 512 L180 606"
          stroke={accentHex}
          strokeWidth="2"
          strokeDasharray="7 8"
          fill="none"
          opacity="0.85"
        />
      </g>

      {/* passenger seat */}
      <g>
        <path
          d="M864 620 Q856 508 940 490 L1092 490 Q1170 512 1164 620 Z"
          fill={trimLow}
        />
        <ellipse cx="1002" cy="474" rx="66" ry="30" fill={trimDeep} />
        <path
          d="M968 500 Q1008 512 1044 500 L1052 620 L968 620 Z"
          fill={trimMid}
        />
        <path
          d="M862 620 Q860 540 916 516 L938 620 Z"
          fill={trimTop}
          opacity="0.85"
        />
        <path
          d="M1002 512 L1002 606"
          stroke={accentHex}
          strokeWidth="2"
          strokeDasharray="7 8"
          fill="none"
          opacity="0.85"
        />
      </g>

      {/* dash stitching */}
      <path
        d="M0 268 L1200 228"
        stroke={accentHex}
        strokeWidth="2"
        strokeDasharray="8 9"
        fill="none"
        opacity="0.6"
      />

      {/* vignette */}
      <rect x="0" y="0" width="1200" height="620" fill={`url(#${id("vignette")})`} opacity="0.4" />
    </svg>
  );
}
