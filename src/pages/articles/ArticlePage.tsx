import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { articles } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import { AuthorHeader } from "@/components/AuthorHeader";
import { AuthorBioFooter } from "@/components/AuthorBioFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import NotFound from "../NotFound";

function stripHeadingQuotes(children: ReactNode): ReactNode {
  const strip = (s: string) => s.replace(/^["'\u201C\u201D\u2018\u2019]+|["'\u201C\u201D\u2018\u2019]+$/g, "").trim();
  if (typeof children === "string") {
    return strip(children);
  }
  if (Array.isArray(children)) {
    return children.map((child) => (typeof child === "string" ? strip(child) : child));
  }
  return children;
}

function stripHeadingQuotesFromContent(content: string): string {
  return content.replace(/^(#{1,6})\s*["'\u201C\u201D\u2018\u2019]([^"'\u201C\u201D\u2018\u2019]*)["'\u201C\u201D\u2018\u2019]\s*$/gm, "$1 $2");
}

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
      aria-label="Alternar tema"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

function useArticleTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("article-theme") as
        | "light"
        | "dark"
        | null;
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
  const { articleId } = useParams();
  const article = articles.find((a) => a.id === articleId);

  if (!article) return <NotFound />;

  const articleUrl = `/articles/${article.id}`;
  const fullUrl =
    typeof window !== "undefined"
      ? window.location.origin + articleUrl
      : articleUrl;

  const shareImageUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/favicon.ico"
      : "/favicon.ico";

  useEffect(() => {
    document.title = `${article.title} | Artigos`;

    const updateMetaTag = (
      property: string,
      content: string,
      isProperty = true
    ) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMetaTag("og:title", article.title);
    updateMetaTag("og:description", article.description);
    updateMetaTag("og:type", "article");
    updateMetaTag("og:url", fullUrl);
    updateMetaTag("og:image", shareImageUrl);
    updateMetaTag("description", article.description, false);

    return () => {
      document.title = "Artigos | Café com Cyber";
    };
  }, [article, fullUrl, shareImageUrl]);

  const articleTheme = useArticleTheme();
  const isLight = articleTheme.theme === "light";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
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
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md"
              >
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

        <div className="mb-10">
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

        <article
          className={`prose prose-lg max-w-none mt-8 ${
            isLight
              ? "prose-slate bg-white text-gray-900 rounded-lg p-6 md:p-8"
              : "prose-invert prose-slate"
          }`}
          data-article-content
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1>{stripHeadingQuotes(children)}</h1>,
              h2: ({ children }) => <h2>{stripHeadingQuotes(children)}</h2>,
              h3: ({ children }) => <h3>{stripHeadingQuotes(children)}</h3>,
              h4: ({ children }) => <h4>{stripHeadingQuotes(children)}</h4>,
              h5: ({ children }) => <h5>{stripHeadingQuotes(children)}</h5>,
              h6: ({ children }) => <h6>{stripHeadingQuotes(children)}</h6>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-primary hover:underline"
                >
                  {children}
                </a>
              ),
              pre: ({ children }) => (
                <pre
                  className={`p-4 rounded-lg overflow-x-auto my-4 ${
                    isLight ? "bg-gray-100 text-gray-800" : "bg-muted text-foreground"
                  }`}
                >
                  {children}
                </pre>
              ),
              code: ({ className, children }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code
                      className={`${
                        isLight
                          ? "bg-gray-100 text-gray-800"
                          : "bg-muted text-foreground"
                      } px-1.5 py-0.5 rounded text-sm`}
                    >
                      {children}
                    </code>
                  );
                }
                return <code>{children}</code>;
              },
            }}
          >
            {stripHeadingQuotesFromContent(article.content)}
          </ReactMarkdown>
        </article>

        <div className="mt-8">
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
