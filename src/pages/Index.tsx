import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ArticlesSection from "@/components/ArticlesSection";
import CommunitySection from "@/components/CommunitySection";
import AboutSection from "@/components/AboutSection";
import PasswordGeneratorSection from "@/components/PasswordGeneratorSection";
import InstagramSection from "@/components/InstagramSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main role="main">
        <HeroSection />
        <ArticlesSection />
        <CommunitySection />
        <AboutSection />
        <PasswordGeneratorSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
