import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Showroom Location | Merchants Luxury Motors Karachi",
  description:
    "Visit our flagship showroom on Main Khalid Bin Waleed Road, P.E.C.H.S., Karachi. Contact our luxury vehicle desk via hotline, WhatsApp, or schedule a VIP test drive.",
  openGraph: {
    title: "Contact & Showroom Location | Merchants Luxury Motors Karachi",
    description:
      "Plot 167/C, Main Khalid Bin Waleed Road, P.E.C.H.S., Karachi. Call +92 300 2854444 or chat directly on WhatsApp.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
