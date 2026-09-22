export type ShowroomFacility = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type BankingPartner = {
  name: string;
  type: "Islamic" | "Conventional";
  rate: string;
  tenure: string;
  processingTime: string;
  features: string[];
};

export const KARACHI_SHOWROOM = {
  name: "Merchants Luxury Motors Karachi",
  tagline: "Karachi's Premier Destination for Luxury & Exotic Automobiles",
  subtitle: "Main Khalid Bin Waleed Road, P.E.C.H.S., Karachi",
  city: "Karachi",
  province: "Sindh",
  country: "Pakistan",
  established: 2008,
  legacyYears: 18,
  address: "Plot 167/C, Parsa City Luxuria, Main Khalid Bin Waleed Road, Block 3, P.E.C.H.S., Karachi, 75400",
  landmark: "Between Tariq Road & Shaheed-e-Millat Road (Opposite PECHS Market)",
  
  phonePrimary: "+92 330 2892227",
  phoneDisplay: "0330-2892227",
  phoneLandline: "+92 21 3455 8890",
  landlineDisplay: "(021) 3455-8890",
  whatsappNumber: "+923302892227",
  email: "sales@merchantsmotors.pk",
  supportEmail: "info@merchantsmotors.pk",
  
  timings: {
    weekdays: "Monday – Saturday: 10:30 AM – 9:00 PM",
    fridayBreak: "Friday Prayer Break: 1:00 PM – 2:30 PM",
    sunday: "Sunday: Open by VIP Appointment Only",
  },
  
  metrics: [
    { value: "150+", label: "Verified Vehicles in Stock" },
    { value: "18+", label: "Years in Karachi" },
    { value: "100%", label: "CPLC & Sindh Excise Cleared" },
    { value: "12,000+", label: "Satisfied Customers" },
  ],

  guarantees: [
    {
      title: "100% CPLC & Police Verification",
      description: "Every vehicle undergoes official Car Protection and Liaison Committee (CPLC) clearance with physical record certificates.",
      badge: "CPLC Verified",
    },
    {
      title: "Sindh Excise Biometric on Spot",
      description: "Full biometric transfer facility available at our Khalid Bin Waleed showroom for immediate ownership transfer.",
      badge: "Instant Transfer",
    },
    {
      title: "Authentic Japan Auction Sheet (Grade 4.5+ / 5A)",
      description: "100% verifiable original Japanese auction sheets online with tamper-free authentic digital odometer tracking.",
      badge: "Genuine Odometer",
    },
    {
      title: "150-Point Certified Inspection",
      description: "Comprehensive mechanical, electrical, computer scanner (OBD2) and paint gauge inspection performed on every unit.",
      badge: "150-Pt Inspected",
    },
  ],

  facilities: [
    {
      id: "showroom-floor",
      title: "Multi-Level Climate Controlled Showroom",
      description: "Spread across 3 spacious floors housing over 150 luxury SUVs, sedans, crossovers, and exotic sports cars.",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "vip-lounge",
      title: "Executive VIP Client Lounge",
      description: "Comfortable private meeting suites with barista coffee bar, high-speed Wi-Fi, and personalized automotive consultation.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "detailing-bay",
      title: "State-of-the-Art Detailing & PDI Center",
      description: "Specialized paint-protection film (PPF), 9H ceramic coating, and pre-delivery multi-point preparation bays.",
      image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop",
    },
  ] as ShowroomFacility[],

  bankingPartners: [
    {
      name: "Meezan Bank Car Ijarah",
      type: "Islamic",
      rate: "From 12.5% p.a. (Shariah Compliant)",
      tenure: "1 to 5 Years",
      processingTime: "Fast-Track 3-5 Working Days",
      features: [
        "100% Riba-Free Shariah Certified",
        "Up to 80% financing value",
        "Lowest insurance (Takaful) rates in Karachi",
        "Early settlement options without harsh penalties",
      ],
    },
    {
      name: "Bank Alfalah Auto Loan",
      type: "Conventional",
      rate: "Competitive KIBOR + Spread",
      tenure: "1 to 7 Years",
      processingTime: "Express 48-Hour Approval",
      features: [
        "Doorstep documentation pickup across Karachi",
        "Zero hidden documentation charges",
        "Special corporate rates for Karachi executives",
      ],
    },
    {
      name: "Faysal Islamic Auto Finance",
      type: "Islamic",
      rate: "Shariah Compliant Fixed / Floating",
      tenure: "1 to 5 Years",
      processingTime: "3 to 4 Working Days",
      features: [
        "Approved by renowned Shariah Board",
        "Co-borrower option for family members",
        "Tracker installation included with real-time app",
      ],
    },
  ] as BankingPartner[],

  testimonials: [
    {
      name: "Tariq Mansoor",
      role: "CEO, Mansoor Textiles (Clifton, Karachi)",
      vehicle: "Toyota Land Cruiser ZX LC300 2024",
      comment:
        "Purchasing our LC300 from Merchants Luxury Motors on Khalid Bin Waleed Road was seamless. Sindh biometric transfer was handled inside the showroom in 30 minutes, and the vehicle was 100% spotless. Truly Karachi's best dealership.",
      rating: 5,
    },
    {
      name: "Dr. Ayesha Zubair",
      role: "Consultant Surgeon (DHA Phase 6, Karachi)",
      vehicle: "Porsche Taycan 4S Cross Turismo",
      comment:
        "Transparent Japanese auction sheet verification and impeccable customer service. They arranged charging setup guidance and doorstep delivery right to my home in DHA. Highly recommended!",
      rating: 5,
    },
    {
      name: "Kamran Siddiqui",
      role: "Director, Maritime Logistics (KDA Scheme 1)",
      vehicle: "Mercedes-Benz S580 4MATIC",
      comment:
        "I have bought three cars from Merchants Motors over the last 8 years. Their word on vehicle condition and documentation is gold. No hidden odometer rolls, no paperwork headache.",
      rating: 5,
    },
  ],
};

export function getWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(
    message ||
      "Hello Merchants Luxury Motors Karachi! I am browsing your showroom website and would like to inquire about available vehicles on Khalid Bin Waleed Road.",
  );
  return `https://wa.me/923302892227?text=${text}`;
}

export function formatPkr(amount: number): string {
  if (amount >= 10000000) {
    const crore = (amount / 10000000).toFixed(2);
    return `₨ ${crore} Crore`;
  }
  if (amount >= 100000) {
    const lakh = (amount / 100000).toFixed(2);
    return `₨ ${lakh} Lakh`;
  }
  return `₨ ${amount.toLocaleString("en-PK")}`;
}

export function calculateMonthlyEmi(
  price: number,
  downPaymentPercent: number = 30,
  years: number = 3,
  annualRate: number = 14.5,
): number {
  const principal = price * (1 - downPaymentPercent / 100);
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}
