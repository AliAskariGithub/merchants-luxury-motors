import { redirect } from "next/navigation";
import { carSlugs } from "@/lib/cars";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return carSlugs.map((slug) => ({ slug }));
}

export default async function ModelsSlugRedirect({ params }: Params) {
  const { slug } = await params;
  redirect(`/inventory/${slug}`);
}
