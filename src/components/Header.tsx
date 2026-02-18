import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <FileText className="h-6 w-6 text-primary" />
          <span>Artigos</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Início
          </Link>
          <Link
            to="/articles"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Todos os Artigos
          </Link>
        </nav>
      </div>
    </header>
  );
}
