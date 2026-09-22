import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function Play(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function Bolt(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M13.6 2 5 13.2h5.1L9.4 22 18 10.8h-5.1z" />
    </svg>
  );
}

export function Quote(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M9.8 5.6c-3.4 1.5-5.6 4.5-5.6 8.3 0 2.9 1.7 4.5 3.9 4.5 2 0 3.5-1.4 3.5-3.3 0-1.9-1.3-3.1-3-3.1-.3 0-.6 0-.9.1.4-1.7 1.7-3.2 3.5-4.2zM19 5.6c-3.4 1.5-5.6 4.5-5.6 8.3 0 2.9 1.7 4.5 3.9 4.5 2 0 3.5-1.4 3.5-3.3 0-1.9-1.3-3.1-3-3.1-.3 0-.6 0-.9.1.4-1.7 1.7-3.2 3.5-4.2z" />
    </svg>
  );
}

export function Gauge(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21a9 9 0 1 1 9-9" />
      <path d="M12 12l4.5-3.5" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Battery(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="8" width="16" height="9" rx="2.4" />
      <path d="M21 11.5v2" />
      <path d="M12.2 9.6l-2 3.1h2.4l-1.6 2.8" />
    </svg>
  );
}

export function Route(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="18.5" r="2.5" />
      <circle cx="18" cy="5.5" r="2.5" />
      <path d="M8.5 18.5h5.2a3.3 3.3 0 0 0 0-6.6H10a3.3 3.3 0 0 1 0-6.4h5.5" />
    </svg>
  );
}

export function Sun(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </svg>
  );
}

export function Leaf(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 19.5c0-8 5.5-13 15-13.5.6 8.6-4.4 14-12 14" />
      <path d="M4.8 19.2C8 15.5 11.6 13 16 11.5" />
    </svg>
  );
}

export function Recycle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8.5 5.2l2.1-3.4a1.7 1.7 0 0 1 2.9 0l2.1 3.4" />
      <path d="M6 9.5L3.4 13.9a1.7 1.7 0 0 0 1.4 2.6h3.4" />
      <path d="M18.4 16.5h2.2a1.7 1.7 0 0 0 1.4-2.6l-1.7-2.8" />
      <path d="M9.4 21l-2.3-2.3 2.3-2.3" />
      <path d="M17.2 13.5l1.6 2.3-2.6 1.2" />
      <path d="M11 6.6l2.6 1.2-1.2 2.6" />
    </svg>
  );
}

export function Cpu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 10.5h4v4h-4z" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v5.5c0 4.3-2.9 8.2-7 9.5-4.1-1.3-7-5.2-7-9.5V6z" />
      <path d="M9 12l2.2 2.2L15 10" />
    </svg>
  );
}

export function Plug(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3v5M15 3v5" />
      <path d="M6.5 8h11v2.5a5.5 5.5 0 0 1-5.5 5.5 5.5 5.5 0 0 1-5.5-5.5z" />
      <path d="M12 16v5" />
    </svg>
  );
}

export function Home(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 10.5L12 4l8 6.5" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10.5 20v-5h3v5" />
    </svg>
  );
}

export function PaperPlane(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21 4L3 11l7 2.5L13 21z" />
      <path d="M21 4l-9.5 11" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3.5h3l1.3 3.4-1.9 1.5a12 12 0 0 0 5.7 5.7l1.5-1.9 3.4 1.3v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.4" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function Pause(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
      <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
    </svg>
  );
}

export function Volume2(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

export function VolumeX(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </svg>
  );
}

export function ShieldCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}


export function Fuel(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <line x1="3" y1="22" x2="15" y2="22" />
      <line x1="4" y1="9" x2="14" y2="9" />
      <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
      <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
    </svg>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.18-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.489-.893-.796-1.496-1.78-1.671-2.08-.175-.3-.019-.462.13-.611.136-.134.301-.35.451-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.628-.925-2.228-.244-.585-.492-.506-.675-.515-.175-.008-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.028-1.05 2.506s1.075 2.905 1.225 3.105c.15.2 2.115 3.23 5.124 4.53.716.31 1.275.495 1.71.633.719.228 1.374.196 1.891.119.577-.087 1.78-.727 2.03-1.429.25-.701.25-1.303.175-1.429-.075-.126-.275-.201-.575-.351zM12.004 2C6.48 2 2 6.48 2 12c0 1.84.5 3.565 1.373 5.05L2 22l5.093-1.336C8.528 21.49 10.207 22 12.004 22c5.523 0 10.003-4.48 10.003-10s-4.48-10-10.003-10z" />
    </svg>
  );
}

export function StarFilled(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

