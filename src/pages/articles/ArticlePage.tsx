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
import ReactMarkdown from "react-markdown";

function ArticleThemeToggle({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-md border border-border hover:bg-muted transition-colors"
      title="Alternar tema do artigo"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    if (!article) return;

    document.title = `${article.title} | Café com Cyber`;

    fetch(article.content)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, [article]);

  if (!article) return <NotFound />;

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const isLight = theme === "light";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Artigos
            </Link>
          </Button>
        </div>

        <h1 className="text-4xl font-extrabold mb-4">{article.title}</h1>

        <AuthorHeader
          author={article.author}
          authorAvatar={article.authorAvatar}
          publishedAt={article.publishedAt}
          readTime={article.readTime}
        />

        <div className="my-6">
          <ShareButtons
            title={article.title}
            url={window.location.href}
            themeToggle={
              <ArticleThemeToggle
                theme={theme}
                onToggle={() => setTheme(isLight ? "dark" : "light")}
              />
            }
          />
        </div>

        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full rounded-lg mb-8 max-h-96 object-cover"
          />
        )}

        <article
          className={`prose prose-lg max-w-none ${
            isLight ? "prose-slate" : "prose-invert prose-slate"
          }`}
        >
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>

        <AuthorBioFooter
          author={article.author}
          authorBio={article.authorBio}
          authorAvatar={article.authorAvatar}
        />
      </main>

      <Footer />
    </div>
  );
}
