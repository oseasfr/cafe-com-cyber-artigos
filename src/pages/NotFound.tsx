import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container text-center py-16">
          <FileQuestion className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-4xl font-bold mb-2">Página não encontrada</h1>
          <p className="text-muted-foreground mb-6">
            A página que você procura não existe ou foi movida.
          </p>
          <Button asChild>
            <Link to="/">Voltar ao Início</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
