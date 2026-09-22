import type { CSSProperties } from "react";
import { carTints, makePaintRamp, type CarTint } from "./paint";
import type { WheelStyle } from "@/lib/cars";

export { carTints };
export type { CarTint };

type CarSideProps = {
  uid: string;
  tint?: CarTint;
  accent?: string;
  paint?: string;
  wheel?: WheelStyle;
  shadow?: boolean;
  decorative?: boolean;
  className?: string;
  style?: CSSProperties;
  label?: string;
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
};

export default function CarSide({
  uid,
  tint = carTints.SILVER,
  accent = "#C6FF33",
  paint,
  wheel = "sport",
  shadow = true,
  decorative = false,
  className,
  style,
  label = "VOLTSPRINT performance coupe in three-quarter front view",
  x,
  y,
  width,
  height,
}: CarSideProps) {
  const id = (name: string) => `${uid}-${name}`;
  const resolvedTint = paint ? makePaintRamp(paint) : tint;

  return (
    <svg
      viewBox="0 0 1200 460"
      x={x}
      y={y}
      width={width}
      height={height}
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id("body")} x1="0.28" y1="0" x2="0.62" y2="1">
          <stop offset="0" stopColor={resolvedTint.top} />
          <stop offset="0.1" stopColor="#EEF2F6" />
          <stop offset="0.3" stopColor="#CFD6DE" />
          <stop offset="0.5" stopColor={resolvedTint.mid} />
          <stop offset="0.72" stopColor={resolvedTint.low} />
          <stop offset="1" stopColor={resolvedTint.deep} />
        </linearGradient>
        <linearGradient id={id("lower")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={resolvedTint.lowerBand} stopOpacity="0" />
          <stop offset="0.5" stopColor={resolvedTint.lowerBand} stopOpacity="0.6" />
          <stop offset="1" stopColor="#12151A" stopOpacity="0.96" />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#434A53" />
          <stop offset="0.34" stopColor="#181B20" />
          <stop offset="1" stopColor="#040609" />
        </linearGradient>
        <linearGradient id={id("glassHi")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("arch")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1B1F24" />
          <stop offset="1" stopColor="#06080A" />
        </linearGradient>
        <linearGradient id={id("tyre")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2B2F35" />
          <stop offset="1" stopColor="#080A0C" />
        </linearGradient>
        <linearGradient id={id("rim")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#AAB2BC" />
          <stop offset="0.5" stopColor="#5C626A" />
          <stop offset="1" stopColor="#212529" />
        </linearGradient>
        <filter id={id("glow")} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={id("soft")} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <clipPath id={id("clip")}>
          <path d="M150 352 L150 296 Q158 280 192 274 L440 256 L540 190 Q610 180 700 190 L940 264 L1016 268 Q1044 278 1042 300 Q1040 336 1000 344 L872 352 Z" />
        </clipPath>
      </defs>

      {shadow ? (
        <ellipse
          cx="590"
          cy="402"
          rx="420"
          ry="15"
          fill="#8A96A3"
          opacity="0.34"
          filter={`url(#${id("soft")})`}
        />
      ) : null}

      <path
        d="M150 352 L150 296 Q158 280 192 274 L440 256 L540 190 Q610 180 700 190 L940 264 L1016 268 Q1044 278 1042 300 Q1040 336 1000 344 L872 352 Z"
        fill={`url(#${id("body")})`}
      />

      <g clipPath={`url(#${id("clip")})`} opacity="0.55">
        <rect x="100" y="256" width="1000" height="34" fill="#FFFFFF" opacity="0.3" />
        <rect x="100" y="290" width="1000" height="22" fill="#AFC0D2" opacity="0.35" />
        <rect x="100" y="312" width="1000" height="16" fill="#DCE4EC" opacity="0.5" />
        <rect x="100" y="328" width="1000" height="26" fill="#5E6670" opacity="0.35" />
      </g>
      <g clipPath={`url(#${id("clip")})`}>
        <rect x="130" y="300" width="940" height="60" fill={`url(#${id("lower")})`} />
      </g>

      <path
        d="M150 330 Q186 304 260 294 L300 290 L300 352 L240 352 Q152 350 150 330 Z"
        fill="#242930"
      />
      <path d="M156 302 L300 290 L302 304 L158 316 Z" fill="#0F1114" />
      <path
        d="M166 326 Q210 312 268 304 L268 312 Q214 320 174 334 Z"
        fill="#4B525B"
        opacity="0.6"
      />
      <path
        d="M944 262 Q990 268 1006 284 L988 272 Q968 264 940 264 Z"
        fill="#FFFFFF"
        opacity="0.6"
      />

      <path
        d="M452 258 L548 196 Q610 186 696 196 L930 264 Z"
        fill={`url(#${id("glass")})`}
      />
      <path
        d="M468 254 L556 202 Q582 198 602 198 L576 206 Q530 218 486 254 Z"
        fill={`url(#${id("glassHi")})`}
      />
      <path d="M440 256 L540 190 L554 194 L456 260 Z" fill="#0A0D11" />
      <path d="M646 190 L642 263 L658 263 L660 190 Z" fill="#0A0D11" opacity="0.92" />
      <path d="M700 190 L930 264 L914 264 L692 195 Z" fill="#0A0D11" opacity="0.45" />
      <path d="M806 216 L812 218 L824 261 L808 261 Z" fill="#0A0D11" opacity="0.85" />

      <path
        d="M154 274 L320 246 L326 258 L162 286 Z"
        fill="#EAF4FF"
        filter={`url(#${id("glow")})`}
      />
      <path d="M160 278 L316 251 L320 257 L164 283 Z" fill="#FFFFFF" />
      <path d="M178 286 L268 271 L270 277 L180 292 Z" fill={accent} opacity="0.9" />
      <path
        d="M940 258 L1012 274 L1008 292 L932 272 Z"
        fill="#FF5A3C"
        filter={`url(#${id("glow")})`}
      />
      <path d="M946 263 L1006 276 L1004 284 L944 270 Z" fill="#FFD3C8" opacity="0.85" />

      <path
        d="M240 294 A 80 80 0 0 1 392 294"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        opacity="0.42"
      />
      <path
        d="M756 298 A 84 84 0 0 1 906 298"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        opacity="0.36"
      />
      <path
        d="M452 254 L544 190 Q610 180 698 190"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        opacity="0.55"
      />
      <path d="M440 256 L936 262" stroke="#FFFFFF" strokeWidth="2.6" opacity="0.5" />
      <path d="M440 264 L932 270" stroke="#78808C" strokeWidth="2" opacity="0.45" />
      <path
        d="M190 302 L560 292 L920 302 L1006 322"
        fill="none"
        stroke="#78808C"
        strokeWidth="2.2"
        opacity="0.45"
      />
      <path
        d="M190 310 L560 300 L920 310 L1006 330"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        opacity="0.3"
      />
      <path d="M224 274 L440 256" stroke="#6E7680" strokeWidth="1.8" opacity="0.35" />
      <path d="M436 260 L428 352" stroke="#6E7680" strokeWidth="2" opacity="0.3" />
      <path d="M660 264 L662 352" stroke="#6E7680" strokeWidth="2" opacity="0.3" />
      <path
        d="M286 338 L700 336 L876 342 L874 350 L286 350 Z"
        fill="#1B1F24"
        opacity="0.4"
      />

      <circle cx="320" cy="326" r="80" fill={`url(#${id("arch")})`} />
      <circle cx="838" cy="326" r="84" fill={`url(#${id("arch")})`} />
      <path
        d="M240 326 A 80 80 0 0 1 400 326"
        fill="none"
        stroke="#0C0E11"
        strokeWidth="4"
        opacity="0.6"
      />
      <path
        d="M754 326 A 84 84 0 0 1 922 326"
        fill="none"
        stroke="#0C0E11"
        strokeWidth="4"
        opacity="0.6"
      />

      <g>
        <circle cx="320" cy="326" r="72" fill={`url(#${id("tyre")})`} />
        <circle cx="320" cy="326" r="46" fill={`url(#${id("rim")})`} />
        <circle cx="320" cy="326" r="42" fill="#191D22" />
        {wheel === "aero" ? (
          <g fill="#A7AFB9" opacity="0.7">
            <circle cx="320" cy="326" r="30" fill="#191D22" />
            <circle cx="320" cy="326" r="12" fill="#CBD2DA" />
          </g>
        ) : wheel === "track" ? (
          <g fill="#A7AFB9">
            <path d="M320 288 l6 27 -12 0 z" />
            <path d="M320 364 l6 -27 -12 0 z" />
            <path d="M282 326 l27 6 0 -12 z" />
            <path d="M358 326 l-27 6 0 -12 z" />
            <path d="M293 299 l20 20 -9 9 z" />
            <path d="M347 353 l-20 -20 9 -9 z" />
            <path d="M293 353 l20 -20 -9 -9 z" />
            <path d="M347 299 l-20 20 9 9 z" />
          </g>
        ) : (
          <g fill="#A7AFB9">
            <path d="M320 288 l6 27 -12 0 z" />
            <path d="M320 364 l6 -27 -12 0 z" />
            <path d="M282 326 l27 6 0 -12 z" />
            <path d="M358 326 l-27 6 0 -12 z" />
            <path d="M293 299 l20 20 -9 9 z" />
            <path d="M347 353 l-20 -20 9 -9 z" />
          </g>
        )}
        <circle cx="320" cy="326" r="10" fill="#CBD2DA" />
        <path
          d="M353 298 a46 46 0 0 1 9 35 l-14 -3 a32 32 0 0 0 -6 -24 z"
          fill={accent}
        />
      </g>
      <g>
        <circle cx="838" cy="326" r="76" fill={`url(#${id("tyre")})`} />
        <circle cx="838" cy="326" r="48" fill={`url(#${id("rim")})`} />
        <circle cx="838" cy="326" r="44" fill="#191D22" />
        {wheel === "aero" ? (
          <g fill="#A7AFB9" opacity="0.7">
            <circle cx="838" cy="326" r="32" fill="#191D22" />
            <circle cx="838" cy="326" r="12" fill="#CBD2DA" />
          </g>
        ) : wheel === "track" ? (
          <g fill="#A7AFB9">
            <path d="M838 286 l6 28 -12 0 z" />
            <path d="M838 366 l6 -28 -12 0 z" />
            <path d="M798 326 l28 6 0 -12 z" />
            <path d="M878 326 l-28 6 0 -12 z" />
            <path d="M810 298 l21 21 -9 9 z" />
            <path d="M866 354 l-21 -21 9 -9 z" />
            <path d="M810 354 l21 -21 -9 -9 z" />
            <path d="M866 298 l-21 21 9 9 z" />
          </g>
        ) : (
          <g fill="#A7AFB9">
            <path d="M838 286 l6 28 -12 0 z" />
            <path d="M838 366 l6 -28 -12 0 z" />
            <path d="M798 326 l28 6 0 -12 z" />
            <path d="M878 326 l-28 6 0 -12 z" />
            <path d="M810 298 l21 21 -9 9 z" />
            <path d="M866 354 l-21 -21 9 -9 z" />
          </g>
        )}
        <circle cx="838" cy="326" r="10" fill="#CBD2DA" />
        <path
          d="M872 297 a48 48 0 0 1 9 37 l-14 -3 a34 34 0 0 0 -6 -26 z"
          fill={accent}
        />
      </g>
    </svg>
  );
}
