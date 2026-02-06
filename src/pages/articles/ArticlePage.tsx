import { useParams, Link } from "react-router-dom";
import { articles } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import { AuthorHeader } from "@/components/AuthorHeader";
import { AuthorBioFooter } from "@/components/AuthorBioFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import NotFound from "../NotFound";

function ArticleThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void; }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-md border border-border hover:bg-muted transition-colors"
      title="Alternar tema do artigo"
      aria-label="Alternar tema"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

function useArticleTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("article-theme") as "light" | "dark" | null;
      return saved || "dark";
    }
    return "dark";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("article-theme", newTheme);
    }
  };

  return { theme, toggleTheme };
}

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Artigos`;
    }
    return () => {
      document.title = "Artigos | Café com Cyber";
    };
  }, [article]);

  if (!article) return <NotFound />;

  const articleUrl = `/articles/${article.id}`;
  const articleTheme = useArticleTheme();
  const isLight = articleTheme.theme === "light";

  // O componente de conteúdo do Markdown
  const Content = article.content;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Link to="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Artigos
            </Link>
          </Button>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight mb-4">
          {article.title}
        </h1>

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <AuthorHeader
          author={article.author}
          authorFirstName={article.authorFirstName}
          authorLastName={article.authorLastName}
          authorAvatar={article.authorAvatar}
          authorSocialLink={article.authorSocialLink}
          publishedAt={article.publishedAt}
          readTime={article.readTime}
        />

        <div className="mb-6">
          <ShareButtons
            title={article.title}
            url={articleUrl}
            themeToggle={
              <ArticleThemeToggle
                theme={articleTheme.theme}
                onToggle={articleTheme.toggleTheme}
              />
            }
          />
        </div>

        {article.imageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-auto max-h-96 object-cover bg-muted/20 rounded-lg"
            />
          </div>
        )}

        <article className={`prose prose-lg max-w-none ${isLight ? "prose-slate" : "prose-invert prose-slate"}`}>
          {/* Renderiza o componente Markdown diretamente */}
          <Content />
        </article>

        <AuthorBioFooter
          author={article.author}
          authorFirstName={article.authorFirstName}
          authorLastName={article.authorLastName}
          authorAvatar={article.authorAvatar}
          authorBio={article.authorBio}
          authorSocialLink={article.authorSocialLink}
        />

        <div className="mt-8">
          <Button asChild variant="outline">
            <Link to="/articles">Ver Todos os Artigos</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
