import FeatureStrip from "@/components/main/FeatureStrip";
import HeroSection from "@/components/main/HeroSection";
import ProductSection from "@/components/main/ProductSection";


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
