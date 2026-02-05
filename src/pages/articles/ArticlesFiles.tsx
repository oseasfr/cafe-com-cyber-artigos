import { articles } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";

export default function ArticlesFiles() {
  if (!articles || articles.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16">
          <h1 className="text-3xl font-bold mb-4">Todos os Artigos</h1>
          <p className="text-muted-foreground">Nenhum artigo disponível no momento.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const sortedArticles = [...articles].sort((a, b) => {
    const getTimestamp = (publishedAt: string | undefined): number => {
      if (!publishedAt) return 0;
      let dateStr = publishedAt;
      if (dateStr.includes("T")) {
        const hasTimezone =
          dateStr.includes("Z") ||
          dateStr.includes("+") ||
          /[+-]\d{2}:?\d{2}$/.test(dateStr);
        if (!hasTimezone) dateStr = dateStr + "Z";
      }
      return new Date(dateStr).getTime();
    };
    return getTimestamp(b.publishedAt) - getTimestamp(a.publishedAt);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Todos os Artigos
          </h1>
          <p className="text-muted-foreground">
            Explore nossa coleção completa de artigos sobre cibersegurança
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {articles.length}{" "}
            {articles.length === 1 ? "artigo encontrado" : "artigos encontrados"}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
