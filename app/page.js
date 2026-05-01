import FeatureStrip from "@/components/FeatureStrip";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";


export default function Home() {
  return (
    <>
      <header>
        <HeroSection />
      </header>
      <main>
        <FeatureStrip />
        <ProductSection />
      </main>
    </>
  );
}
