import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { TrustFeatures } from "@/components/TrustFeatures";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedProperties />
        <TrustFeatures />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
