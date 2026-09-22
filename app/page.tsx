import ShowroomHero from "../components/site/ShowroomHero";
import Models from "../components/site/Models";
import ShowroomGuarantees from "../components/site/ShowroomGuarantees";
import Sustainability from "../components/site/Sustainability";
import Testimonials from "../components/site/Testimonials";
import Reserve from "../components/site/Reserve";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <ShowroomHero />
      <Models />
      <ShowroomGuarantees />
      <Sustainability />
      <Testimonials />
      <Reserve />
    </main>
  );
}
