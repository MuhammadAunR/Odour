import FeatureStrip from "@/components/main/FeatureStrip";
import HeroSection from "@/components/main/HeroSection";
import ProductQuickView from "@/components/main/ProductQuickView";
import ProductSection from "@/components/main/ProductSection";


export default function Home() {
  return (
    <>
      <ProductQuickView />
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
