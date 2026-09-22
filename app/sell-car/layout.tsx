import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell or Consign Your Luxury Car | Merchants Luxury Motors Karachi",
  description:
    "Get immediate valuation and transparent consignment for your luxury car on Khalid Bin Waleed Road, Karachi. Same-day bank transfers & doorstep inspection across Karachi.",
  openGraph: {
    title: "Sell or Consign Your Luxury Car | Merchants Luxury Motors Karachi",
    description:
      "Instant market valuation, doorstep inspection, and same-day bank transfers for luxury SUVs and executive sedans in Karachi.",
  },
};

export default function SellCarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
