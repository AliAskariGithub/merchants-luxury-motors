import type { Metadata, Viewport } from "next";
import { Geist, Sora } from "next/font/google";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import LoadingScreen from "@/components/ui/LoadingScreen";
import PageTransition from "@/components/ui/PageTransition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://merchantsmotors.pk"),
  title: {
    default: "Merchants Luxury Motors — Premier Car Showroom | Khalid Bin Waleed Road, Karachi",
    template: "%s | Merchants Luxury Motors Karachi",
  },
  description:
    "Karachi's premier luxury car dealership on Khalid Bin Waleed Road, PECHS. Explore verified Toyota Land Cruiser LC300, Mercedes-Benz, Porsche, Prado, Haval, and luxury Japanese imports. 100% CPLC cleared & verified.",
  applicationName: "Merchants Luxury Motors Karachi",
  authors: [{ name: "Merchants Luxury Motors", url: "https://merchantsmotors.pk" }],
  creator: "Merchants Luxury Motors Karachi",
  publisher: "Merchants Luxury Motors",
  category: "Automotive",
  keywords: [
    "car showroom karachi",
    "khalid bin waleed road car dealerships",
    "luxury cars karachi",
    "land cruiser lc300 karachi",
    "merchants motors karachi",
    "mercedes karachi",
    "porsche karachi",
    "cplc verified cars karachi",
    "japanese cars import karachi",
    "luxury suv karachi",
    "car financing karachi",
    "sell car karachi",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Merchants Luxury Motors — Karachi's Premier Car Showroom",
    description:
      "Exclusive collection of Land Cruisers, Mercedes-Benz, Porsche, and luxury Japanese imports on Khalid Bin Waleed Road, Karachi. 100% CPLC cleared & grade 5A verified.",
    url: "https://merchantsmotors.pk",
    siteName: "Merchants Luxury Motors Karachi",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/images/hero-preview.png",
        width: 1440,
        height: 850,
        alt: "Merchants Luxury Motors Showroom — Khalid Bin Waleed Road Karachi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merchants Luxury Motors — Premier Car Showroom Karachi",
    description:
      "Explore Karachi's premier luxury car collection on Khalid Bin Waleed Road. Land Cruiser LC300, Mercedes-Benz, Porsche & Japanese Imports. 100% CPLC cleared.",
    images: ["/images/hero-preview.png"],
    creator: "@MerchantsMotors",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <LoadingScreen />
        <PageTransition />
        <div className="grid-backdrop" aria-hidden="true" />
        <div className="relative z-10 flex min-h-full flex-col">
          <Navbar />
          {children}
          <Footer />
        </div>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
