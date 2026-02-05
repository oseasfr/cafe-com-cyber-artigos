import Header from "@/components/Header";
import ArticlesSection from "@/components/ArticlesSection";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Artigos
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Conteúdo de qualidade sobre cibersegurança
            </p>
          </div>
        </section>
        <ArticlesSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
