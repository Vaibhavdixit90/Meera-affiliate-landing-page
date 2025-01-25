import { AmbientColor } from "@/components/ambient-color";
import { CTA } from "@/components/cta";
import { ProgramFor } from "@/components/ProgramFor";
import { Hero } from "@/components/hero";
import SampleCalculation from "@/components/SampleCalculation";
import { WhyUs } from "@/components/WhyUs";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <Hero />
      <WhyUs />
      <ProgramFor />
      <SampleCalculation />
      <CTA />
    </div>
  );
}
