import { shade } from "./paint";

export type SeatArtProps = {
  uid: string;
  trimHex: string;
  accentHex: string;
  className?: string;
  label?: string;
};

export default function CarSeat({
  uid,
  trimHex,
  accentHex,
  className,
  label = "VOLTSPRINT sport seat in trim close-up",
}: SeatArtProps) {
  const id = (name: string) => `${uid}-${name}`;
  const trimTop = shade(trimHex, 0.12);
  const trimMid = trimHex;
  const trimLow = shade(trimHex, -0.15);
  const trimDeep = shade(trimHex, -0.24);

  return (
    <svg
      viewBox="0 0 700 700"
      role="img"
      aria-label={label}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id("back")} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={trimTop} />
          <stop offset="0.5" stopColor={trimMid} />
          <stop offset="1" stopColor={trimLow} />
        </linearGradient>
        <linearGradient id={id("cushion")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={trimMid} />
          <stop offset="1" stopColor={trimDeep} />
        </linearGradient>
        <filter id={id("soft")} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* backdrop */}
      <rect x="8" y="8" width="684" height="684" rx="32" fill="#0E1114" />

      {/* floor shadow */}
      <ellipse
        cx="350"
        cy="662"
        rx="228"
        ry="24"
        fill="#000000"
        opacity="0.55"
        filter={`url(#${id("soft")})`}
      />

      {/* seat back */}
      <path
        d="M212 116 L488 116 Q512 130 514 162 L476 420 L236 420 Q216 220 212 116 Z"
        fill={`url(#${id("back")})`}
      />

      {/* headrest */}
      <rect x="296" y="52" width="128" height="86" rx="20" fill={trimDeep} />
      <rect x="308" y="64" width="104" height="62" rx="14" fill={trimLow} opacity="0.7" />

      {/* shoulder bolsters */}
      <path d="M198 142 Q160 186 168 306 L212 306 L218 152 Z" fill={trimTop} />
      <path d="M502 142 Q540 186 532 306 L488 306 L482 152 Z" fill={trimTop} />

      {/* base cushion */}
      <path
        d="M170 420 L530 420 Q562 442 556 502 L536 600 Q520 642 468 646 L232 646 Q180 642 164 600 L144 502 Q138 442 170 420 Z"
        fill={`url(#${id("cushion")})`}
      />

      {/* side bolsters */}
      <path d="M170 442 Q150 520 168 598 L212 622 L206 442 Z" fill={trimLow} />
      <path d="M530 442 Q550 520 532 598 L488 622 L494 442 Z" fill={trimLow} />

      {/* stitching */}
      <g
        stroke={accentHex}
        strokeWidth="2.4"
        strokeDasharray="8 9"
        fill="none"
        opacity="0.9"
      >
        <path d="M350 150 L350 408" />
        <path d="M350 448 L350 620" />
        <path d="M228 156 Q214 280 226 414" />
        <path d="M472 156 Q486 280 474 414" />
        <path d="M196 470 Q184 540 200 606" />
        <path d="M504 470 Q516 540 500 606" />
      </g>

      {/* embossed bolt on headrest */}
      <path d="M362 70 L342 104 L358 104 L350 124 L378 88 L360 88 Z" fill={accentHex} />
    </svg>
  );
}
