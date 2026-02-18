import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1920&q=80";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      <div className="container relative z-10 px-4 py-20 text-center md:py-28">
        <div className="mx-auto max-w-2xl space-y-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Artigos e insights sobre cibersegurança
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Conteúdo para expandir seu conhecimento e acompanhar o que importa.
          </p>
          <div>
            <Button size="lg" asChild className="shadow-lg">
              <Link to="/articles">Ver artigos</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
