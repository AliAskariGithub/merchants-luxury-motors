export type Paint = {
  id: string;
  name: string;
  hex: string;
  price: number;
};

export type WheelStyle = "aero" | "sport" | "track" | "luxury" | "offroad";

export type Wheel = {
  id: string;
  name: string;
  size: 18 | 19 | 20 | 21 | 22;
  style: WheelStyle;
  hex: string;
  price: number;
};

export type Interior = {
  id: string;
  name: string;
  material: string;
  trimHex: string;
  accentHex: string;
  price: number;
};

export type Pack = {
  id: string;
  name: string;
  blurb: string;
  price: number;
};

export type CarSpecs = {
  power: string;
  torque: string;
  range: string;
  sprint: string;
  charge: string;
  drivetrain: string;
  topSpeed: string;
  seats: number;
  weight: string;
  fuelEconomy: string;
  transmission: string;
  engine: string;
};

export type KeyFeatureGroup = {
  category: string;
  items: string[];
};

export type Car = {
  slug: string;
  name: string;
  shortName: string;
  brand: string;
  year: number;
  category: string;
  tagline: string;
  condition: string;
  registration: string;
  mileage: string;
  cplcStatus: string;
  auctionGrade: string;
  pricePkr: number;
  priceFormatted: string;
  basePrice: number; // For compatibility
  summary: string;
  specs: CarSpecs;
  heroImage: string;
  exteriorImages: string[];
  interiorImages: string[];
  videoUrl: string;
  keyFeatures: KeyFeatureGroup[];
  paints: Paint[];
  wheels: Wheel[];
  interiors: Interior[];
  packs: Pack[];
  story: { heading: string; body: string }[];
};

