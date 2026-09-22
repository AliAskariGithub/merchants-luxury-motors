import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cars, carSlugs, getCar } from "@/lib/cars";
import CarDetailClient from "./CarDetailClient";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return carSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return {};
  return {
    title: `${car.name} — ${car.priceFormatted} | Merchants Luxury Motors Karachi`,
    description: `${car.name} available at our Khalid Bin Waleed Road showroom in Karachi. ${car.summary} 100% CPLC verified.`,
    openGraph: {
      title: `${car.name} | Merchants Luxury Motors Karachi`,
      description: car.summary,
      images: [car.heroImage],
    },
  };
}

export default async function CarDetailPage({ params }: Params) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();

  const relatedCars = cars.filter((c) => c.slug !== car.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-neutral-100 py-10 sm:py-14">
      <CarDetailClient car={car} relatedCars={relatedCars} />
    </main>
  );
}
