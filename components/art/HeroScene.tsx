import CarSide from "./CarSide";

export default function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 280 1440 540"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7FAFD" />
          <stop offset="0.42" stopColor="#E6EEF6" />
          <stop offset="0.78" stopColor="#D6E2ED" />
          <stop offset="1" stopColor="#CFDCE9" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C1D1E3" />
          <stop offset="1" stopColor="#D4E0EC" />
        </linearGradient>
        <linearGradient id="hero-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ACC0D5" />
          <stop offset="1" stopColor="#C4D3E2" />
        </linearGradient>
        <linearGradient id="hero-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9E2EA" />
          <stop offset="0.3" stopColor="#E6ECF2" />
          <stop offset="1" stopColor="#F7F9FB" />
        </linearGradient>
        <linearGradient id="hero-concrete" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#F5F6F8" />
          <stop offset="1" stopColor="#D2D7DD" />
        </linearGradient>
        <linearGradient id="hero-glasspanel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#BACBDE" />
          <stop offset="0.5" stopColor="#9CB2C8" />
          <stop offset="1" stopColor="#C8D7E5" />
        </linearGradient>
        <linearGradient id="hero-refl" x1="0" y1="575" x2="0" y2="800" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <mask id="hero-refl-mask">
          <rect x="0" y="575" width="1440" height="245" fill="url(#hero-refl)" />
        </mask>
        <filter id="hero-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="hero-haze" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      <rect x="0" y="0" width="1440" height="820" fill="url(#hero-sky)" />
      <ellipse cx="1090" cy="392" rx="430" ry="280" fill="url(#hero-sun)" />

      {/* distant mountains */}
      <path
        d="M-40 585 L120 400 L250 500 L380 372 L520 505 L640 430 L760 585 Z"
        fill="url(#hero-far)"
        opacity="0.8"
        filter="url(#hero-haze)"
      />
      <path
        d="M520 585 L650 420 L780 505 L900 392 L1040 512 L1160 452 L1400 585 Z"
        fill="url(#hero-far)"
        opacity="0.62"
        filter="url(#hero-haze)"
      />
      <path
        d="M-40 590 L150 470 L320 548 L470 448 L660 590 Z"
        fill="url(#hero-near)"
        opacity="0.85"
      />
      <path
        d="M780 590 L950 486 L1120 552 L1260 480 L1460 590 Z"
        fill="url(#hero-near)"
        opacity="0.7"
      />

      {/* modern concrete + glass showroom */}
      <g transform="translate(880 320)" opacity="0.94">
        {/* glass curtain wall */}
        <path d="M0 240 L470 196 L500 196 L500 240 Z" fill="#B9CADC" opacity="0.55" />
        <path d="M0 240 L0 152 L38 146 L38 240 Z" fill="#A9BCD0" opacity="0.5" />
        <rect x="24" y="150" width="452" height="92" rx="6" fill="url(#hero-glasspanel)" opacity="0.85" />
        <g stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.4">
          <line x1="80" y1="148" x2="80" y2="242" />
          <line x1="136" y1="142" x2="136" y2="242" />
          <line x1="192" y1="137" x2="192" y2="242" />
          <line x1="248" y1="131" x2="248" y2="242" />
          <line x1="304" y1="126" x2="304" y2="242" />
          <line x1="360" y1="120" x2="360" y2="242" />
          <line x1="416" y1="115" x2="416" y2="242" />
        </g>
        <path d="M24 130 L476 88 L476 104 L24 146 Z" fill="#FFFFFF" opacity="0.5" />
        {/* sweeping roof slab */}
        <path d="M-40 130 C120 96 360 78 540 74 L540 96 C360 100 130 118 -20 152 Z" fill="url(#hero-concrete)" />
        <path d="M-40 130 C120 96 360 78 540 74 L540 80 C360 84 122 102 -24 136 Z" fill="#FFFFFF" opacity="0.7" />
        {/* columns */}
        <g fill="#E8EBEE">
          <rect x="40" y="146" width="10" height="96" />
          <rect x="216" y="130" width="10" height="112" />
          <rect x="392" y="116" width="10" height="126" />
        </g>
        {/* podium */}
        <rect x="-40" y="240" width="580" height="16" fill="#C6CBD1" />
      </g>

      {/* horizon haze */}
      <rect x="0" y="548" width="1440" height="34" fill="#FFFFFF" opacity="0.55" filter="url(#hero-haze)" />

      {/* floor */}
      <rect x="0" y="575" width="1440" height="245" fill="url(#hero-floor)" />
      <g opacity="0.45" stroke="#C4CDD7" strokeWidth="1">
        <line x1="0" y1="606" x2="1440" y2="606" />
        <line x1="0" y1="648" x2="1440" y2="648" />
        <line x1="0" y1="706" x2="1440" y2="706" />
        <line x1="0" y1="778" x2="1440" y2="778" />
      </g>
      <ellipse cx="720" cy="580" rx="620" ry="26" fill="#8D99A6" opacity="0.24" filter="url(#hero-soft)" />

      {/* mirrored reflection */}
      <g mask="url(#hero-refl-mask)" opacity="0.34">
        <g transform="translate(0 1150) scale(1 -1)">
          <CarSide
            uid="hero-refl"
            decorative
            shadow={false}
            x={220}
            y={240}
            width={1000}
            height={383}
          />
        </g>
      </g>

      {/* car */}
      <CarSide
        uid="hero-car"
        x={220}
        y={240}
        width={1000}
        height={383}
        label="VOLTSPRINT performance coupe, three-quarter front view"
      />
    </svg>
  );
}
