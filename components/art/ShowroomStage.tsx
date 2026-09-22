import type { ReactNode } from "react";

type ShowroomStageProps = {
  uid: string;
  className?: string;
  intensity?: "hero" | "detail";
  children?: ReactNode;
};

export default function ShowroomStage({
  uid,
  className,
  intensity = "hero",
  children,
}: ShowroomStageProps) {
  const id = (name: string) => `${uid}-${name}`;
  const panelOpacity = intensity === "detail" ? 0.05 : 0.07;
  const vignetteOpacity = intensity === "detail" ? 0.5 : 0.55;

  return (
    <svg
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id("panel")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C6FF33" stopOpacity="0" />
          <stop offset="0.5" stopColor="#C6FF33" stopOpacity="1" />
          <stop offset="1" stopColor="#C6FF33" stopOpacity="0" />
        </linearGradient>
        <filter id={id("panelBlur")} x="-60%" y="-30%" width="220%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <radialGradient id={id("horizon")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0.025" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("floor")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0c0e" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <linearGradient
          id={id("refl")}
          x1="0"
          y1="470"
          x2="0"
          y2="760"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <mask id={id("reflMask")}>
          <rect x="0" y="470" width="1440" height="290" fill={`url(#${id("refl")})`} />
        </mask>
        <filter id={id("coneBlur")} x="-40%" y="-20%" width="180%" height="150%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        <radialGradient id={id("vignette")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000000" stopOpacity="0" />
          <stop offset="0.55" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* background wall */}
      <rect x="0" y="0" width="1440" height="760" fill="#000000" />

      {/* vertical light panels */}
      <g filter={`url(#${id("panelBlur")})`} opacity={panelOpacity}>
        <rect x="180" y="60" width="90" height="460" fill={`url(#${id("panel")})`} />
        <rect x="700" y="60" width="90" height="460" fill={`url(#${id("panel")})`} />
        <rect x="1220" y="60" width="90" height="460" fill={`url(#${id("panel")})`} />
      </g>

      {/* horizon glow */}
      <ellipse cx="720" cy="470" rx="620" ry="150" fill={`url(#${id("horizon")})`} />

      {/* floor */}
      <rect x="0" y="470" width="1440" height="290" fill={`url(#${id("floor")})`} />

      {/* turntable disc */}
      <ellipse cx="720" cy="610" rx="470" ry="96" fill="#111417" />
      <ellipse
        cx="720"
        cy="610"
        rx="470"
        ry="96"
        fill="none"
        stroke="#C6FF33"
        strokeOpacity="0.25"
        strokeWidth="2"
      />

      {/* floor grid lines, fading with distance */}
      <g
        mask={`url(#${id("reflMask")})`}
        stroke="#FFFFFF"
        strokeOpacity="0.05"
        strokeWidth="1.5"
      >
        <line x1="0" y1="520" x2="1440" y2="520" />
        <line x1="0" y1="570" x2="1440" y2="570" />
        <line x1="0" y1="640" x2="1440" y2="640" />
        <line x1="0" y1="720" x2="1440" y2="720" />
      </g>

      {/* spotlight cones */}
      <g filter={`url(#${id("coneBlur")})`} fill="#FFFFFF" opacity="0.05">
        <path d="M120 0 L620 600 L820 600 Z" />
        <path d="M1320 0 L820 600 L620 600 Z" />
      </g>

      {/* foreground vignette */}
      <ellipse
        cx="720"
        cy="560"
        rx="820"
        ry="420"
        fill={`url(#${id("vignette")})`}
        opacity={vignetteOpacity}
      />

      {/* car / composited content */}
      <g>{children}</g>
    </svg>
  );
}
