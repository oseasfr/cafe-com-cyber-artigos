import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Café com Cyber — Estrutura de Artigos
        </p>
        <nav className="flex gap-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Início
          </Link>
          <Link
            to="/articles"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Artigos
          </Link>
        </nav>
      </div>
    </footer>
  );
}
