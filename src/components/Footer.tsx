export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container">
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Blog XPTO — Estrutura de Artigos
        </p>
      </div>
    </footer>
  );
}
