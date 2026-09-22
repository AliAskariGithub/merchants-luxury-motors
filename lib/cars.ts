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
    slug: "land-cruiser-lc300-zx",
    name: "Toyota Land Cruiser ZX (LC300) 2024",
    shortName: "LC300 ZX",
    brand: "Toyota",
    year: 2024,
    category: "Luxury SUV",
    tagline: "The Unrivaled King of Pakistani Roads & Executive Luxury.",
    condition: "Brand New / Unregistered",
    registration: "Unregistered (Sindh Biometric Available On-Spot)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Brand New Import (Certificate Available)",
    pricePkr: 108000000,
    priceFormatted: "₨ 10.80 Crore",
    basePrice: 108000000,
    summary:
      "The flagship Toyota Land Cruiser 300 ZX represents the highest tier of prestige in Karachi. Powered by a 3.5L Twin-Turbo V6 delivering 409 hp through a 10-speed transmission, complete with genuine Modellista styling and executive rear entertainment.",
    specs: {
      power: "409 hp @ 5,200 rpm",
      torque: "650 Nm @ 2,000–3,600 rpm",
      range: "850 km (110L Dual Tank)",
      sprint: "6.7 s (0–100 km/h)",
      charge: "Dual Alternator High Output",
      drivetrain: "Full-Time 4WD with Torsen LSD",
      topSpeed: "210 km/h",
      seats: 7,
      weight: "2,630 kg",
      fuelEconomy: "8.5–11.0 km/L",
      transmission: "10-Speed Direct-Shift Automatic",
      engine: "3.5L V35A-FTS Twin-Turbo V6",
    },
    heroImage: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1200&auto=format&fit=crop",
    exteriorImages: [
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "/videos/hero-showroom.mp4",
    keyFeatures: [
      {
        category: "Safety & Driver Assistance",
        items: [
          "Toyota Safety Sense 3.0 (Pre-Collision System, Dynamic Radar Cruise)",
          "Lane Tracing Assist & Blind Spot Monitoring with Rear Cross Traffic Alert",
          "10 SRS Airbags & Active Traction Control (A-TRAC)",
          "360-degree Multi-Terrain Monitor with Underfloor Clearance View",
        ],
      },
      {
        category: "Luxury & Interior Comfort",
        items: [
          "Premium Semi-Aniline Leather Seats with Heating & Ventilation (1st & 2nd Rows)",
          "4-Zone Independent Automatic Climate Control with Nanoe-X Air Purification",
          "Integrated Center Console Coolbox for Chilled Beverages",
          "JBL Synthesis 14-Speaker Premium Surround Sound System",
        ],
      },
      {
        category: "Off-Road & Dynamics",
        items: [
          "Multi-Terrain Select with Auto, Dirt, Sand, Mud, Deep Snow & Rock Modes",
          "Crawl Control with Turn Assist Function",
          "Adaptive Variable Suspension (AVS) with Active Height Control",
          "Electronic Kinetic Dynamic Suspension System (E-KDSS)",
        ],
      },
    ],
    paints: [
      { id: "pearl-white", name: "Precious White Pearl", hex: "#F3F4F6", price: 0 },
      { id: "attitude-black", name: "Attitude Black Mica", hex: "#111827", price: 250000 },
      { id: "dark-red", name: "Dark Red Mica Metallic", hex: "#7F1D1D", price: 350000 },
      { id: "silver-metallic", name: "Silver Metallic", hex: "#9CA3AF", price: 250000 },
      { id: "avant-garde-bronze", name: "Avant-Garde Bronze", hex: "#785E43", price: 350000 },
      { id: "dark-blue", name: "Dark Blue Mica", hex: "#1E3A5F", price: 250000 },
    ],
    wheels: [
      { id: "zx-20", name: "20\" ZX Multi-Spoke Machined Alloy", size: 20, style: "luxury", hex: "#374151", price: 0 },
      { id: "modellista-21", name: "21\" Modellista Forged Diamond Cut", size: 21, style: "sport", hex: "#1F2937", price: 850000 },
      { id: "gr-sport-20", name: "20\" Matte Black GR-Sport Wheels", size: 20, style: "offroad", hex: "#111827", price: 650000 },
    ],
    interiors: [
      { id: "cognac-leather", name: "Cognac Brown Semi-Aniline", material: "Nappa Leather", trimHex: "#7C4A27", accentHex: "#D97706", price: 0 },
      { id: "black-nappa", name: "Obsidian Black with Grey Stitch", material: "Semi-Aniline Leather", trimHex: "#1F2937", accentHex: "#9CA3AF", price: 250000 },
      { id: "beige-luxury", name: "Neutral Beige Luxury Trim", material: "Perforated Leather", trimHex: "#D4C5B9", accentHex: "#785E43", price: 350000 },
      { id: "burgundy-sport", name: "Dark Rose F-Sport Special", material: "Sport Leather", trimHex: "#5B1C28", accentHex: "#E11D48", price: 450000 },
    ],
    packs: [
      { id: "modellista-kit", name: "Full Modellista Aero Bodykit", blurb: "Front lip spoiler, rear bumper spoiler, illuminated scuff plates, chrome side mouldings.", price: 1850000 },
      { id: "rear-entertainment", name: "Dual 11.6\" Rear Entertainment Screens", blurb: "Independent HDMI inputs, wireless headsets, and VIP rear center armrest console controls.", price: 950000 },
      { id: "protection-pack", name: "Karachi Ceramic Shield & Undercoating", blurb: "9H ceramic body coating, rust-proof bitumen chassis underseal, and anti-gravel PPF.", price: 450000 },
    ],
    story: [
      {
        heading: "The Pinnacle of Prestige in Karachi",
        body: "On the streets of Karachi, nothing commands respect quite like the LC300 ZX. Built on Toyota's rigid GA-F platform, it sheds 200 kg from the previous generation while delivering immense low-end torque for effortlessly commanding both the coastal breeze of DHA and the rougher terrain of northern Sindh.",
      },
      {
        heading: "Verified & Hand-Picked by Merchants Luxury",
        body: "Every Land Cruiser delivered through our Khalid Bin Waleed showroom undergoes physical CPLC record verification, complete Sindh Excise biometric processing in-house, and our 150-point certified mechanical and electronic check.",
      },
    ],
  },
  {
    slug: "mercedes-benz-s580-4matic",
    name: "Mercedes-Benz S-Class S580 4MATIC 2024",
    shortName: "S580 4MATIC",
    brand: "Mercedes-Benz",
    year: 2024,
    category: "Flagship Luxury Sedan",
    tagline: "The World's Preeminent Luxury Sedan, Refined for Executives.",
    condition: "Fresh Japan Import • Grade 5A",
    registration: "Unregistered (Biometric Ready)",
    mileage: "4,200 km",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Auction Grade 5A (Online Verifiable)",
    pricePkr: 125000000,
    priceFormatted: "₨ 12.50 Crore",
    basePrice: 125000000,
    summary:
      "The pinnacle of German engineering: 4.0L BiTurbo V8 with EQ Boost generating 496 hp, 9G-TRONIC transmission, Burmester 4D sound, rear executive reclining lounge with hot-stone massage, and Digital Light projection.",
    specs: {
      power: "496 hp + 22 hp EQ Boost",
      torque: "700 Nm @ 2,000–4,500 rpm",
      range: "760 km (76L Tank)",
      sprint: "4.4 s (0–100 km/h)",
      charge: "48-Volt Mild Hybrid EQ System",
      drivetrain: "4MATIC All-Wheel Drive with Rear Axle Steering",
      topSpeed: "250 km/h (Electronically Governed)",
      seats: 5,
      weight: "2,115 kg",
      fuelEconomy: "9.0–12.5 km/L",
      transmission: "9G-TRONIC 9-Speed Automatic",
      engine: "4.0L M176 BiTurbo V8 with Mild Hybrid",
    },
    heroImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
    exteriorImages: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "/videos/hero-showroom.mp4",
    keyFeatures: [
      {
        category: "Chauffeur & Executive Suite",
        items: [
          "Rear Executive Reclining Right-Side Seat with Footrest & Calf Support",
          "10 Hot-Stone Massage Programs for All 4 Main Seating Positions",
          "Burmester High-End 4D Surround Sound System with 31 Speakers & 1,750 Watts",
          "Rear MBUX Touchscreen Tablet & Dual 11.6\" High-Res Displays",
        ],
      },
      {
        category: "Lighting & Technology",
        items: [
          "Digital Light Headlamps with 1.3 Million Micro-Mirrors per Unit",
          "MBUX Augmented Reality Head-Up Display with 3D Spatial Guidance",
          "Active Multicolour Ambient Lighting with 64 Colours and Warning Integration",
          "OLED 12.8\" Central Touchscreen with Fingerprint & Facial Recognition",
        ],
      },
      {
        category: "Dynamics & Handling",
        items: [
          "Rear-Axle Steering with 4.5° Turn Angle for Effortless Karachi City Turning",
          "AIRMATIC Air Suspension with Continuously Adjustable Damping",
          "Active Noise Cancellation with Acoustic Glass Laminate",
          "PRE-SAFE Impulse Side Collision Elevation Protection",
        ],
      },
    ],
    paints: [
      { id: "obsidian-black", name: "Obsidian Black Metallic", hex: "#0E1114", price: 0 },
      { id: "designo-diamond-white", name: "MANUFAKTUR Diamond White Bright", hex: "#F8FAFC", price: 480000 },
      { id: "selenite-grey", name: "Selenite Grey Metallic", hex: "#4B5563", price: 0 },
      { id: "nautical-blue", name: "Nautical Blue Metallic", hex: "#1E293B", price: 320000 },
      { id: "emerald-green", name: "Emerald Green Metallic", hex: "#064E3B", price: 380000 },
      { id: "high-tech-silver", name: "High-Tech Silver", hex: "#CBD5E1", price: 0 },
    ],
    wheels: [
      { id: "amg-21-multispoke", name: "21\" AMG Multi-Spoke Forged Black/Polished", size: 21, style: "sport", hex: "#1F2937", price: 0 },
      { id: "maybach-20-disc", name: "20\" Executive Monoblock Forged", size: 20, style: "luxury", hex: "#94A3B8", price: 650000 },
      { id: "amg-20-twin", name: "20\" AMG Twin 5-Spoke Aerodynamic", size: 20, style: "aero", hex: "#334155", price: 0 },
    ],
    interiors: [
      { id: "macchiato-beige", name: "Macchiato Beige Exclusive Nappa", material: "Exclusive Nappa Leather", trimHex: "#E2D9CC", accentHex: "#785E43", price: 0 },
      { id: "sienna-brown", name: "Sienna Brown with Open-Pore Walnut", material: "Nappa Leather", trimHex: "#854D0E", accentHex: "#CA8A04", price: 280000 },
      { id: "carmine-red", name: "Carmine Red Exclusive MANUFAKTUR", material: "Diamond Quilted Leather", trimHex: "#881337", accentHex: "#BE123C", price: 650000 },
      { id: "black-nappa-piano", name: "Black Nappa with Flowing Lines Piano", material: "Nappa Leather", trimHex: "#0F172A", accentHex: "#64748B", price: 0 },
    ],
    packs: [
      { id: "executive-rear", name: "Chauffeur Executive Rear Package", blurb: "Easy Adjust luxury head restraints, passenger seat fold-forward, footrest, and wireless charging in rear.", price: 2100000 },
      { id: "burmester-4d", name: "Burmester High-End 4D Sound", blurb: "31 speakers, 8 exciter transducers built into seats, 1,750 watts total system output.", price: 1400000 },
      { id: "night-package", name: "AMG Exterior Night Package", blurb: "Gloss black mirrors, dark chrome exhaust tips, black window surrounds, and dark privacy glass.", price: 580000 },
    ],
    story: [
      {
        heading: "The Chauffeur's Sanctuary in Clifton & DHA",
        body: "There is no finer way to navigate the traffic of Karachi than from the reclining rear suite of an S580. With active noise cancellation isolating the cabin from outside sirens and street bustle, you travel in absolute serenity between corporate boardrooms and private residences.",
      },
      {
        heading: "Auction Grade 5A Transparency",
        body: "Imported directly with verifiable Japanese Grade 5A auction credentials, ensuring original paint, pristine interior leather, and zero history of accidents. Complete with verifiable chassis number verification right at our dealership.",
      },
    ],
  },
  {
    slug: "porsche-taycan-4s",
    name: "Porsche Taycan 4S Cross Turismo 2024",
    shortName: "Taycan 4S",
    brand: "Porsche",
    year: 2024,
    category: "Electric Grand Tourer",
    tagline: "Soul, Electrified. 800-Volt Pure Performance for Karachi.",
    condition: "2024 Sindh Registered",
    registration: "Karachi Registered (VIP 2-Digit Number)",
    mileage: "6,800 km",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Official Porsche Import / Showroom Certified",
    pricePkr: 78500000,
    priceFormatted: "₨ 7.85 Crore",
    basePrice: 78500000,
    summary:
      "The definitive all-electric grand tourer from Stuttgart. Dual permanent magnet synchronous motors delivering 530 hp with Overboost, 800-volt charging infrastructure, adaptive air suspension with Smart Lift, and Gravel Mode for gravel or rough city surfaces.",
    specs: {
      power: "530 hp (with Launch Control Overboost)",
      torque: "650 Nm instantaneous",
      range: "490 km WLTP (93.4 kWh Battery)",
      sprint: "4.0 s (0–100 km/h)",
      charge: "270 kW DC Fast Charging (5% to 80% in 22.5 min)",
      drivetrain: "Dual-Motor All-Wheel Drive with 2-Speed Rear Gearbox",
      topSpeed: "250 km/h",
      seats: 4,
      weight: "2,245 kg",
      fuelEconomy: "Full Electric (450 km Range)",
      transmission: "Porsche 2-Speed Transmission on Rear Axle",
      engine: "Dual Permanent Magnet Synchronous Motors",
    },
    heroImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    exteriorImages: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "/videos/hero-showroom.mp4",
    keyFeatures: [
      {
        category: "800V Powertrain & Charging",
        items: [
          "Performance Battery Plus 93.4 kWh with liquid thermal management",
          "270 kW DC Fast Charging capability (adds 100 km range in 5 minutes)",
          "Porsche Recuperation Management (PRM) capturing up to 275 kW braking energy",
          "Porsche Electric Sport Sound creating an unmistakable acoustic signature",
        ],
      },
      {
        category: "Chassis & Ride Quality",
        items: [
          "Adaptive Air Suspension including Porsche Active Suspension Management (PASM)",
          "Smart Lift GPS Memory: Automatically raises suspension over Karachi speed breakers",
          "Gravel Mode for improved rough-road stability and traction calibration",
          "Porsche Torque Vectoring Plus (PTV Plus) with electronically controlled diff lock",
        ],
      },
      {
        category: "Cockpit & Screens",
        items: [
          "16.8\" Curved Digital Free-Standing Driver Instrument Display",
          "10.9\" Central Porsche Communication Management (PCM) with Navigation",
          "Optional 10.9\" Co-Pilot Passenger Touchscreen Display",
          "Panoramic Fixed Glass Roof with advanced heat and UV insulation",
        ],
      },
    ],
    paints: [
      { id: "gentian-blue", name: "Gentian Blue Metallic", hex: "#1B365D", price: 0 },
      { id: "carrara-white", name: "Carrara White Metallic", hex: "#F3F4F6", price: 0 },
      { id: "volcano-grey", name: "Volcano Grey Metallic", hex: "#374151", price: 220000 },
      { id: "frozen-berry", name: "Frozen Berry Metallic", hex: "#C49A9E", price: 350000 },
      { id: "jet-black", name: "Jet Black Metallic", hex: "#111827", price: 0 },
      { id: "mamba-green", name: "Mamba Green Metallic", hex: "#2E7D32", price: 380000 },
    ],
    wheels: [
      { id: "cross-turismo-21", name: "21\" Cross Turismo Design with Carbon Aero Blades", size: 21, style: "aero", hex: "#1F2937", price: 780000 },
      { id: "taycan-exclusive-21", name: "21\" Taycan Exclusive Design with Aeroblades", size: 21, style: "sport", hex: "#0F172A", price: 650000 },
      { id: "turbo-aero-20", name: "20\" Taycan Turbo Aero Wheels", size: 20, style: "track", hex: "#475569", price: 0 },
    ],
    interiors: [
      { id: "slate-grey", name: "Slate Grey Smooth-Finish Leather", material: "Full Leather Interior", trimHex: "#4B5563", accentHex: "#9CA3AF", price: 0 },
      { id: "black-chalk", name: "Two-Tone Black & Chalk Leather", material: "Nappa Leather", trimHex: "#1F2937", accentHex: "#E5E7EB", price: 320000 },
      { id: "bordeaux-black", name: "Bordeaux Red & Black Two-Tone", material: "Club Leather Olea", trimHex: "#881337", accentHex: "#BE123C", price: 580000 },
      { id: "olea-basalt", name: "Basalt Black Club Leather", material: "Sustainably Tanned Leather", trimHex: "#111827", accentHex: "#475569", price: 420000 },
    ],
    packs: [
      { id: "offroad-design", name: "Offroad Design Package with Inlays in Vesuvius Grey", blurb: "Side skirts, front lower apron, rear diffuser with protective inlays and +30mm ride height.", price: 620000 },
      { id: "passenger-display", name: "Passenger Display & Sport Chrono", blurb: "Separate passenger touchscreen, dash-mounted analog clock, Sport Plus drive mode.", price: 850000 },
      { id: "home-charger", name: "Karachi 22 kW AC Home Charging Dock", blurb: "Complete 3-phase Wallbox installation with surge protection for your Karachi residence.", price: 480000 },
    ],
    story: [
      {
        heading: "Effortless Electric Mastery on Sea View & DHA",
        body: "Accelerating silently along Karachi's Sea View beach drive in a Taycan 4S Cross Turismo is unlike any other automotive experience. Instantaneous 650 Nm torque snaps the car forward without a hint of lag or engine vibration.",
      },
      {
        heading: "Full Smart Lift Memory for Karachi Roads",
        body: "With the Cross Turismo's GPS-enabled Smart Lift suspension, the car remembers the exact locations of prominent speed breakers on Khayaban-e-Shahbaz and Sunset Boulevard, automatically raising the ride height whenever you approach.",
      },
    ],
  },
  {
    slug: "toyota-prado-txl-2024",
    name: "Toyota Land Cruiser Prado TX-L 2.8L Diesel 2024",
    shortName: "Prado TX-L 250",
    brand: "Toyota",
    year: 2024,
    category: "Off-Road SUV",
    tagline: "The Legendary 250 Series Prado. Reborn with Heritage Styling.",
    condition: "Zero Meter • Ready Delivery",
    registration: "Unregistered (Excise Biometric Available)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Brand New Direct Import",
    pricePkr: 64500000,
    priceFormatted: "₨ 6.45 Crore",
    basePrice: 64500000,
    summary:
      "The all-new 250 Series Land Cruiser Prado TX-L combines boxy retro-heritage design with modern mechanical excellence. Powered by Toyota's bulletproof 2.8L 1GD-FTV Turbo Diesel engine with 8-speed automatic transmission and full 7-seater practicality.",
    specs: {
      power: "201 hp @ 3,000–3,400 rpm",
      torque: "500 Nm @ 1,600–2,800 rpm",
      range: "920 km (80L Fuel Tank)",
      sprint: "8.9 s (0–100 km/h)",
      charge: "Heavy-Duty Dual Battery Setup",
      drivetrain: "Full-Time 4WD with Centre & Rear Differential Locks",
      topSpeed: "185 km/h",
      seats: 7,
      weight: "2,380 kg",
      fuelEconomy: "11.5–14.0 km/L (Exceptional Diesel Efficiency)",
      transmission: "Direct-Shift 8-Speed Automatic",
      engine: "2.8L 1GD-FTV 4-Cylinder D-4D Turbo Diesel",
    },
    heroImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
    exteriorImages: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1200&auto=format&fit=crop",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "/videos/hero-showroom.mp4",
    keyFeatures: [
      {
        category: "Off-Road Capability",
        items: [
          "Full-time 4WD with electronic center and rear differential locking",
          "Stabilizer Disconnect Mechanism (SDM) for maximum wheel articulation",
          "Multi-Terrain Select (MTS) with downhill assist control and crawl mode",
          "Rigid box-frame chassis shared with the Land Cruiser 300 series",
        ],
      },
      {
        category: "Comfort & Technology",
        items: [
          "12.3\" High-Resolution Infotainment with Wireless Apple CarPlay & Android Auto",
          "Tri-zone climate control with roof-mounted vents for all 3 rows",
          "Ventilated and heated front seats with driver position memory",
          "Refrigerated coolbox in front center armrest",
        ],
      },
      {
        category: "Safety & Driver Assist",
        items: [
          "Toyota Safety Sense with Pre-Crash Safety and Pedestrian Detection",
          "360 Panoramic View Monitor with underneath obstacle camera",
          "8 Airbags including curtain airbags covering all three rows",
          "Full LED Heritage Round Headlights with auto-high beam",
        ],
      },
    ],
    paints: [
      { id: "attitude-black", name: "Attitude Black Metallic", hex: "#111827", price: 0 },
      { id: "platinum-white", name: "Platinum White Pearl", hex: "#F8FAFC", price: 250000 },
      { id: "sand-two-tone", name: "Heritage Sand with White Roof", hex: "#D2B48C", price: 420000 },
      { id: "smoky-blue", name: "Smoky Blue Metallic", hex: "#3B82F6", price: 0 },
      { id: "bronze-metallic", name: "Oxide Bronze Metallic", hex: "#785E43", price: 280000 },
      { id: "silver-metallic", name: "Silver Metallic", hex: "#94A3B8", price: 0 },
    ],
    wheels: [
      { id: "txl-20", name: "20\" Diamond-Cut Alloy Wheels", size: 20, style: "luxury", hex: "#334155", price: 0 },
      { id: "heritage-18", name: "18\" Heritage Off-Road Alloy with All-Terrain Tires", size: 18, style: "offroad", hex: "#1E293B", price: 350000 },
      { id: "black-edition-20", name: "20\" Satin Black Edition Wheels", size: 20, style: "sport", hex: "#0F172A", price: 450000 },
    ],
    interiors: [
      { id: "saddle-tan", name: "Saddle Tan Perforated Leather", material: "Premium Leather", trimHex: "#B45309", accentHex: "#F59E0B", price: 0 },
      { id: "black-leather", name: "Ebony Black with Silver Accent", material: "Durable Leather", trimHex: "#1F2937", accentHex: "#CBD5E1", price: 0 },
      { id: "chateau-grey", name: "Chateau Grey with Dark Titanium", material: "Nappa Leather", trimHex: "#64748B", accentHex: "#E2E8F0", price: 220000 },
      { id: "heritage-fabric", name: "Heavy Duty Heritage Khaki Fabric", material: "Water-Repellent Textile", trimHex: "#78716C", accentHex: "#D6D3D1", price: 0 },
    ],
    packs: [
      { id: "touring-pack", name: "Karachi Cross-Country Touring Pack", blurb: "Tow hitch receiver, roof crossbars, heavy-duty rubber floor liners, and window rain visors.", price: 480000 },
      { id: "sound-upgrade", name: "14-Speaker JBL Premium Audio", blurb: "Subwoofer and dedicated amplifier engineered for optimal acoustic balance.", price: 620000 },
      { id: "ceramic-tint", name: "3M Crystalline Thermal Window Tinting", blurb: "99% UV rejection and 60% total solar heat reduction for hot Karachi summers.", price: 180000 },
    ],
    story: [
      {
        heading: "The Undisputed Favorite of Pakistani Families",
        body: "No other SUV holds the trust and prestige of Karachi like the Toyota Prado. Its bulletproof 2.8L turbo diesel engine runs effortlessly on local fuel, parts are readily available everywhere in Pakistan, and resale value remains virtually unmatched.",
      },
      {
        heading: "Ready for Delivery at Khalid Bin Waleed Road",
        body: "Available with zero meter odometer, original Japanese import documents, customs bill of entry, and ready biometric generation for instant transfer into the purchaser's name.",
      },
    ],
  },
  {
    slug: "haval-h6-hev",
    name: "Haval H6 HEV (Hybrid Electric Vehicle) 2024",
    shortName: "Haval H6 HEV",
    brand: "Haval",
    year: 2024,
    category: "Hybrid Crossover SUV",
    tagline: "Unmatched Tech, Impressive Power, Exceptional 19 km/L Economy.",
    condition: "Karachi Registered 2024 • 1st Owner",
    registration: "Sindh Registered (Original Smart Card & Biometric Ready)",
    mileage: "8,500 km",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Local Official Sazgar Assembly (Under Warranty)",
    pricePkr: 12200000,
    priceFormatted: "₨ 1.22 Crore",
    basePrice: 12200000,
    summary:
      "Karachi's favorite modern hybrid crossover: 1.5L Turbo Petrol combined with an electric motor produces a staggering 240 hp and 530 Nm of torque, delivering seamless acceleration, L2 autonomous driver assistance, and 18–20 km/L city fuel economy.",
    specs: {
      power: "240 hp (Combined System Output)",
      torque: "530 Nm (Combined Output)",
      range: "950 km (60L Tank + Hybrid Battery)",
      sprint: "7.5 s (0–100 km/h)",
      charge: "Self-Charging Full Hybrid (No Plug Needed)",
      drivetrain: "Front-Wheel Drive with Dedicated Hybrid Transmission (DHT)",
      topSpeed: "190 km/h",
      seats: 5,
      weight: "1,720 kg",
      fuelEconomy: "18.0–20.5 km/L in Karachi Traffic",
      transmission: "2-Speed Dedicated Hybrid Transmission (DHT)",
      engine: "1.5L GW4B15D Turbo Petrol + Permanent Magnet Electric Motor",
    },
    heroImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
    exteriorImages: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "/videos/hero-showroom.mp4",
    keyFeatures: [
      {
        category: "Level 2 Autonomous Driving",
        items: [
          "Full-speed Adaptive Cruise Control with Stop & Go in traffic",
          "Lane Keeping Assist, Lane Departure Warning & Emergency Lane Centering",
          "Traffic Jam Assist & Intelligent Dodge System",
          "Autonomous Emergency Braking with Pedestrian & Cyclist Recognition",
        ],
      },
      {
        category: "Cabin & Infotainment",
        items: [
          "Panoramic Glass Sunroof with Power Sunshade",
          "12.3\" High-Definition Touchscreen with Apple CarPlay & Android Auto",
          "Wireless Fast Smartphone Charging Pad in Floating Center Console",
          "Ventilated Driver & Front Passenger Leather Seats with Electric Adjustment",
        ],
      },
      {
        category: "Parking & Cameras",
        items: [
          "360-Degree 3D High-Definition Camera with Virtual Transparency View",
          "Full Auto-Parking Assist (Parallel, Perpendicular & Diagonal Parking)",
          "Reverse Tracking Assistant (remembers and traces back the last 50 meters)",
          "6 SRS Airbags with Dual Pretensioner Seatbelts",
        ],
      },
    ],
    paints: [
      { id: "hamilton-white", name: "Hamilton White Pearl", hex: "#F3F4F6", price: 0 },
      { id: "sun-gold", name: "Sun Gold Metallic", hex: "#B45309", price: 0 },
      { id: "ayres-grey", name: "Ayres Grey Metallic", hex: "#4B5563", price: 0 },
      { id: "atlantis-blue", name: "Atlantis Blue Mica", hex: "#1D4ED8", price: 0 },
      { id: "crystal-black", name: "Crystal Black", hex: "#111827", price: 0 },
      { id: "burgundy-red", name: "Burgundy Red Metallic", hex: "#991B1B", price: 0 },
    ],
    wheels: [
      { id: "hev-19-black", name: "19\" Gloss Black Machined Alloy", size: 19, style: "sport", hex: "#111827", price: 0 },
      { id: "hev-19-silver", name: "19\" Turbine Diamond-Cut Alloy", size: 19, style: "aero", hex: "#94A3B8", price: 0 },
      { id: "matte-19", name: "19\" Dark Titanium Sport Finish", size: 19, style: "track", hex: "#374151", price: 120000 },
    ],
    interiors: [
      { id: "bordeaux-black", name: "Bordeaux Red & Black Two-Tone", material: "Perforated Eco-Leather", trimHex: "#881337", accentHex: "#111827", price: 0 },
      { id: "black-pure", name: "All-Black Cabin with Bronze Accents", material: "Premium Leatherette", trimHex: "#1F2937", accentHex: "#D97706", price: 0 },
      { id: "tan-black", name: "Cognac Tan & Charcoal Two-Tone", material: "Perforated Leather", trimHex: "#B45309", accentHex: "#1E293B", price: 150000 },
      { id: "ivory-black", name: "Ivory White & Charcoal Contrast", material: "Luxury Synthetic", trimHex: "#F1F5F9", accentHex: "#0F172A", price: 180000 },
    ],
    packs: [
      { id: "warranty-extended", name: "Sazgar 5-Year Extended Warranty", blurb: "Complete coverage of high-voltage hybrid battery, electric motor, and DHT transmission.", price: 250000 },
      { id: "footstep-pack", name: "OEM Style Heavy Duty Side Steps", blurb: "Direct-mount aluminum side running boards for effortless ingress and egress.", price: 95000 },
      { id: "ceramic-pro", name: "Karachi Climate 9H Ceramic Protection", blurb: "Protects against UV rays, acid rain, and Karachi dust storms with 3-year shine warranty.", price: 120000 },
    ],
    story: [
      {
        heading: "The Hybrid Phenomenon of Karachi",
        body: "With high fuel prices in Pakistan, the Haval H6 HEV has become the most sought-after crossover in Karachi. Averaging 18 to 20 kilometers per liter in dense Shahrah-e-Faisal traffic while offering 240 horsepower on demand, it outperforms many luxury European cars costing twice as much.",
      },
      {
        heading: "Verified Karachi Showroom Unit",
        body: "Maintained with complete service history at authorized dealership, zero accident history, first owner, and complete biometric transfer available within minutes at our Khalid Bin Waleed showroom.",
      },
    ],
  },
  {
    slug: "audi-etron-gt",
    name: "Audi e-tron GT Quattro 2023",
    shortName: "e-tron GT",
    brand: "Audi",
    year: 2023,
    category: "Electric Sports Coupe",
    tagline: "Art in Motion. 800-Volt Pure German Electric Grand Touring.",
    condition: "Sindh Registered • 12,500 km",
    registration: "Karachi Registered (Sindh Smart Card in Hand)",
    mileage: "12,500 km",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Audi Official Certified Import",
    pricePkr: 56000000,
    priceFormatted: "₨ 5.60 Crore",
    basePrice: 56000000,
    summary:
      "The Audi e-tron GT Quattro merges breathtaking aerodynamic sculpture with exhilarating 522 hp boost output. Features 800-volt charging, electric Quattro AWD, Matrix LED headlights with Audi Laser Light, and Bang & Olufsen 3D sound.",
    specs: {
      power: "522 hp (with Boost Mode)",
      torque: "640 Nm instantaneous",
      range: "488 km WLTP (93.4 kWh Battery)",
      sprint: "4.1 s (0–100 km/h)",
      charge: "270 kW DC Fast Charging (5% to 80% in 22.5 mins)",
      drivetrain: "Electric Quattro All-Wheel Drive with Controlled Rear Differential Lock",
      topSpeed: "245 km/h",
      seats: 4,
      weight: "2,275 kg",
      fuelEconomy: "Full Electric (488 km Range)",
      transmission: "2-Speed Transmission on Rear Axle, 1-Speed on Front",
      engine: "Dual Permanently Excited Synchronous Electric Motors",
    },
    heroImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
    exteriorImages: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "/videos/hero-showroom.mp4",
    keyFeatures: [
      {
        category: "Lighting & Aerodynamics",
        items: [
          "Matrix LED Headlights with Audi Laser Light (doubles high-beam range)",
          "Active Aerodynamics: 2-stage rear spoiler and front controllable air inlets",
          "Full LED animation taillight band with dynamic turn indicators",
          "Carbon fiber roof reducing weight and lowering center of gravity",
        ],
      },
      {
        category: "Cockpit & Infotainment",
        items: [
          "Audi Virtual Cockpit Plus 12.3\" with e-tron specific power displays",
          "MMI Navigation Plus with 10.1\" high-contrast MMI touch display",
          "Bang & Olufsen 3D Premium Sound System with 16 loudspeakers and 710W",
          "Sport seats pro with 18-way adjustment, pneumatic side bolsters & massage",
        ],
      },
      {
        category: "Suspension & Quattro",
        items: [
          "Three-chamber adaptive air suspension for plush ride or sharp track firmness",
          "All-wheel steering for effortless city maneuvering and high-speed stability",
          "Tungsten carbide coated brake discs with high-performance orange calipers",
          "Audi e-tron sport sound synthesizer creating progressive exterior & interior tone",
        ],
      },
    ],
    paints: [
      { id: "daytona-grey", name: "Daytona Grey Pearl Effect", hex: "#4B5563", price: 0 },
      { id: "ibis-white", name: "Ibis White", hex: "#F8FAFC", price: 0 },
      { id: "mythos-black", name: "Mythos Black Metallic", hex: "#111827", price: 0 },
      { id: "tactical-green", name: "Tactical Green Metallic", hex: "#3F6212", price: 320000 },
      { id: "tango-red", name: "Tango Red Metallic", hex: "#B91C1C", price: 280000 },
      { id: "ascariblue", name: "Ascari Blue Metallic", hex: "#1E40AF", price: 350000 },
    ],
    wheels: [
      { id: "audi-21-twin", name: "21\" 10-Spoke Trapezoidal Black Diamond Cut", size: 21, style: "sport", hex: "#1F2937", price: 0 },
      { id: "aero-20-platinum", name: "20\" 5-Twin Spoke Aerodynamic Platinum", size: 20, style: "aero", hex: "#94A3B8", price: 0 },
      { id: "rs-21-bronze", name: "21\" RS Matte Neodymium Bronze", size: 21, style: "track", hex: "#785E43", price: 480000 },
    ],
    interiors: [
      { id: "fine-nappa-black", name: "Black Fine Nappa with Rock Grey Stitch", material: "Fine Nappa Leather", trimHex: "#111827", accentHex: "#94A3B8", price: 0 },
      { id: "cognac-brown", name: "Santos Brown with Carbon Twill Inlays", material: "Full Leather", trimHex: "#7C2D12", accentHex: "#D97706", price: 280000 },
      { id: "monaco-grey", name: "Monaco Grey with Blue Honeycomb", material: "Dinamica Microfiber & Leather", trimHex: "#334155", accentHex: "#38BDF8", price: 320000 },
      { id: "red-express", name: "Arras Red with Anthracite Stitch", material: "Perforated Nappa", trimHex: "#881337", accentHex: "#E11D48", price: 450000 },
    ],
    packs: [
      { id: "carbon-exterior", name: "Audi Carbon Exterior Styling Package", blurb: "Carbon mirror caps, carbon front bumper blade, side sills, and rear diffuser inlays.", price: 950000 },
      { id: "dynamic-plus", name: "Dynamic Plus Package", blurb: "All-wheel steering, adaptive air suspension, and electronically regulated rear differential lock.", price: 820000 },
      { id: "karachi-wallbox", name: "Audi Connected 22 kW Wallbox with Installation", blurb: "Fast home charger with RFID access and smart charging schedule capabilities.", price: 380000 },
    ],
    story: [
      {
        heading: "A Rolling Masterpiece in Karachi",
        body: "The Audi e-tron GT turns heads in Karachi like few other cars. Its wide, low stance, muscular haunches, and illuminated laser headlamps create unforgettable presence on Clifton beachfront boulevards or Main Shahrah-e-Faisal at night.",
      },
      {
        heading: "Full Dealership Service Records",
        body: "Purchased brand new and maintained with complete service history, verified mileage, 100% CPLC clearance, and Sindh biometric transfer available directly through our showroom.",
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
    tagline: "The Pinnacle of Compact Sport Luxury in Pakistan.",
    condition: "Brand New Zero Meter",
    registration: "Unregistered (Invoice Ready)",
    mileage: "Zero Meter",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Brand New Official Honda Atlas",
    pricePkr: 9850000,
    priceFormatted: "₨ 98.50 Lakh",
    basePrice: 9850000,
    summary:
      "The undisputed sport sedan benchmark in Pakistan: 1.5L DOHC VTEC Turbo producing 176 hp, paired with a responsive CVT with paddle shifters, Honda SENSING active safety suite, suede and leather RS sport seats with red stitching.",
    specs: {
      power: "176 hp @ 6,000 rpm",
      torque: "220 Nm @ 1,700–4,500 rpm",
      range: "680 km (47L Tank)",
      sprint: "7.8 s (0–100 km/h)",
      charge: "Maintenance-Free 12V Battery",
      drivetrain: "Front-Wheel Drive with Drive Mode Select (Econ / Normal / Sport)",
      topSpeed: "210 km/h",
      seats: 5,
      weight: "1,340 kg",
      fuelEconomy: "13.5–16.5 km/L",
      transmission: "LL-CVT with 7-Speed Paddle Shifters",
      engine: "1.5L DOHC VTEC 16-Valve Turbocharged",
    },
    heroImage: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1200&auto=format&fit=crop",
    exteriorImages: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "/videos/hero-showroom.mp4",
    keyFeatures: [
      {
        category: "Honda SENSING Suite",
        items: [
          "Collision Mitigation Braking System (CMBS)",
          "Adaptive Cruise Control (ACC) with Low-Speed Follow",
          "Lane Keeping Assist System (LKAS) & Road Departure Mitigation",
          "Lead Car Departure Notification System (LCDN)",
        ],
      },
      {
        category: "RS Signature Styling",
        items: [
          "RS Gloss Black Trunk Spoiler & Twin Chrome Exhaust Finishers",
          "Black Shark Fin Antenna, Door Mirrors & Door Handles",
          "17\" Matte Black Multi-Spoke Alloy Wheels",
          "Full LED Headlights with LED Daytime Running Lights",
        ],
      },
      {
        category: "Cockpit & Tech",
        items: [
          "9\" Advanced Capacitive Touchscreen with Wireless Apple CarPlay",
          "7\" Full TFT Color Multi-Information Driver Display",
          "Electric Sunroof with Tilt and Slide Function",
          "Dual-Zone Automatic Climate Control with Honeycomb Mesh Air Vents",
        ],
      },
    ],
    paints: [
      { id: "meteoroid-gray", name: "Meteoroid Gray Metallic", hex: "#4B5563", price: 0 },
      { id: "taffeta-white", name: "Taffeta White", hex: "#F8FAFC", price: 0 },
      { id: "crystal-black", name: "Crystal Black Pearl", hex: "#111827", price: 0 },
      { id: "carnelian-red", name: "Carnelian Red Pearl", hex: "#991B1B", price: 0 },
      { id: "lunar-silver", name: "Lunar Silver Metallic", hex: "#94A3B8", price: 0 },
      { id: "morning-mist", name: "Morning Mist Blue Metallic", hex: "#64748B", price: 0 },
    ],
    wheels: [
      { id: "rs-17-black", name: "17\" RS Matte Black Alloy Wheels", size: 18, style: "sport", hex: "#111827", price: 0 },
      { id: "rs-18-diamond", name: "18\" Diamond Cut Sport Alloys", size: 18, style: "track", hex: "#334155", price: 180000 },
      { id: "silver-17", name: "17\" Silver Spoke Alloys", size: 18, style: "luxury", hex: "#94A3B8", price: 0 },
    ],
    interiors: [
      { id: "rs-suede-red", name: "RS Suede & Leather with Red Stitching", material: "Sport Suede & Leather", trimHex: "#111827", accentHex: "#EF4444", price: 0 },
      { id: "black-leather-red", name: "Perforated Black Leather with Ambient Red", material: "Nappa Leatherette", trimHex: "#1F2937", accentHex: "#DC2626", price: 0 },
      { id: "charcoal-grey", name: "Charcoal Grey Fabric & Leather Combo", material: "Premium Textile", trimHex: "#374151", accentHex: "#9CA3AF", price: 0 },
      { id: "tan-sport", name: "Saddle Tan Sport Edition", material: "Sport Leather", trimHex: "#9A3412", accentHex: "#F97316", price: 120000 },
    ],
    packs: [
      { id: "modullo-bodykit", name: "Honda Modulo Aerodynamic Bodykit", blurb: "Front under-spoiler, side skirts, rear under-spoiler, and illuminated door sills.", price: 220000 },
      { id: "protective-wrap", name: "Bonnet & Bumper Self-Healing PPF", blurb: "Protects against stones, bugs, and scratches on Karachi highways.", price: 110000 },
      { id: "rust-protection", name: "Coastal Karachi Anti-Rust Bitumen Underseal", blurb: "Guarantees complete chassis corrosion resistance against sea breeze.", price: 45000 },
    ],
    story: [
      {
        heading: "The Daily Driver of Karachi's Young Achievers",
        body: "Nimble, aggressive, and refined. The 11th generation Civic RS Turbo offers the perfect blend of daily driving ease in congested city centers and high-speed stability on the Karachi-Hyderabad Motorway.",
      },
      {
        heading: "Brand New Ready for On-Spot Invoicing",
        body: "Available brand new with zero meter reading, direct manufacturer invoice in your name, 100% CPLC clearance, and immediate delivery from our Khalid Bin Waleed showroom.",
      },
    ],
  },
  {
    slug: "hyundai-tucson-gls-sport",
    name: "Hyundai Tucson GLS Sport AWD 2024",
    shortName: "Tucson GLS AWD",
    brand: "Hyundai",
    year: 2024,
    category: "Compact SUV",
    tagline: "Bold Parametric Design with Confident HTRAC All-Wheel Drive.",
    condition: "Karachi Registered 2024 • Mint Condition",
    registration: "Karachi Registered (Sindh Smart Card in Hand)",
    mileage: "11,000 km",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Official Hyundai Pakistan Warranty",
    pricePkr: 8900000,
    priceFormatted: "₨ 89.00 Lakh",
    basePrice: 8900000,
    summary:
      "A stylish, dependable compact SUV tailored for Pakistani conditions: 2.0L MPI engine with HTRAC electronic all-wheel drive, panoramic sunroof, smart power tailgate, 8-way powered driver seat, and full leather upholstery.",
    specs: {
      power: "155 hp @ 6,200 rpm",
      torque: "192 Nm @ 4,000 rpm",
      range: "650 km (62L Tank)",
      sprint: "10.4 s (0–100 km/h)",
      charge: "Maintenance-Free 12V Battery",
      drivetrain: "HTRAC Electronic All-Wheel Drive with 4WD Lock",
      topSpeed: "190 km/h",
      seats: 5,
      weight: "1,550 kg",
      fuelEconomy: "11.0–13.5 km/L",
      transmission: "6-Speed Automatic Transmission with Shiftronic",
      engine: "2.0L Nu MPI DOHC 16-Valve 4-Cylinder Petrol",
    },
    heroImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
    exteriorImages: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "/videos/hero-showroom.mp4",
    keyFeatures: [
      {
        category: "Convenience & Luxury",
        items: [
          "Panoramic Glass Sunroof with One-Touch Electric Operation",
          "Smart Hands-Free Power Tailgate with Height Adjustment",
          "Dual-Zone Automatic Climate Control with Rear AC Vents",
          "8-Way Power Adjustable Driver Seat with Lumbar Support",
        ],
      },
      {
        category: "Infotainment & Cockpit",
        items: [
          "10.25\" Floating Capacitive Touchscreen with Apple CarPlay & Android Auto",
          "Wireless Mobile Phone Charger in Center Console",
          "Supervision Cluster with 4.2\" Color TFT Multi-Information Display",
          "Steering-Wheel Mounted Audio & Cruise Controls",
        ],
      },
      {
        category: "Safety & Traction",
        items: [
          "HTRAC All-Wheel Drive with 50:50 Electronic 4WD Lock",
          "Electronic Stability Control (ESC) with Hill-Start & Downhill Brake Assist",
          "Rear View Camera with Dynamic Parking Guidelines & Rear Sensors",
          "Dual Front Airbags & ABS with EBD and Brake Assist",
        ],
      },
    ],
    paints: [
      { id: "polar-white", name: "Polar White", hex: "#F8FAFC", price: 0 },
      { id: "phantom-black", name: "Phantom Black Pearl", hex: "#111827", price: 0 },
      { id: "oxford-blue", name: "Oxford Blue Metallic", hex: "#1E3A8A", price: 0 },
      { id: "silky-bronze", name: "Silky Bronze Metallic", hex: "#785E43", price: 0 },
      { id: "graphite-grey", name: "Graphite Grey Metallic", hex: "#4B5563", price: 0 },
      { id: "fiery-red", name: "Fiery Red Metallic", hex: "#B91C1C", price: 0 },
    ],
    wheels: [
      { id: "tucson-18", name: "18\" Diamond-Cut Alloy Wheels", size: 18, style: "luxury", hex: "#475569", price: 0 },
      { id: "black-18", name: "18\" Gloss Black Sport Alloys", size: 18, style: "sport", hex: "#1E293B", price: 110000 },
      { id: "titanium-19", name: "19\" Titanium Multi-Spoke Alloys", size: 19, style: "track", hex: "#334155", price: 210000 },
    ],
    interiors: [
      { id: "black-leatherette", name: "Obsidian Black Leatherette", material: "Durable Leatherette", trimHex: "#1F2937", accentHex: "#94A3B8", price: 0 },
      { id: "grey-two-tone", name: "Two-Tone Grey & Charcoal", material: "Perforated Leatherette", trimHex: "#475569", accentHex: "#E2E8F0", price: 0 },
      { id: "tan-leather", name: "Cognac Tan Premium Upholstery", material: "Soft-Touch Leather", trimHex: "#9A3412", accentHex: "#FDBA74", price: 110000 },
      { id: "black-sport", name: "Black Sport with White Contrast Stitch", material: "Sport Leatherette", trimHex: "#111827", accentHex: "#F1F5F9", price: 0 },
    ],
    packs: [
      { id: "protection-shield", name: "Karachi All-Weather Shield", blurb: "3D trunk tray, heavy duty all-weather floor mats, and heat-blocking window film.", price: 65000 },
      { id: "dashcam-dual", name: "Front & Rear 4K Parking Dashcam", blurb: "Continuous 24/7 parking surveillance with night vision and mobile app access.", price: 48000 },
      { id: "ceramic-coating", name: "Full Body 9H Ceramic Polish", blurb: "High-gloss protective coating with 2-year hydrophobic finish guarantee.", price: 85000 },
    ],
    story: [
      {
        heading: "Comfortable, Rugged & Family-Friendly",
        body: "The Tucson GLS Sport AWD has established itself as one of the most reliable and comfortable compact SUVs in Karachi. Its generous ground clearance absorbs potholed streets while the HTRAC system delivers confident grip during monsoon rains.",
      },
      {
        heading: "Pristine Karachi Certified Unit",
        body: "Single corporate owner, bumper to bumper original paint, complete maintenance records at Hyundai 3S dealership, 100% CPLC clearance, and instant biometric transfer at our showroom.",
      },
    ],
  },
  {
    slug: "lexus-rx450h-fsport",
    name: "Lexus RX450h F-Sport Hybrid AWD 2023",
    shortName: "RX450h F-Sport",
    brand: "Lexus",
    year: 2023,
    category: "Luxury Hybrid SUV",
    tagline: "Takumi Craftsmanship Meets Electrified V6 Smoothness.",
    condition: "Japan Auction Sheet Grade 4.5",
    registration: "Karachi Registered (VIP Choice Number)",
    mileage: "18,000 km",
    cplcStatus: "100% Cleared & Verified",
    auctionGrade: "Auction Sheet Grade 4.5A (Online Verifiable)",
    pricePkr: 41000000,
    priceFormatted: "₨ 4.10 Crore",
    basePrice: 41000000,
    summary:
      "The benchmark of Japanese automotive perfection: 3.5L V6 Atkinson-cycle hybrid powertrain pushing 308 hp with E-Four electric all-wheel drive, F-Sport adaptive variable suspension, Mark Levinson 15-speaker audio, and triple-beam LED headlamps.",
    specs: {
      power: "308 hp (Combined Hybrid Output)",
      torque: "335 Nm (Engine) + Dual Electric Motor Torque",
      range: "880 km (65L Fuel Tank)",
      sprint: "7.7 s (0–100 km/h)",
      charge: "Self-Charging Lexus Hybrid Drive (E-Four)",
      drivetrain: "E-Four Electronic All-Wheel Drive with Rear Electric Motor",
      topSpeed: "200 km/h",
      seats: 5,
      weight: "2,150 kg",
      fuelEconomy: "14.5–17.0 km/L (Superb for a Luxury V6 SUV)",
      transmission: "Electronically Controlled Continuously Variable Transmission (E-CVT)",
      engine: "3.5L 2GR-FXS V6 Petrol Hybrid with Dual VVT-iW",
    },
    heroImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    exteriorImages: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
    ],
    interiorImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    ],
    videoUrl: "/videos/hero-showroom.mp4",
    keyFeatures: [
      {
        category: "F-Sport Performance & Dynamics",
        items: [
          "F-Sport Adaptive Variable Suspension (AVS) with Sport S+ Mode",
          "Performance front and rear body dampers absorbing vibrations",
          "F-Sport spindle grille in dark chrome and F-Sport front bumper lip",
          "F-Sport exclusive 20\" Dark Graphite split 10-spoke alloy wheels",
        ],
      },
      {
        category: "Takumi Luxury & Audio",
        items: [
          "Mark Levinson 15-Speaker Clari-Fi Premium Audio System (835 Watts)",
          "12.3\" Touchscreen Display with Remote Touch & Heads-Up Display (HUD)",
          "Semi-Aniline F-Sport Bolstered Seats with Dark Rose Leather",
          "Triple-Beam LED Headlamps with BladeScan Adaptive High-beam System (AHS)",
        ],
      },
      {
        category: "Safety & Hybrid Excellence",
        items: [
          "Lexus Safety System+ 2.0 with All-Speed Dynamic Radar Cruise",
          "Panoramic View Monitor with 360-degree bird's eye camera",
          "10 SRS Airbags with active pedestrian protection hood",
          "Blind Spot Monitor (BSM) with Rear Cross-Traffic Braking (RCTB)",
        ],
      },
    ],
    paints: [
      { id: "sonic-titanium", name: "Sonic Titanium Metallic", hex: "#78716C", price: 0 },
      { id: "white-nova", name: "White Nova Glass Flake", hex: "#F8FAFC", price: 0 },
      { id: "graphite-black", name: "Graphite Black Glass Flake", hex: "#111827", price: 0 },
      { id: "heat-blue", name: "Heat Blue Contrast Layering", hex: "#1D4ED8", price: 280000 },
      { id: "red-mica", name: "Red Mica Crystal Shine", hex: "#991B1B", price: 220000 },
      { id: "amber-crystal", name: "Amber Crystal Shine", hex: "#B45309", price: 0 },
    ],
    wheels: [
      { id: "fsport-20", name: "20\" F-Sport Dark Graphite Split Spoke", size: 20, style: "sport", hex: "#374151", price: 0 },
      { id: "luxury-20-chrome", name: "20\" Luxury Chrome Inset Wheels", size: 20, style: "luxury", hex: "#CBD5E1", price: 240000 },
      { id: "aero-20-black", name: "20\" Satin Black Edition Wheels", size: 20, style: "track", hex: "#0F172A", price: 180000 },
    ],
    interiors: [
      { id: "dark-rose-fsport", name: "Dark Rose F-Sport Smooth Leather", material: "F-Sport Leather", trimHex: "#881337", accentHex: "#E11D48", price: 0 },
      { id: "black-fsport", name: "Black F-Sport with Naguri Aluminum Trim", material: "Smooth Leather", trimHex: "#111827", accentHex: "#94A3B8", price: 0 },
      { id: "white-black-two-tone", name: "White & Black Two-Tone F-Sport", material: "Perforated Leather", trimHex: "#F1F5F9", accentHex: "#0F172A", price: 180000 },
      { id: "noble-brown", name: "Noble Brown with Shimamoku Wood", material: "Semi-Aniline Leather", trimHex: "#78350F", accentHex: "#D97706", price: 140000 },
    ],
    packs: [
      { id: "mark-levinson-pack", name: "Mark Levinson 15-Speaker Package", blurb: "State of the art 835W sound system with Clari-Fi music restoration.", price: 420000 },
      { id: "cold-weather", name: "Thermal Glass & Heated Steering Wheel", blurb: "Heated wiper de-icer and fast cabin temperature regulation.", price: 95000 },
      { id: "ceramic-shield", name: "Karachi VIP Paint Shield & PPF", blurb: "Full front end paint protection film with 5-year hydrophobic ceramic coat.", price: 220000 },
    ],
    story: [
      {
        heading: "Whisper-Quiet Luxury in the Heart of Karachi",
        body: "The Lexus RX450h represents the golden standard of Japanese luxury. In electric EV mode, it glides through Karachi's PECHS and Clifton lanes without a whisper. When you demand power, the 3.5L V6 petrol engine seamlessly engages to provide effortless acceleration.",
      },
      {
        heading: "Verifiable Japanese Auction Sheet Grade 4.5",
        body: "Comes with an original, verifiable Japanese auction sheet grading the car at 4.5A. Zero tampering with the digital odometer, 100% CPLC clearance, and Sindh biometric transfer available directly on-site at our Khalid Bin Waleed showroom.",
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
