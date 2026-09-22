import type { Metadata } from "next";
import InventoryClient from "./InventoryClient";

export const metadata: Metadata = {
  title: "Showroom Inventory | Merchants Luxury Motors Karachi",
  description:
    "Explore our live inventory of verified luxury vehicles on Khalid Bin Waleed Road, Karachi. Toyota Land Cruiser LC300, Mercedes-Benz, Porsche, Prado, Haval, and Audi. 100% CPLC cleared.",
};

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-neutral-100 py-12 sm:py-16">
      <InventoryClient />
    </main>
  );
}
