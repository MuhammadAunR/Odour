import FeatureStrip from "@/components/FeatureStrip";
import FooterSection from "@/components/FooterSection";
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
      <footer>
        <FooterSection />
      </footer>
    </>
  );
}
