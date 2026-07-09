import FeatureStrip from "@/components/FeatureStrip";
import HeroSection from "@/components/HeroSection";
import ProductQuickView from "@/components/ProductQuickView";
import ProductSection from "@/components/ProductSection";


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
