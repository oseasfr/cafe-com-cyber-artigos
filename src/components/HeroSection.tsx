import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 flex items-center justify-center min-h-[60vh]">
      <div className="container text-center space-y-8 max-w-2xl">
        <p className="text-xl md:text-2xl text-muted-foreground">
          Artigos e insights sobre cibersegurança.
        </p>
        <Button size="lg" asChild>
          <Link to="/articles">Ver artigos</Link>
        </Button>
      </div>
    </section>
  );
}