export const cars: Car[] = [
  {
    slug: "toyota-corolla-altis-grande",
    name: "Toyota Corolla Altis Grande 1.8 CVT-i 2024",
    shortName: "Corolla Grande",
    brand: "Toyota",
    year: 2024,
    category: "Executive Sedan",
    tagline: "Pakistan's Undisputed #1 Executive Sedan with Unrivaled Reliability.",
    condition: "Brand New / Zero Meter",
    registration: "Unregistered (Sindh Biometric Available On-Spot)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Indus Motor Company Certified Genuine",
    pricePkr: 7550000,
    priceFormatted: "₨ 75.50 Lakh",
    basePrice: 7550000,
    summary:
      "The Toyota Corolla Altis Grande is Pakistan's most sought-after executive sedan. Featuring a smooth 1.8L Dual VVT-i engine, sunroof, paddle shifters, beige leather upholstery, and rock-solid resale value across Karachi and nationwide.",
    specs: {
      power: "138 hp @ 6,400 rpm",
      torque: "173 Nm @ 4,000 rpm",
      range: "680 km (55L Fuel Tank)",
      sprint: "10.2 s (0–100 km/h)",
      charge: "12V 45Ah Maintenance-Free Battery",
      drivetrain: "Front-Wheel Drive (FWD)",
      topSpeed: "195 km/h",
      seats: 5,
      weight: "1,275 kg",
      fuelEconomy: "12.5–16.0 km/L",
      transmission: "7-Speed Super CVT-i with Sport Mode",
      engine: "1.8L 2ZR-FE 16-Valve Dual VVT-i",
    },
    heroImage: "/cars/toyota-corolla-altis-grande.jpg",
    exteriorImages: [
      "/cars/toyota-corolla-altis-grande.jpg",
      "/cars/toyota-corolla-altis-grande.jpg",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    keyFeatures: [
      {
        category: "Performance & Powertrain",
        items: [
          "1.8L Dual VVT-i Petrol Engine",
          "7-Speed Super CVT-i Transmission with Paddle Shifters",
          "Cruise Control & Eco Drive Indicator",
          "Front MacPherson Strut & Rear Torsion Beam Suspension",
        ],
      },
      {
        category: "Interior & Comfort",
        items: [
          "Electric Sunroof with Anti-Jam Function",
          "9-inch Touchscreen Infotainment with Navigation",
          "Beige Leather Stitched Ergonomic Seats",
          "Automatic Climate Control with Digital Display",
        ],
      },
      {
        category: "Safety & Karachi Security",
        items: [
          "Vehicle Stability Control (VSC) & Traction Control (TRC)",
          "Dual Front SRS Airbags with Pre-Tensioners",
          "Rearview Camera with Dynamic Parking Guidelines",
          "Engine Immobilizer with Anti-Theft Siren",
        ],
      },
    ],
    paints: [
      { id: "super-white", name: "Super White", hex: "#FFFFFF", price: 0 },
      { id: "attitude-black", name: "Attitude Black Mica", hex: "#0A0A0A", price: 45000 },
      { id: "silver-metallic", name: "Silver Metallic", hex: "#C0C0C0", price: 35000 },
      { id: "graphite-grey", name: "Graphite Grey Metallic", hex: "#4A4A4A", price: 45000 },
      { id: "phantom-brown", name: "Phantom Brown Metallic", hex: "#3D2B1F", price: 45000 },
      { id: "celestite-grey", name: "Celestite Grey", hex: "#687884", price: 45000 },
    ],
    wheels: [
      { id: "wheel-18-stock", name: "18\" OEM Diamond Cut Alloys", size: 18, style: "sport", hex: "#A8A8A8", price: 0 },
      { id: "wheel-18-modellista", name: "18\" Modellista Precision Dark Machined", size: 18, style: "luxury", hex: "#1C1C1C", price: 120000 },
      { id: "wheel-19-trd", name: "19\" TRD Sport Gunmetal Spokes", size: 19, style: "track", hex: "#4A4A4A", price: 185000 },
    ],
    interiors: [
      { id: "int-ivory-beige", name: "Ivory Beige Premium Leather", material: "Fine Perforated Leather", trimHex: "#E3DAC9", accentHex: "#2A2A2A", price: 0 },
      { id: "int-obsidian-black", name: "Obsidian Black Executive Leather", material: "Black Leather with Contrast Stitch", trimHex: "#1A1A1A", accentHex: "#C5A059", price: 85000 },
      { id: "int-cognac-dual", name: "Dual-Tone Cognac & Charcoal", material: "Top-Grain Saddle Hide", trimHex: "#8B5A2B", accentHex: "#1A1A1A", price: 110000 },
      { id: "int-slate-alcantara", name: "Dark Slate Alcantara Sport", material: "Breathable Alcantara / Microfiber", trimHex: "#363636", accentHex: "#C5A059", price: 140000 },
    ],
    packs: [
      { id: "ceramic-pakistan-pack", name: "Karachi Coastal 9H Ceramic Shield", blurb: "Complete 3-layer nano-ceramic coating with rust proofing against coastal sea breeze.", price: 110000 },
      { id: "camera-360-pack", name: "360° HD Bird-View Camera & Dashcam", blurb: "Four ultra-wide HD cameras with continuous recording for Karachi traffic navigation.", price: 85000 },
      { id: "comfort-executive-pack", name: "Executive Ventilated Front Seats", blurb: "Dual-speed seat cooling cushions and high-speed Qi wireless charging tray.", price: 135000 },
    ],
    story: [
      {
        heading: "The Undisputed King of Resale & Durability in Pakistan",
        body: "For over two decades, the Toyota Corolla Grande has set the benchmark for Pakistani executive driving. Built to withstand local roads while delivering a plush suspension setup, it remains the gold standard in automotive value.",
      },
      {
        heading: "On-Spot Sindh Biometric Delivery on Khalid Bin Waleed Road",
        body: "Inspect this brand new Corolla Grande on our showroom floor. Complete original Indus Motor Company documentation and on-spot biometric verification guarantee effortless ownership transition within 15 minutes.",
      },
    ],
  },
  {
    slug: "honda-civic-rs-turbo",
    name: "Honda Civic RS 1.5L VTEC Turbo 2024",
    shortName: "Civic RS Turbo",
    brand: "Honda",
    year: 2024,
    category: "Sport Sedan",
    tagline: "The Benchmark of Style, Honda Sensing®, and Turbocharged Thrills.",
    condition: "Brand New / Zero Meter",
    registration: "Unregistered (Sindh Biometric Available On-Spot)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Honda Atlas Cars Pakistan Certified Genuine",
    pricePkr: 9890000,
    priceFormatted: "₨ 98.90 Lakh",
    basePrice: 9890000,
    summary:
      "The 11th Generation Honda Civic RS Turbo is the ultimate enthusiast sedan in Pakistan. Powered by a 1.5L turbocharged engine pushing 176 hp, equipped with Honda Sensing® ADAS suite, dual exhaust tips, matte black spoiler, and black suede interior.",
    specs: {
      power: "176 hp @ 6,000 rpm",
      torque: "220 Nm @ 1,700–4,500 rpm",
      range: "620 km (47L Fuel Tank)",
      sprint: "8.1 s (0–100 km/h)",
      charge: "12V 55Ah Enhanced Flooded Battery",
      drivetrain: "Front-Wheel Drive (FWD)",
      topSpeed: "215 km/h",
      seats: 5,
      weight: "1,340 kg",
      fuelEconomy: "11.5–14.5 km/L",
      transmission: "LL-CVT with Dual Paddle Shifters",
      engine: "1.5L DOHC VTEC Turbocharged 4-Cylinder",
    },
    heroImage: "/cars/honda-civic-rs-turbo.jpg",
    exteriorImages: [
      "/cars/honda-civic-rs-turbo.jpg",
      "/cars/honda-civic-rs-turbo.jpg",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    keyFeatures: [
      {
        category: "Performance & Powertrain",
        items: [
          "1.5L VTEC Turbocharged Engine (176 hp / 220 Nm)",
          "Sport Drive Mode with Dual Paddle Shifters",
          "Dual Chrome Exhaust Tips with RS Rear Diffuser",
          "Precision-tuned Electric Power Steering",
        ],
      },
      {
        category: "Honda Sensing® Driver Assist",
        items: [
          "Collision Mitigation Braking System (CMBS)",
          "Adaptive Cruise Control (ACC) with Low-Speed Follow",
          "Lane Keeping Assist System (LKAS)",
          "Lead Car Departure Notification (LCDN)",
        ],
      },
      {
        category: "Interior & Technology",
        items: [
          "RS Exclusive Red Stitched Leather & Suede Seats",
          "9-inch Advanced Display Audio with Wireless Apple CarPlay",
          "7-inch Full Colour TFT Multi-Information Meter",
          "One-Touch Electric Sunroof & Ambient Lighting",
        ],
      },
    ],
    paints: [
      { id: "taffeta-white", name: "Taffeta White", hex: "#F5F5F5", price: 0 },
      { id: "crystal-black", name: "Crystal Black Pearl", hex: "#0E0E0E", price: 45000 },
      { id: "lunar-silver", name: "Lunar Silver Metallic", hex: "#C8C8C8", price: 0 },
      { id: "meteoroid-grey", name: "Meteoroid Grey Metallic", hex: "#4B4D52", price: 45000 },
      { id: "carnelian-red", name: "Carnelian Red Pearl", hex: "#8A1C14", price: 45000 },
      { id: "morning-mist", name: "Morning Mist Blue Metallic", hex: "#7A8B99", price: 45000 },
    ],
    wheels: [
      { id: "wheel-18-rs-black", name: "18\" Matte Berlina Black RS Alloys", size: 18, style: "sport", hex: "#151515", price: 0 },
      { id: "wheel-18-hpd-machined", name: "18\" HPD Dual-Tone Diamond Cut", size: 18, style: "luxury", hex: "#3A3A3A", price: 130000 },
      { id: "wheel-19-mugen-forged", name: "19\" Mugen Style Track Forged", size: 19, style: "track", hex: "#1F1F1F", price: 210000 },
    ],
    interiors: [
      { id: "int-rs-suede-red", name: "RS Black Suede with Red Contrast Stitch", material: "Perforated Suede & Hide", trimHex: "#121212", accentHex: "#C8102E", price: 0 },
      { id: "int-black-pure-leather", name: "Full Jet Black Perforated Leather", material: "Executive Napa Hide", trimHex: "#1A1A1A", accentHex: "#888888", price: 90000 },
      { id: "int-cognac-sport", name: "Saddle Cognac Sport Interior", material: "Full Grain Cognac Leather", trimHex: "#7A4926", accentHex: "#1A1A1A", price: 120000 },
      { id: "int-carbon-slate", name: "Carbon Weave & Charcoal Suede", material: "Carbon Fiber & Microfiber", trimHex: "#2B2B2B", accentHex: "#C8102E", price: 150000 },
    ],
    packs: [
      { id: "hpd-styling-pack", name: "HPD Aerodynamic Sport Package", blurb: "OEM front underbody spoiler, side skirts, and aggressive rear trunk spoiler.", price: 145000 },
      { id: "ceramic-sound-pack", name: "Acoustic Insulation & 9H Ceramic Shield", blurb: "4-door sound damping matting with 5-year hydrophobic ceramic paint protection.", price: 125000 },
      { id: "ventilated-remote-pack", name: "Remote Engine Start & Smart Key Suite", blurb: "Pre-cool car cabin remotely before stepping in with walk-away auto lock.", price: 65000 },
    ],
    story: [
      {
        heading: "The Pinnacle of Sedans on Pakistani Highways",
        body: "The 11th Gen Civic RS redefines the midsize performance market. From the M-9 Motorway to Clifton's coastline, its low, wide stance and responsive turbo punch make every drive exhilarating.",
      },
      {
        heading: "Factory Warranty with Verified Biometric Ready Papers",
        body: "Available zero-meter at our Khalid Bin Waleed showroom floor with complete Honda warranty documents, CPLC verification certificate, and immediate biometric transfer.",
      },
    ],
  },
  {
    slug: "honda-city-aspire",
    name: "Honda City 1.5L Aspire CVT 2024",
    shortName: "City Aspire 1.5",
    brand: "Honda",
    year: 2024,
    category: "Compact Sedan",
    tagline: "Pakistan's Favorite Executive Family Sedan with Spacious Elegance.",
    condition: "Brand New / Zero Meter",
    registration: "Unregistered (Sindh Biometric Available On-Spot)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Honda Atlas Certified Genuine",
    pricePkr: 5850000,
    priceFormatted: "₨ 58.50 Lakh",
    basePrice: 5850000,
    summary:
      "The top-tier Honda City 1.5L Aspire CVT combines refined i-VTEC efficiency with best-in-class rear legroom. Features push-button start, chrome door handles, cruise control, beige upholstery, and modern digital instrument display.",
    specs: {
      power: "119 hp @ 6,600 rpm",
      torque: "145 Nm @ 4,300 rpm",
      range: "650 km (40L Fuel Tank)",
      sprint: "10.8 s (0–100 km/h)",
      charge: "12V 38Ah Maintenance-Free Battery",
      drivetrain: "Front-Wheel Drive (FWD)",
      topSpeed: "190 km/h",
      seats: 5,
      weight: "1,178 kg",
      fuelEconomy: "13.5–17.0 km/L",
      transmission: "CVT with Earth Dreams Technology",
      engine: "1.5L SOHC i-VTEC 16-Valve 4-Cylinder",
    },
    heroImage: "/cars/honda-city-aspire.jpg",
    exteriorImages: [
      "/cars/honda-city-aspire.jpg",
      "/cars/honda-city-aspire.jpg",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    keyFeatures: [
      {
        category: "Engine & Performance",
        items: [
          "1.5L i-VTEC 16-Valve SOHC Engine",
          "CVT with Earth Dreams Technology",
          "Cruise Control with Steering Mounted Switches",
          "Drive-By-Wire Throttle Control System",
        ],
      },
      {
        category: "Aspire Flagship Luxury",
        items: [
          "Smart Keyless Entry with Engine Push Start",
          "9-inch Capacitive Touchscreen with MirrorLink",
          "Automatic Climate Control with Touch Interface",
          "Premium Beige Fabric & Soft-Padded Dashboard",
        ],
      },
      {
        category: "Safety & Security",
        items: [
          "Dual Front SRS Airbags",
          "Anti-Lock Braking System (ABS) with EBD",
          "Reverse Parking Camera with Static Guidelines",
          "Security Alarm System with Ultrasonic Sensor",
        ],
      },
    ],
    paints: [
      { id: "city-taffeta-white", name: "Taffeta White", hex: "#FFFFFF", price: 0 },
      { id: "city-crystal-black", name: "Crystal Black Pearl", hex: "#0D0D0D", price: 35000 },
      { id: "city-lunar-silver", name: "Lunar Silver Metallic", hex: "#C7C7C7", price: 0 },
      { id: "city-modern-steel", name: "Modern Steel Metallic", hex: "#4E5357", price: 0 },
      { id: "city-carnelian-red", name: "Carnelian Red Pearl", hex: "#8F1D14", price: 35000 },
      { id: "city-urban-titanium", name: "Urban Titanium Metallic", hex: "#5C5248", price: 35000 },
    ],
    wheels: [
      { id: "wheel-18-city-oem", name: "18\" Multi-Spoke OEM Diamond Cut", size: 18, style: "luxury", hex: "#A5A5A5", price: 0 },
      { id: "wheel-18-city-sport", name: "18\" Gunmetal Dual-Tone Alloys", size: 18, style: "sport", hex: "#2E2E2E", price: 85000 },
      { id: "wheel-19-city-black", name: "19\" Gloss Black Aero Mesh", size: 19, style: "aero", hex: "#141414", price: 140000 },
    ],
    interiors: [
      { id: "int-city-ivory", name: "Ivory Beige Soft Stitched Fabric", material: "High-Grade Breathable Fabric", trimHex: "#EAE0D0", accentHex: "#222222", price: 0 },
      { id: "int-city-black-leather", name: "Charcoal Black Leatherette", material: "Perforated Premium Leatherette", trimHex: "#1F1F1F", accentHex: "#C5A059", price: 65000 },
      { id: "int-city-tan-dual", name: "Caramel Tan & Charcoal Dual-Tone", material: "Artisan Stitched Hide", trimHex: "#8C5932", accentHex: "#1A1A1A", price: 85000 },
      { id: "int-city-slate-grey", name: "Slate Grey Technical Fabric", material: "Reinforced Stain-Resistant Weave", trimHex: "#454545", accentHex: "#FFFFFF", price: 50000 },
    ],
    packs: [
      { id: "city-protection-pack", name: "Karachi Monsoons & Coastal Shield", blurb: "Rust-inhibiting undercoat, ceramic wax layer, and heavy-duty 7D floor liners.", price: 65000 },
      { id: "city-camera-pack", name: "Dual-Channel FHD Recording Dashcam", blurb: "Discreet front & rear recording with emergency parking sensor surveillance.", price: 45000 },
      { id: "city-comfort-pack", name: "Rear Window Sunshades & Ambient LED", blurb: "Magnetic UV-blocking window shades with gentle footwell ambient lighting.", price: 35000 },
    ],
    story: [
      {
        heading: "The Supreme Daily Driver in Pakistani Cities",
        body: "The Honda City Aspire delivers effortless fuel economy with an airy, quiet passenger cabin. It glides through Karachi traffic effortlessly and offers spacious boot capacity for long family trips.",
      },
      {
        heading: "Ready for Prompt Showroom Delivery",
        body: "Fully checked by our Khalid Bin Waleed technical team. Zero waiting period, invoice clearance verified, and direct biometric transfer available on spot.",
      },
    ],
  },
  {
    slug: "suzuki-alto-vxl",
    name: "Suzuki Alto 660cc VXL AGS 2024",
    shortName: "Alto VXL AGS",
    brand: "Suzuki",
    year: 2024,
    category: "Economy Hatchback",
    tagline: "Pakistan's #1 Selling Car with Unbeatable Fuel Economy and City Agility.",
    condition: "Brand New / Zero Meter",
    registration: "Unregistered (Sindh Biometric Available On-Spot)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Pak Suzuki Certified Genuine",
    pricePkr: 3050000,
    priceFormatted: "₨ 30.50 Lakh",
    basePrice: 3050000,
    summary:
      "The Suzuki Alto 660cc VXL AGS is the absolute number one best-selling vehicle in Pakistan by sales volume. Providing legendary fuel mileage of over 20 km/L, Auto Gear Shift (AGS), dual airbags, ABS, and air-conditioning.",
    specs: {
      power: "53 hp @ 6,500 rpm",
      torque: "63 Nm @ 4,000 rpm",
      range: "560 km (27L Fuel Tank)",
      sprint: "14.5 s (0–100 km/h)",
      charge: "12V 28Ah Maintenance-Free Battery",
      drivetrain: "Front-Wheel Drive (FWD)",
      topSpeed: "145 km/h",
      seats: 4,
      weight: "730 kg",
      fuelEconomy: "18.5–22.5 km/L",
      transmission: "5-Speed Auto Gear Shift (AGS)",
      engine: "660cc R06A DOHC 3-Cylinder VVT",
    },
    heroImage: "/cars/suzuki-alto-vxl.jpg",
    exteriorImages: [
      "/cars/suzuki-alto-vxl.jpg",
      "/cars/suzuki-alto-vxl.jpg",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    keyFeatures: [
      {
        category: "Economy & Efficiency",
        items: [
          "660cc High-Efficiency R06A Engine",
          "5-Speed Auto Gear Shift (AGS) with Manual Override",
          "Electronic Power Steering (EPS)",
          "Over 20 km/L Real-World City Fuel Economy",
        ],
      },
      {
        category: "VXL Top-Trim Features",
        items: [
          "Factory Air Conditioning with Fast Cooling",
          "Dual Front SRS Airbags with ABS Brakes",
          "Power Windows with Driver Auto-Down",
          "Touchscreen Infotainment with Bluetooth",
        ],
      },
      {
        category: "Urban Karachi Commuter",
        items: [
          "Ultra-compact 4.2m turning radius for tight Karachi lanes",
          "High ground clearance engineered for speed breakers",
          "Lowest maintenance cost of any passenger car in Pakistan",
          "Everywhere spare parts availability across Saddar & PECHS",
        ],
      },
    ],
    paints: [
      { id: "alto-solid-white", name: "Solid White", hex: "#FFFFFF", price: 0 },
      { id: "alto-silky-silver", name: "Silky Silver Metallic", hex: "#C5C5C5", price: 0 },
      { id: "alto-graphite-grey", name: "Graphite Grey Metallic", hex: "#4A4D50", price: 0 },
      { id: "alto-pearl-black", name: "Pearl Black", hex: "#111111", price: 25000 },
      { id: "alto-cerulean-blue", name: "Cerulean Blue", hex: "#2B5380", price: 25000 },
      { id: "alto-sand-beige", name: "Sand Beige Metallic", hex: "#D6C7A8", price: 25000 },
    ],
    wheels: [
      { id: "wheel-18-alto-oem", name: "18\" Lightweight City Alloys", size: 18, style: "aero", hex: "#B0B0B0", price: 0 },
      { id: "wheel-18-alto-gunmetal", name: "18\" Matte Gunmetal Multi-Spoke", size: 18, style: "sport", hex: "#3D3D3D", price: 45000 },
      { id: "wheel-19-alto-black", name: "19\" Gloss Black Urban Spoke", size: 19, style: "luxury", hex: "#171717", price: 80000 },
    ],
    interiors: [
      { id: "int-alto-charcoal", name: "Charcoal Grey Durable Weave", material: "Reinforced Fabric", trimHex: "#353535", accentHex: "#999999", price: 0 },
      { id: "int-alto-black-leather", name: "Executive Black Leatherette", material: "Easy-Clean Fitted Leatherette", trimHex: "#1B1B1B", accentHex: "#C5A059", price: 35000 },
      { id: "int-alto-dual-beige", name: "Warm Beige & Grey Dual-Tone", material: "Dual-Tone Fabric", trimHex: "#D5C8B0", accentHex: "#222222", price: 45000 },
      { id: "int-alto-sport-slate", name: "Slate Grey Sport Stitch", material: "Sport Weave Fabric", trimHex: "#454545", accentHex: "#E53E3E", price: 40000 },
    ],
    packs: [
      { id: "alto-security-pack", name: "CPLC Tracker & Security Siren", blurb: "PTA-approved satellite tracker device with Karachi 24/7 call center monitoring.", price: 38000 },
      { id: "alto-cooling-pack", name: "UV Nano-Ceramic Window Tint", blurb: "Heat rejection film for the windscreen and side windows to reduce Karachi AC load.", price: 22000 },
      { id: "alto-utility-pack", name: "Armrest Console & Floor Liners", blurb: "Center storage armrest box with USB charging ports and heavy-duty rubber floor trays.", price: 18000 },
    ],
    story: [
      {
        heading: "The Undisputed National Mileage Champion",
        body: "Nothing matches the Suzuki Alto VXL AGS for daily urban travel in Pakistan. With fuel costs rising, its 20+ km/L efficiency makes it the smartest financial decision for families and corporate fleets alike.",
      },
      {
        heading: "Instant Handover at Our Showroom",
        body: "Brand new zero-meter unit available immediately at Khalid Bin Waleed Road. Bypass months of factory booking delay and take immediate delivery with transparent Sindh documentation.",
      },
    ],
  },
  {
    slug: "toyota-yaris-ativ-x",
    name: "Toyota Yaris ATIV X 1.5L CVT 2024",
    shortName: "Yaris ATIV X",
    brand: "Toyota",
    year: 2024,
    category: "Compact Sedan",
    tagline: "Dynamic Styling, 7 Airbags, and Effortless Urban Driving in Pakistan.",
    condition: "Brand New / Zero Meter",
    registration: "Unregistered (Sindh Biometric Available On-Spot)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Indus Motor Company Certified Genuine",
    pricePkr: 6320000,
    priceFormatted: "₨ 63.20 Lakh",
    basePrice: 6320000,
    summary:
      "The Toyota Yaris ATIV X 1.5L CVT is Pakistan's premier modern compact sedan. Offering 7 SRS airbags, push start, climate control, Optitron speedometer with 4.2-inch TFT display, and legendary Toyota endurance.",
    specs: {
      power: "106 hp @ 6,000 rpm",
      torque: "140 Nm @ 4,200 rpm",
      range: "640 km (42L Fuel Tank)",
      sprint: "11.0 s (0–100 km/h)",
      charge: "12V 42Ah Maintenance-Free Battery",
      drivetrain: "Front-Wheel Drive (FWD)",
      topSpeed: "185 km/h",
      seats: 5,
      weight: "1,145 kg",
      fuelEconomy: "13.0–16.5 km/L",
      transmission: "7-Speed Sport Sequential Shiftmatic CVT",
      engine: "1.5L 2NR-FE Dual VVT-i 16-Valve",
    },
    heroImage: "/cars/toyota-yaris-ativ-x.jpg",
    exteriorImages: [
      "/cars/toyota-yaris-ativ-x.jpg",
      "/cars/toyota-yaris-ativ-x.jpg",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    keyFeatures: [
      {
        category: "Performance & Powertrain",
        items: [
          "1.5L Dual VVT-i 16-Valve Engine",
          "7-Speed Sequential Shiftmatic CVT Transmission",
          "Eco & Sport Drive Mode Selectors",
          "Hill-Start Assist Control (HAC)",
        ],
      },
      {
        category: "Safety & Airbags",
        items: [
          "7 SRS Airbags (Front, Side, Curtain & Driver Knee)",
          "Vehicle Stability Control (VSC) & Traction Control (TRC)",
          "ABS with Electronic Brake-force Distribution (EBD)",
          "Front & Rear Parking Clearance Sonars",
        ],
      },
      {
        category: "Comfort & Features",
        items: [
          "Smart Entry with Engine Push Start",
          "Automatic Climate Control with Digital Touch Display",
          "Optitron Meter with 4.2-inch Color TFT MID",
          "LED Daytime Running Lights & Bi-Beam Headlamps",
        ],
      },
    ],
    paints: [
      { id: "yaris-super-white", name: "Super White", hex: "#FFFFFF", price: 0 },
      { id: "yaris-attitude-black", name: "Attitude Black Mica", hex: "#0E0E0E", price: 35000 },
      { id: "yaris-silver-metallic", name: "Silver Metallic", hex: "#C4C4C4", price: 0 },
      { id: "yaris-grey-graphite", name: "Graphite Grey", hex: "#484B4F", price: 0 },
      { id: "yaris-red-mica", name: "Red Mica Metallic", hex: "#871B1B", price: 35000 },
      { id: "yaris-phantom-brown", name: "Phantom Brown Metallic", hex: "#443428", price: 35000 },
    ],
    wheels: [
      { id: "wheel-18-yaris-oem", name: "18\" Dual-Tone Machined Alloys", size: 18, style: "sport", hex: "#9E9E9E", price: 0 },
      { id: "wheel-18-yaris-dark", name: "18\" Gunmetal Multi-Spoke", size: 18, style: "luxury", hex: "#2A2A2A", price: 95000 },
      { id: "wheel-19-yaris-racing", name: "19\" TRD Sport Anthracite", size: 19, style: "track", hex: "#1C1C1C", price: 155000 },
    ],
    interiors: [
      { id: "int-yaris-ivory", name: "Ivory Beige Soft Stitched Fabric", material: "High-Grade Breathable Fabric", trimHex: "#E5DCBE", accentHex: "#222222", price: 0 },
      { id: "int-yaris-black-leather", name: "Jet Black Executive Leatherette", material: "Perforated Premium Leatherette", trimHex: "#1C1C1C", accentHex: "#C5A059", price: 75000 },
      { id: "int-yaris-cognac-dual", name: "Cognac & Charcoal Dual-Tone", material: "Two-Tone Stitched Hide", trimHex: "#7E4E2C", accentHex: "#1A1A1A", price: 95000 },
      { id: "int-yaris-slate-sport", name: "Slate Grey Sport Microfiber", material: "Reinforced Fabric", trimHex: "#3F3F3F", accentHex: "#871B1B", price: 60000 },
    ],
    packs: [
      { id: "yaris-protection-pack", name: "Karachi Rust-Guard & PPF Edge Wrap", blurb: "Underbody bitumen seal with door edge and cup paint protection films.", price: 75000 },
      { id: "yaris-camera-suite", name: "360-Degree Birdview Camera System", blurb: "Four wide-angle cameras with integrated steering angle trajectory lines.", price: 80000 },
      { id: "yaris-comfort-pack", name: "Qi Wireless Phone Charging Pad", blurb: "Integrated center console wireless fast charging module for smartphones.", price: 35000 },
    ],
    story: [
      {
        heading: "Engineered for Pakistan's Toughest City Commutes",
        body: "The Toyota Yaris ATIV X sets the standard for compact sedans in Pakistan. With 7 airbags, high ground clearance, and an ultra-reliable Dual VVT-i powerplant, it delivers unwavering peace of mind.",
      },
      {
        heading: "Direct Delivery with Sindh Biometric Verification",
        body: "Available zero-meter at our Khalid Bin Waleed Road showroom floor. All Indus Motor Company warranties intact with instant biometric sign-off.",
      },
    ],
  },
  {
    slug: "suzuki-swift-glx",
    name: "Suzuki Swift GLX 1.2L CVT 2024",
    shortName: "Swift GLX CVT",
    brand: "Suzuki",
    year: 2024,
    category: "Hot Hatchback",
    tagline: "The Modern Hot Hatch with Dynamic European Styling and Tech.",
    condition: "Brand New / Zero Meter",
    registration: "Unregistered (Sindh Biometric Available On-Spot)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Pak Suzuki Certified Genuine",
    pricePkr: 4720000,
    priceFormatted: "₨ 47.20 Lakh",
    basePrice: 4720000,
    summary:
      "The all-new Suzuki Swift GLX 1.2L CVT brings European hot-hatch excitement to Pakistan. Equipped with 6 SRS airbags, cruise control, push start, D-shaped sporty steering wheel, LED projection lamps, and 9-inch touchscreen.",
    specs: {
      power: "82 hp @ 6,000 rpm",
      torque: "113 Nm @ 4,400 rpm",
      range: "600 km (37L Fuel Tank)",
      sprint: "11.6 s (0–100 km/h)",
      charge: "12V 36Ah Maintenance-Free Battery",
      drivetrain: "Front-Wheel Drive (FWD)",
      topSpeed: "175 km/h",
      seats: 5,
      weight: "895 kg",
      fuelEconomy: "14.0–17.5 km/L",
      transmission: "CVT with Sports Mode",
      engine: "1.2L K12M DOHC VVT 4-Cylinder",
    },
    heroImage: "/cars/suzuki-swift-glx.jpg",
    exteriorImages: [
      "/cars/suzuki-swift-glx.jpg",
      "/cars/suzuki-swift-glx.jpg",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    keyFeatures: [
      {
        category: "Sport Performance",
        items: [
          "1.2L K12M 4-Cylinder VVT Engine",
          "CVT with Sports Mode & Crisp Throttle Response",
          "Flat-Bottom Leather Wrapped Steering Wheel",
          "Rear Disc Brakes with Electronic Brakeforce Distribution",
        ],
      },
      {
        category: "Safety Suite",
        items: [
          "6 SRS Airbags (Front, Side, and Curtain Airbags)",
          "Electronic Stability Program (ESP) & Hill Hold Assist",
          "Traction Control System (TCS)",
          "Reverse Camera with Rear Parking Sonar Sensors",
        ],
      },
      {
        category: "Modern Technology",
        items: [
          "9-inch Touchscreen with Android Auto & Apple CarPlay",
          "Keyless Smart Entry with Push-Button Ignition",
          "Cruise Control with Steering Mounted Audio Switches",
          "LED Projector Headlights with Integrated Daytime Running Lights",
        ],
      },
    ],
    paints: [
      { id: "swift-solid-white", name: "Solid White", hex: "#FFFFFF", price: 0 },
      { id: "swift-mineral-grey", name: "Mineral Grey Metallic", hex: "#464A4D", price: 0 },
      { id: "swift-silky-silver", name: "Silky Silver", hex: "#C7C7C7", price: 0 },
      { id: "swift-super-black", name: "Super Black Pearl", hex: "#0F0F0F", price: 35000 },
      { id: "swift-burning-red", name: "Burning Red Pearl Metallic", hex: "#A81616", price: 35000 },
      { id: "swift-speedy-blue", name: "Speedy Blue Metallic", hex: "#1D4E89", price: 35000 },
    ],
    wheels: [
      { id: "wheel-18-swift-oem", name: "18\" Precision Cut Dual-Tone Alloys", size: 18, style: "sport", hex: "#999999", price: 0 },
      { id: "wheel-18-swift-black", name: "18\" Gloss Black Sport Spokes", size: 18, style: "track", hex: "#1A1A1A", price: 75000 },
      { id: "wheel-19-swift-gunmetal", name: "19\" Matte Gunmetal Multi-Spoke", size: 19, style: "aero", hex: "#3A3A3A", price: 125000 },
    ],
    interiors: [
      { id: "int-swift-charcoal", name: "Sport Charcoal Fabric with Silver Trim", material: "Breathable Mesh Fabric", trimHex: "#2B2B2B", accentHex: "#C5A059", price: 0 },
      { id: "int-swift-leather", name: "All-Black Sport Leatherette", material: "Perforated Black Leatherette", trimHex: "#151515", accentHex: "#A81616", price: 55000 },
      { id: "int-swift-suede", name: "Charcoal Suede with Red Accents", material: "Microfiber Suede Weave", trimHex: "#222222", accentHex: "#A81616", price: 75000 },
      { id: "int-swift-tan", name: "Two-Tone Cognac & Black Hide", material: "Artisan Stitched Leather", trimHex: "#6B4423", accentHex: "#151515", price: 85000 },
    ],
    packs: [
      { id: "swift-aero-pack", name: "Sport Aerodynamic Body Extension", blurb: "Front splitter lip, side skirts, and roof spoiler in gloss black.", price: 65000 },
      { id: "swift-ceramic-shield", name: "Karachi 9H Paint Protection Shield", blurb: "3-layer hydrophobic nano-ceramic coating designed for coastal humidity.", price: 55000 },
      { id: "swift-sound-pack", name: "Focal Audio Upgrade & Sound Damping", blurb: "4-door sound insulation with upgraded coaxial door speakers.", price: 75000 },
    ],
    story: [
      {
        heading: "Youthful Energy Meets Uncompromising Safety",
        body: "The Suzuki Swift GLX is Pakistan's premier hot hatchback, offering 6 airbags and agile European dynamics that make maneuvering through PECHS and Defence traffic a pure delight.",
      },
      {
        heading: "Zero-Meter Unit on Display on Khalid Bin Waleed Road",
        body: "Come test the steering and ergonomics in person. Immediate delivery, biometric authorization on-spot, and comprehensive Pak Suzuki warranty intact.",
      },
    ],
  },
  {
    slug: "kia-sportage-awd",
    name: "Kia Sportage 2.0L AWD Alpha/FWD 2024",
    shortName: "Sportage AWD",
    brand: "Kia",
    year: 2024,
    category: "Compact SUV",
    tagline: "The Pioneer That Defined the Modern Pakistani SUV Phenomenon.",
    condition: "Brand New / Zero Meter",
    registration: "Unregistered (Sindh Biometric Available On-Spot)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Kia Lucky Motors Certified Genuine",
    pricePkr: 8470000,
    priceFormatted: "₨ 84.70 Lakh",
    basePrice: 8470000,
    summary:
      "The Kia Sportage AWD revolutionized Pakistan's SUV landscape. Equipped with a refined 2.0L MPI petrol engine, Dynamax™ All-Wheel Drive, panoramic glass sunroof, electronic parking brake, and plush leather interior.",
    specs: {
      power: "155 hp @ 6,200 rpm",
      torque: "196 Nm @ 4,000 rpm",
      range: "620 km (62L Fuel Tank)",
      sprint: "10.4 s (0–100 km/h)",
      charge: "12V 60Ah Maintenance-Free Battery",
      drivetrain: "Dynamax™ Intelligent All-Wheel Drive (AWD)",
      topSpeed: "190 km/h",
      seats: 5,
      weight: "1,540 kg",
      fuelEconomy: "10.0–13.5 km/L",
      transmission: "6-Speed Sportsmatic H-Matic Automatic",
      engine: "2.0L Nu MPI DOHC 16-Valve 4-Cylinder",
    },
    heroImage: "/cars/kia-sportage-awd.jpg",
    exteriorImages: [
      "/cars/kia-sportage-awd.jpg",
      "/cars/kia-sportage-awd.jpg",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    keyFeatures: [
      {
        category: "All-Terrain AWD Capability",
        items: [
          "Dynamax™ Intelligent All-Wheel Drive with Lock Mode",
          "Downhill Brake Control (DBC) & Hill-Start Assist Control",
          "Electronic Stability Control (ESC) with Vehicle Stability",
          "Independent Multi-Link Rear Suspension",
        ],
      },
      {
        category: "Panoramic Luxury",
        items: [
          "Full Panoramic Tilt & Slide Glass Sunroof",
          "Dual-Zone Automatic Climate Control with Cluster Ionizer",
          "8-inch Touchscreen with Apple CarPlay & Android Auto",
          "Electronic Parking Brake (EPB) with Auto Hold",
        ],
      },
      {
        category: "Executive Appointments",
        items: [
          "Premium Leather Seating with 8-Way Power Driver Seat",
          "Smart Power Tailgate with Hands-Free Opening",
          "LED Bi-Function Headlamps with Ice-Cube Fog Lamps",
          "Wireless Smartphone Charger in Center Console",
        ],
      },
    ],
    paints: [
      { id: "sportage-clear-white", name: "Clear White", hex: "#FFFFFF", price: 0 },
      { id: "sportage-cherry-black", name: "Cherry Black Pearl", hex: "#0A0A0A", price: 45000 },
      { id: "sportage-sparkling-silver", name: "Sparkling Silver", hex: "#C2C2C2", price: 0 },
      { id: "sportage-panthera-metal", name: "Panthera Metal Grey", hex: "#43474B", price: 0 },
      { id: "sportage-fiery-red", name: "Fiery Red Metallic", hex: "#9E1818", price: 45000 },
      { id: "sportage-mercury-blue", name: "Mercury Blue", hex: "#1C3F6E", price: 45000 },
    ],
    wheels: [
      { id: "wheel-18-sportage-oem", name: "18\" Diamond Cut Machine Finished Alloys", size: 18, style: "luxury", hex: "#9A9A9A", price: 0 },
      { id: "wheel-19-sportage-gt", name: "19\" GT-Line Dark Chrome Multi-Spoke", size: 19, style: "sport", hex: "#2B2B2B", price: 140000 },
      { id: "wheel-19-sportage-black", name: "19\" Gloss Black Shadow Edition", size: 19, style: "track", hex: "#121212", price: 175000 },
    ],
    interiors: [
      { id: "int-sportage-charcoal", name: "Charcoal Black Perforated Leather", material: "Executive Perforated Hide", trimHex: "#181818", accentHex: "#C5A059", price: 0 },
      { id: "int-sportage-beige", name: "Warm Beige Dual-Tone Leather", material: "Supple Beige Napa Leather", trimHex: "#E6DCB8", accentHex: "#181818", price: 85000 },
      { id: "int-sportage-tan", name: "Cognac Tan Saddle Leather", material: "Italian Tanned Hide", trimHex: "#7A4E2C", accentHex: "#181818", price: 115000 },
      { id: "int-sportage-slate", name: "Slate Grey Sport Stitch", material: "Sport Stitched Microfiber", trimHex: "#383838", accentHex: "#9E1818", price: 95000 },
    ],
    packs: [
      { id: "sportage-coastal-protection", name: "Karachi PPF & Marine Undercoating", blurb: "Complete front-end PPF protection and rust-proof chassis treatment.", price: 125000 },
      { id: "sportage-side-steps", name: "OEM Aluminum Running Side Steps", blurb: "Heavy-duty aluminum steps for effortless cabin ingress with puddle lights.", price: 75000 },
      { id: "sportage-camera-suite", name: "360° Surrounding Vision Camera", blurb: "High-definition surround monitoring with blind-spot view assistance.", price: 95000 },
    ],
    story: [
      {
        heading: "The Crossover That Captivated Pakistan",
        body: "The Kia Sportage changed what Pakistani car buyers expect from an SUV. Commanding road presence, supreme ride height, and all-weather Dynamax AWD make it an executive favorite in Karachi.",
      },
      {
        heading: "Zero-Meter Delivery on Khalid Bin Waleed Road",
        body: "Fully documented with Lucky Motor Corporation warranty, CPLC verification, and immediate Sindh Excise biometric transfer at our showroom counter.",
      },
    ],
  },
  {
    slug: "hyundai-tucson-gls",
    name: "Hyundai Tucson GLS Sport AWD 2024",
    shortName: "Tucson GLS AWD",
    brand: "Hyundai",
    year: 2024,
    category: "Crossover SUV",
    tagline: "Sophisticated Korean Craftsmanship with HTRAC AWD and Panoramic Sunroof.",
    condition: "Brand New / Zero Meter",
    registration: "Unregistered (Sindh Biometric Available On-Spot)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Hyundai Nishat Certified Genuine",
    pricePkr: 8900000,
    priceFormatted: "₨ 89.00 Lakh",
    basePrice: 8900000,
    summary:
      "The Hyundai Tucson GLS Sport AWD represents modern Korean refinement. Featuring HTRAC Electronic All-Wheel Drive, 2.0L petrol engine, panoramic sunroof, floating 10.25-inch infotainment, wireless charging, and leather upholstery.",
    specs: {
      power: "155 hp @ 6,200 rpm",
      torque: "196 Nm @ 4,000 rpm",
      range: "620 km (62L Fuel Tank)",
      sprint: "10.5 s (0–100 km/h)",
      charge: "12V 60Ah Maintenance-Free Battery",
      drivetrain: "HTRAC Electronic All-Wheel Drive (AWD)",
      topSpeed: "190 km/h",
      seats: 5,
      weight: "1,550 kg",
      fuelEconomy: "10.0–13.0 km/L",
      transmission: "6-Speed Electronic Automatic",
      engine: "2.0L Smartstream MPI 4-Cylinder",
    },
    heroImage: "/cars/hyundai-tucson-gls.jpg",
    exteriorImages: [
      "/cars/hyundai-tucson-gls.jpg",
      "/cars/hyundai-tucson-gls.jpg",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    keyFeatures: [
      {
        category: "HTRAC All-Wheel Drive",
        items: [
          "HTRAC Electronic All-Wheel Drive with 50:50 Lock Mode",
          "Downhill Brake Control (DBC) & Hill-Start Assist",
          "Electronic Stability Control (ESC) with Traction Control",
          "Drive Mode Select (Normal / Eco / Sport)",
        ],
      },
      {
        category: "Premium Cabin Space",
        items: [
          "Full Panoramic Glass Sunroof with Power Blind",
          "10-way Power Adjustable Driver Seat with Lumbar Support",
          "Dual-Zone Automatic Climate Control with Rear AC Vents",
          "Electronic Parking Brake (EPB) with Auto Vehicle Hold",
        ],
      },
      {
        category: "Safety & Utility",
        items: [
          "Smart Powered Tailgate with Proximity Sensor",
          "LED Penta-Projector Headlamps with Static Bending Lights",
          "Dual Front Airbags with Pre-Tensioner Seatbelts",
          "Wireless Fast Smartphone Charging Pad",
        ],
      },
    ],
    paints: [
      { id: "tucson-polar-white", name: "Polar White", hex: "#FFFFFF", price: 0 },
      { id: "tucson-phantom-black", name: "Phantom Black Pearl", hex: "#0C0C0C", price: 45000 },
      { id: "tucson-starry-night", name: "Starry Night Blue", hex: "#1F2B3E", price: 45000 },
      { id: "tucson-magnetic-force", name: "Magnetic Force Metallic", hex: "#52575C", price: 0 },
      { id: "tucson-silky-bronze", name: "Silky Bronze Metallic", hex: "#7B6E5F", price: 45000 },
      { id: "tucson-fiery-red", name: "Fiery Red Pearl", hex: "#961D1D", price: 45000 },
    ],
    wheels: [
      { id: "wheel-18-tucson-oem", name: "18\" Turbine Machined Alloy Wheels", size: 18, style: "sport", hex: "#A0A0A0", price: 0 },
      { id: "wheel-19-tucson-nline", name: "19\" N-Line Anthracite Sport Alloys", size: 19, style: "track", hex: "#333333", price: 145000 },
      { id: "wheel-19-tucson-shadow", name: "19\" Gloss Black Shadow Wheels", size: 19, style: "luxury", hex: "#151515", price: 180000 },
    ],
    interiors: [
      { id: "int-tucson-charcoal", name: "Charcoal Black Perforated Leather", material: "Executive Napa Hide", trimHex: "#1A1A1A", accentHex: "#C5A059", price: 0 },
      { id: "int-tucson-tan", name: "Saddle Tan Luxury Leather", material: "Artisan Tanned Hide", trimHex: "#7E512D", accentHex: "#1A1A1A", price: 95000 },
      { id: "int-tucson-grey", name: "Dove Grey & Black Two-Tone", material: "Perforated Premium Hide", trimHex: "#D2D2D2", accentHex: "#1A1A1A", price: 85000 },
      { id: "int-tucson-slate", name: "Slate Sport Suede Combination", material: "Breathable Suede & Leather", trimHex: "#393939", accentHex: "#961D1D", price: 110000 },
    ],
    packs: [
      { id: "tucson-ceramic-shield", name: "Karachi 9H Paint Protection & Rust Seal", blurb: "Triple-layer ceramic coating engineered for coastal moisture and saline wind.", price: 125000 },
      { id: "tucson-step-pack", name: "OEM Style Heavy-Duty Side Footsteps", blurb: "Ergonomic running boards with slip-resistant rubber tread inserts.", price: 75000 },
      { id: "tucson-dashcam-suite", name: "Dual HD Front & Rear Dashcam", blurb: "Night-vision parking recorder with 128GB high-endurance memory storage.", price: 55000 },
    ],
    story: [
      {
        heading: "Refined Luxury and Dependable Road Dominance",
        body: "The Hyundai Tucson GLS Sport AWD stands apart with whisper-quiet cabin insulation and solid chassis engineering. It tackles Karachi's potholes and highway cruising with equal grace.",
      },
      {
        heading: "Authentic Zero-Meter Papers on Khalid Bin Waleed Road",
        body: "Immediate physical stock available for inspection. Complete Hyundai Nishat warranty files, 100% CPLC clearance, and on-spot biometric ownership transfer.",
      },
    ],
  },
  {
    slug: "changan-alsvin-lumiere",
    name: "Changan Alsvin 1.5L Lumiere DCT 2024",
    shortName: "Alsvin Lumiere",
    brand: "Changan",
    year: 2024,
    category: "Compact Sedan",
    tagline: "High-Value Family Sedan with Sunroof, Dual-Clutch DCT, and Cruise Control.",
    condition: "Brand New / Zero Meter",
    registration: "Unregistered (Sindh Biometric Available On-Spot)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Master Changan Certified Genuine",
    pricePkr: 4550000,
    priceFormatted: "₨ 45.50 Lakh",
    basePrice: 4550000,
    summary:
      "The Changan Alsvin Lumiere 1.5L DCT offers unbeatable value in Pakistan's sedan category. Boasting an electronic sunroof, 5-speed dual-clutch transmission, cruise control, leatherette seats, rear parking camera, and tire pressure monitoring.",
    specs: {
      power: "105 hp @ 5,500 rpm",
      torque: "145 Nm @ 4,500 rpm",
      range: "600 km (40L Fuel Tank)",
      sprint: "11.2 s (0–100 km/h)",
      charge: "12V 45Ah Maintenance-Free Battery",
      drivetrain: "Front-Wheel Drive (FWD)",
      topSpeed: "180 km/h",
      seats: 5,
      weight: "1,115 kg",
      fuelEconomy: "13.5–16.5 km/L",
      transmission: "5-Speed Dual-Clutch Transmission (DCT)",
      engine: "1.5L BlueCore 16-Valve DVVT",
    },
    heroImage: "/cars/changan-alsvin-lumiere.jpg",
    exteriorImages: [
      "/cars/changan-alsvin-lumiere.jpg",
      "/cars/changan-alsvin-lumiere.jpg",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    keyFeatures: [
      {
        category: "BlueCore Powertrain",
        items: [
          "1.5L BlueCore 16-Valve In-Line 4-Cylinder Engine",
          "5-Speed Dual-Clutch Transmission (DCT) with Tiptronic",
          "Cruise Control with Steering Wheel Controls",
          "Start-Stop Technology for Dense Karachi Traffic",
        ],
      },
      {
        category: "Lumiere Top-Tier Luxury",
        items: [
          "Electric Tilt & Slide Sunroof",
          "7-inch Floating Infotainment with Bluetooth Audio",
          "Faux Leather Stitched Comfort Seats",
          "Tire Pressure Monitoring System (TPMS)",
        ],
      },
      {
        category: "Safety & Driver Assist",
        items: [
          "Dual Front SRS Airbags with ABS and EBD",
          "Electronic Stability Program (ESP)",
          "Reverse Camera with Dynamic Distance Sensors",
          "Projector Headlamps with LED Daytime Running Lights",
        ],
      },
    ],
    paints: [
      { id: "alsvin-pure-white", name: "Pure White", hex: "#FFFFFF", price: 0 },
      { id: "alsvin-space-black", name: "Space Black", hex: "#0E0E0E", price: 30000 },
      { id: "alsvin-stellar-silver", name: "Stellar Silver", hex: "#C6C6C6", price: 0 },
      { id: "alsvin-lunar-grey", name: "Lunar Grey", hex: "#4B4E52", price: 0 },
      { id: "alsvin-galaxy-blue", name: "Galaxy Blue Metallic", hex: "#1E3D59", price: 30000 },
      { id: "alsvin-cosmic-red", name: "Cosmic Red Metallic", hex: "#8A1F1F", price: 30000 },
    ],
    wheels: [
      { id: "wheel-18-alsvin-oem", name: "18\" Multi-Spoke Silver Alloys", size: 18, style: "sport", hex: "#9F9F9F", price: 0 },
      { id: "wheel-18-alsvin-gunmetal", name: "18\" Dark Gunmetal Diamond Cut", size: 18, style: "luxury", hex: "#353535", price: 65000 },
      { id: "wheel-19-alsvin-black", name: "19\" Gloss Black Aero Wheels", size: 19, style: "aero", hex: "#161616", price: 110000 },
    ],
    interiors: [
      { id: "int-alsvin-black-leather", name: "Jet Black Stitched Faux Leather", material: "Premium Fitted Leatherette", trimHex: "#181818", accentHex: "#C5A059", price: 0 },
      { id: "int-alsvin-beige-dual", name: "Ivory Beige & Charcoal Two-Tone", material: "Dual-Tone Leatherette", trimHex: "#DFD7C0", accentHex: "#181818", price: 55000 },
      { id: "int-alsvin-cognac", name: "Cognac Saddle Luxury Stitch", material: "Supple Stitched Hide", trimHex: "#7A4D2B", accentHex: "#181818", price: 75000 },
      { id: "int-alsvin-slate-sport", name: "Slate Grey Sport Weave", material: "Reinforced Technical Fabric", trimHex: "#3D3D3D", accentHex: "#8A1F1F", price: 45000 },
    ],
    packs: [
      { id: "alsvin-coastal-protection", name: "Karachi Rust Protection & Undercoat", blurb: "Underbody anti-corrosion coating and exterior hydrophobic paint seal.", price: 55000 },
      { id: "alsvin-camera-dashcam", name: "HD Recording Dashcam with Night Mode", blurb: "Compact 1080p continuous loop recording with G-sensor crash detection.", price: 40000 },
      { id: "alsvin-sunshade-pack", name: "UV Rejecting Window Shades & 7D Mats", blurb: "Full-vehicle magnetic sunshades with diamond-pattern custom floor mats.", price: 30000 },
    ],
    story: [
      {
        heading: "Unmatched Value in Pakistan's Sedan Segment",
        body: "The Changan Alsvin Lumiere delivers features once reserved for 1-crore luxury cars at half the cost. The dual-clutch transmission shifts rapidly, and the electric sunroof adds genuine executive flair.",
      },
      {
        heading: "Zero-Meter Delivery with Complete Documentation",
        body: "Physical vehicle in stock at our Khalid Bin Waleed Road showroom. Biometric verification device available on-site for immediate transfer under Sindh Excise guidelines.",
      },
    ],
  },
  {
    slug: "toyota-fortuner-legender",
    name: "Toyota Fortuner Legender 2.8L 4x4 Diesel 2024",
    shortName: "Fortuner Legender",
    brand: "Toyota",
    year: 2024,
    category: "Luxury SUV",
    tagline: "Pakistan's Flagship 7-Seater 4x4 Road Sovereign with 500 Nm of Torque.",
    condition: "Brand New / Zero Meter",
    registration: "Unregistered (Sindh Biometric Available On-Spot)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Indus Motor Company Certified Genuine",
    pricePkr: 19000000,
    priceFormatted: "₨ 1.90 Crore",
    basePrice: 19000000,
    summary:
      "The Toyota Fortuner Legender 2.8L 4x4 is Pakistan's most prestigious locally assembled full-size SUV. Boasting 500 Nm of torque from its 1GD-FTV turbo-diesel engine, Legender aero styling, dual-tone black roof, ambient lighting, and electronic differential lock.",
    specs: {
      power: "201 hp @ 3,400 rpm",
      torque: "500 Nm @ 1,600–2,800 rpm",
      range: "820 km (80L Fuel Tank)",
      sprint: "9.8 s (0–100 km/h)",
      charge: "12V 80Ah Heavy-Duty Battery",
      drivetrain: "Part-Time 4WD with Rear Differential Lock",
      topSpeed: "195 km/h",
      seats: 7,
      weight: "2,185 kg",
      fuelEconomy: "9.5–12.5 km/L",
      transmission: "6-Speed Super ECT Automatic with Paddle Shifters",
      engine: "2.8L 1GD-FTV D-4D Turbocharged Diesel",
    },
    heroImage: "/cars/toyota-fortuner-legender.jpg",
    exteriorImages: [
      "/cars/toyota-fortuner-legender.jpg",
      "/cars/toyota-fortuner-legender.jpg",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    keyFeatures: [
      {
        category: "Legender Diesel Performance",
        items: [
          "2.8L 1GD-FTV Turbocharged Diesel with Intercooler (201 hp / 500 Nm)",
          "6-Speed Super ECT Transmission with Paddle Shifters",
          "4x4 Shift-On-The-Fly with Rear Differential Lock",
          "Heavy-Duty Ladder Frame Chassis with Pitch & Bounce Control",
        ],
      },
      {
        category: "Flagship Styling & Cabin",
        items: [
          "Exclusive Legender Catamaran Bumper with Dual-Tone Black Roof",
          "Quad-LED Headlamps with Sequential Turn Signals",
          "Dual-Tone Maroon & Black Perforated Leather Seats",
          "Illuminated Door Trim & Center Console Ambient Lighting",
        ],
      },
      {
        category: "Executive 7-Seater Utility",
        items: [
          "One-Touch Powered Tailgate with Kick Sensor Gesture Control",
          "Dual-Zone Automatic Climate Control with Rear Roof Vents",
          "8.9-inch Infotainment with Wireless Apple CarPlay & Android Auto",
          "Vehicle Stability Control, Hill Assist & Downhill Assist Control",
        ],
      },
    ],
    paints: [
      { id: "legender-pearl-white", name: "Platinum White Pearl with Black Roof", hex: "#FFFFFF", price: 85000 },
      { id: "legender-attitude-black", name: "Attitude Black Mica", hex: "#080808", price: 0 },
      { id: "legender-silver-metallic", name: "Silver Metallic", hex: "#BFBFBF", price: 0 },
      { id: "legender-graphite-grey", name: "Graphite Grey", hex: "#45484C", price: 0 },
      { id: "legender-phantom-brown", name: "Phantom Brown Metallic", hex: "#3A2A1E", price: 45000 },
      { id: "legender-super-white", name: "Super White", hex: "#F7F7F7", price: 0 },
    ],
    wheels: [
      { id: "wheel-18-legender-oem", name: "18\" Dual-Tone Legender Sport Alloys", size: 18, style: "offroad", hex: "#8E8E8E", price: 0 },
      { id: "wheel-19-legender-black", name: "19\" Gloss Black Shadow Edition Alloys", size: 19, style: "sport", hex: "#1C1C1C", price: 185000 },
      { id: "wheel-20-legender-trd", name: "20\" TRD Off-Road Gunmetal Forged Wheels", size: 20, style: "track", hex: "#383838", price: 280000 },
    ],
    interiors: [
      { id: "int-legender-maroon-black", name: "Dual-Tone Maroon & Black Perforated Leather", material: "Legender Exclusive Napa Leather", trimHex: "#151515", accentHex: "#721E28", price: 0 },
      { id: "int-legender-all-black", name: "Jet Black Executive Napa Leather", material: "All-Black Stitched Leather", trimHex: "#181818", accentHex: "#C5A059", price: 110000 },
      { id: "int-legender-cognac-saddle", name: "Saddle Cognac & Charcoal Two-Tone", material: "Artisan Tanned Leather", trimHex: "#7B4C29", accentHex: "#181818", price: 140000 },
      { id: "int-legender-slate-alcantara", name: "Slate Grey Alcantara Sport Inserts", material: "Breathable Alcantara / Hide", trimHex: "#333333", accentHex: "#721E28", price: 165000 },
    ],
    packs: [
      { id: "legender-armor-pack", name: "Karachi PPF Front Armor & 9H Ceramic", blurb: "Self-healing TPU paint protection film on bumper, hood, and mirrors.", price: 195000 },
      { id: "legender-audio-suite", name: "JBL Premium 9-Speaker Audio Upgrade", blurb: "High-power amplifier with dedicated subwoofer and acoustic door dampening.", price: 165000 },
      { id: "legender-security-pack", name: "Satellite Anti-Theft GPS Tracker & Camera", blurb: "Real-time mobile tracking with remote engine kill and 24/7 security hotline.", price: 85000 },
    ],
    story: [
      {
        heading: "The Undisputed Sovereign of Pakistani Roads",
        body: "The Toyota Fortuner Legender commands immediate respect across Pakistan. Its towering ground clearance, 500 Nm torque reserve, and 7-passenger capability make it the vehicle of choice for politicians, industrialists, and adventurous families.",
      },
      {
        heading: "Brand New Zero-Meter Showroom Unit",
        body: "Physically parked inside our Khalid Bin Waleed Road showroom. Avoid dealership waiting queues; complete Indus Motor warranty book in hand with on-spot biometric ownership transfer.",
      },
    ],
  },
  {
    slug: "mercedes-benz-c200-amg",
    name: "Mercedes-Benz C-Class C200 AMG Line 2024",
    shortName: "Mercedes C200 AMG",
    brand: "Mercedes-Benz",
    year: 2024,
    category: "Luxury Sedan",
    tagline: "The Definitive German Luxury Executive Sedan on Khalid Bin Waleed Road.",
    condition: "Brand New / Zero Meter",
    registration: "Unregistered (Direct Import with Full Custom Duties Paid)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Shahnawaz Certified / Grade 5A Japan Auction Verified",
    pricePkr: 38500000,
    priceFormatted: "₨ 3.85 Crore",
    basePrice: 38500000,
    summary:
      "The 2024 Mercedes-Benz C200 AMG Line represents peak executive automotive luxury in Karachi. Powered by a 1.5L turbocharged engine with 48V EQ Boost mild hybrid technology, 9G-TRONIC transmission, starry diamond grille, panoramic glass roof, 64-color ambient lighting, and high-definition MBUX central display.",
    specs: {
      power: "201 hp + 20 hp EQ Boost @ 5,800 rpm",
      torque: "300 Nm @ 1,800–4,000 rpm",
      range: "820 km (66L Fuel Tank)",
      sprint: "7.3 s (0–100 km/h)",
      charge: "48V Lithium-Ion Mild Hybrid Battery System",
      drivetrain: "Rear-Wheel Drive (RWD)",
      topSpeed: "246 km/h",
      seats: 5,
      weight: "1,650 kg",
      fuelEconomy: "13.0–16.5 km/L",
      transmission: "9G-TRONIC 9-Speed Automatic with Paddle Shifters",
      engine: "1.5L M254 Turbocharged 4-Cylinder with 48V Mild Hybrid",
    },
    heroImage: "/cars/mercedes-benz-c200-amg.jpg",
    exteriorImages: [
      "/cars/mercedes-benz-c200-amg.jpg",
      "/cars/mercedes-benz-c200-amg.jpg",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    keyFeatures: [
      {
        category: "AMG Powertrain & Dynamics",
        items: [
          "1.5L Turbocharged M254 Engine with 48V EQ Boost (201 hp + 20 hp)",
          "9G-TRONIC 9-Speed Automatic Transmission with Direct Select Paddles",
          "DYNAMIC SELECT Driving Modes (Eco, Comfort, Sport, Individual)",
          "Agility Control Suspension with Selective Damping System",
        ],
      },
      {
        category: "AMG Line Styling & Cockpit",
        items: [
          "Starry Diamond Radiator Grille with Chrome Pins and Central Star",
          "19-inch AMG Multi-Spoke Bicolor Alloy Wheels",
          "11.9-inch MBUX Portrait Central Touchscreen with Fingerprint Scanner",
          "64-Color Ambient Lighting with Illuminated AMG Door Sill Panels",
        ],
      },
      {
        category: "Safety & Driver Assistance",
        items: [
          "Active Brake Assist & Blind Spot Assist with Exit Warning",
          "360-Degree Surround View Cameras with Active Parking Assist PARKTRONIC",
          "PRE-SAFE® Predictive Occupant Protection System & 7 Airbags",
          "DIGITAL LIGHT High-Resolution Headlamps with Adaptive Highbeam",
        ],
      },
    ],
    paints: [
      { id: "c200-obsidian-black", name: "Obsidian Black Metallic", hex: "#0B0B0B", price: 0 },
      { id: "c200-polar-white", name: "Polar White Solid", hex: "#FFFFFF", price: 0 },
      { id: "c200-selenite-grey", name: "Selenite Grey Metallic", hex: "#4B4E53", price: 185000 },
      { id: "c200-spectral-blue", name: "Spectral Blue Metallic", hex: "#1C355E", price: 220000 },
      { id: "c200-high-tech-silver", name: "High-Tech Silver Metallic", hex: "#B8B9BB", price: 185000 },
      { id: "c200-opalite-white", name: "MANUFAKTUR Opalite White Bright", hex: "#F2F2F2", price: 395000 },
    ],
    wheels: [
      { id: "wheel-19-amg-multispoke", name: "19\" AMG Multi-Spoke Bicolor Alloys", size: 19, style: "sport", hex: "#222222", price: 0 },
      { id: "wheel-19-amg-5spoke", name: "19\" AMG 5-Twin-Spoke Aerodynamic Rims", size: 19, style: "luxury", hex: "#404040", price: 195000 },
      { id: "wheel-20-amg-forged", name: "20\" AMG Night Package Matte Black Forged", size: 20, style: "track", hex: "#121212", price: 345000 },
    ],
    interiors: [
      { id: "int-c200-sienna-brown", name: "Sienna Brown & Black Exclusive Leather", material: "Artico Man-Made Leather", trimHex: "#8A4B29", accentHex: "#121212", price: 0 },
      { id: "int-c200-black-amg", name: "All-Black AMG Stitched Leather", material: "Fine Perforated Leather", trimHex: "#141414", accentHex: "#A0A0A0", price: 120000 },
      { id: "int-c200-macchiato-beige", name: "Macchiato Beige / Black Dual-Tone", material: "Napa Leather", trimHex: "#D8C7B0", accentHex: "#141414", price: 175000 },
      { id: "int-c200-power-red", name: "Cranberry Power Red / Black Two-Tone", material: "Designo Exclusive Hide", trimHex: "#8B1E28", accentHex: "#121212", price: 240000 },
    ],
    packs: [
      { id: "c200-burmester-pack", name: "Burmester® 3D Surround Sound Suite", blurb: "15 high-performance speakers, DSP amplifier with 710 watts of crystal-clear sound.", price: 320000 },
      { id: "c200-night-pack", name: "AMG Night Package Exterior Gloss Black Trim", blurb: "High-gloss black mirrors, beltline trim, dark-tinted rear glass, and black chrome exhausts.", price: 210000 },
      { id: "c200-pakistan-ceramic", name: "Karachi Coastal 9H Ceramic Armor & PPF", blurb: "Complete front-end TPU self-healing PPF wrap with 5-year anti-corrosion guarantee.", price: 285000 },
    ],
    story: [
      {
        heading: "The Supreme Benchmark of Luxury on Khalid Bin Waleed Road",
        body: "Imported brand new with all duties cleared, the Mercedes-Benz C200 AMG Line commands elite prestige in Karachi. Featuring the latest W206 architecture inspired by the flagship S-Class, it provides unmatched refinement and executive status.",
      },
      {
        heading: "Immediate Showroom Floor Availability",
        body: "Parked on the first floor display gallery of Merchants Luxury Motors. Full verifiable customs clearance documentation, biometric transfer ready, and Shahnawaz warranty backup.",
      },
    ],
  },
];

export const carSlugs: string[] = cars.map((car) => car.slug);

export function getCar(slug: string): Car | undefined {
  return cars.find((car) => car.slug === slug);
}

export function getCarsByBrand(brand: string): Car[] {
  if (brand.toLowerCase() === "all") return cars;
  return cars.filter((car) => car.brand.toLowerCase() === brand.toLowerCase());
}

export function getCarsByCategory(category: string): Car[] {
  if (category.toLowerCase() === "all") return cars;
  return cars.filter((car) => car.category.toLowerCase().includes(category.toLowerCase()));
}
