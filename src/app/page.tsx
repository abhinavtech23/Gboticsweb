import HeroSection from "@/components/sections/home/hero";
import FeaturesSection from "@/components/sections/home/features";
import ShowcaseSection from "@/components/sections/home/showcase";
import WhyGboticsSection from "@/components/sections/home/why-gbotics";
import TextSplitDemoSection from "@/components/sections/home/text-split-demo";
import Footer from "@/components/navigation/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <WhyGboticsSection />
      <TextSplitDemoSection />
      <Footer />
    </>
  );
}
