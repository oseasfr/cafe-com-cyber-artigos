import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { articles } from "../../data/articles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import CommentsSection from "../../components/CommentsSection";
import { AuthorHeader } from "../../components/AuthorHeader";
import { AuthorBioFooter } from "../../components/AuthorBioFooter";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Copy, Check, Sun, Moon } from "lucide-react";
import React, { useState, useEffect } from "react";
import NotFound from "../NotFound";

/* ============================================================
   TEMA ISOLADO
============================================================ */
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

/* ============================================================
   BLOCO DE CÓDIGO COM COPIAR
============================================================ */
function CodeBlock({ children, theme, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const isLight = theme === "light";

  const getCodeText = (node: any): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getCodeText).join("");
    if (node?.props?.children) return getCodeText(node.props.children);
    return String(node);
  };

  const code = getCodeText(children).replace(/\n$/, "");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="relative group">
      <pre
        className={`p-4 rounded-lg overflow-x-auto mb-4 ${
          isLight ? "bg-gray-100 text-gray-800" : "bg-cyber-darker text-primary"
        }`}
        {...props}
      >
        {children}
      </pre>

      <button
        onClick={copyToClipboard}
        className={`absolute top-2 right-2 p-2 rounded-md transition-colors opacity-0 group-hover:opacity-100 z-10 ${
          isLight
            ? "bg-gray-200 hover:bg-gray-300 border border-gray-300 text-gray-700 hover:text-gray-900"
            : "bg-cyber-darker/80 hover:bg-cyber-darker border border-border text-muted-foreground hover:text-foreground"
        }`}
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

/* ============================================================
   EXTRAÇÃO DE TEXTO PARA HEADINGS
============================================================ */
function extractTextFromChildren(children: any): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractTextFromChildren).join("");
  if (React.isValidElement(children)) return extractTextFromChildren(children.props.children);
  if (children?.props?.children) return extractTextFromChildren(children.props.children);
  if (children?.value) return String(children.value);
  return "";
}

/* ============================================================
   GERADOR DE ID PARA HEADINGS
============================================================ */
function generateHeadingId(text: string | any): string {
  const textString = typeof text === "string" ? text : extractTextFromChildren(text);
  if (!textString) return "";
  return textString
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ============================================================
   CONTEÚDO DO ARTIGO
============================================================ */
function ArticleContent({ article, theme }: { article: typeof articles[0]; theme: "light" | "dark" }) {
  const isLight = theme === "light";

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const articleElement = document.querySelector("article[data-article-content], article");
      if (articleElement) {
        const headers = articleElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
        headers.forEach((header) => {
          if (!header.id) {
            const id = generateHeadingId(header.textContent || "");
            if (id) header.id = id;
          }
        });
      }
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [article.content]);

  const processContentWithYouTubeImages = (content: string) => {
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;

    const regex = /\[!\[([^\]]*)\]\(([^)]+)\)\]\((https?:\/\/[^\)]+)\)/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const [fullMatch, alt, imgPath, link] = match;
      const startIndex = match.index;

      if (startIndex > lastIndex) parts.push(content.substring(lastIndex, startIndex));

      if (link.includes("youtu.be") || link.includes("youtube.com")) {
        parts.push(
          <a
            key={`youtube-${startIndex}`}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer hover:opacity-90 transition-opacity my-4"
          >
            <img src={imgPath} alt={alt} className="w-full h-auto rounded-lg cursor-pointer" />
          </a>
        );
      } else {
        parts.push(fullMatch);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) parts.push(content.substring(lastIndex));

    return parts.length > 0 ? parts : [content];
  };

  const processedParts = processContentWithYouTubeImages(article.content);
  const hasReactComponents = processedParts.some((p) => React.isValidElement(p));

  const markdownComponents = {
    h1: ({ children, ...props }: any) => {
      const id = generateHeadingId(children);
      return (
        <h1 id={id} className={`text-3xl font-bold mt-8 mb-4 scroll-mt-20 ${isLight ? "text-gray-900" : "text-foreground"}`} {...props}>
          {children}
        </h1>
      );
    },
    h2: ({ children, ...props }: any) => {
      const id = generateHeadingId(children);
      return (
        <h2 id={id} className={`text-2xl font-bold mt-6 mb-3 scroll-mt-20 ${isLight ? "text-gray-800" : "text-foreground"}`} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }: any) => {
      const id = generateHeadingId(children);
      return (
        <h3 id={id} className={`text-xl font-semibold mt-4 mb-2 scroll-mt-20 ${isLight ? "text-gray-800" : "text-foreground"}`} {...props}>
          {children}
        </h3>
      );
    },
    p: ({ ...props }: any) => (
      <p className={`leading-relaxed mb-4 ${isLight ? "text-gray-700" : "text-muted-foreground"}`} {...props} />
    ),
    code: ({ className, children, ...props }: any) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className={`px-2 py-1 rounded font-mono text-sm ${isLight ? "bg-gray-100 text-blue-600" : "bg-cyber-darker text-primary"}`} {...props}>
            {children}
          </code>
        );
      }
      return <CodeBlock theme={theme}>{children}</CodeBlock>;
    },
    a: ({ children, href, ...props }: any) => {
      let hasImage = false;

      if (React.isValidElement(children)) {
        hasImage = (children as any)?.type === "img" || (children as any)?.props?.src;
      } else if (Array.isArray(children)) {
        hasImage = children.some((child: any) => React.isValidElement(child) && ((child as any).type === "img" || (child as any).props?.src));
      }

      if (hasImage) {
        return (
          <a className="block cursor-pointer hover:opacity-90 transition-opacity my-4" target="_blank" rel="noopener noreferrer" href={href} {...props}>
            {children}
          </a>
        );
      }

      if (href?.startsWith("#")) {
        const handleAnchorClick = (e: any) => {
          e.preventDefault();
          let targetId = decodeURIComponent(href.substring(1));

          const findAndScroll = (attempts = 0) => {
            let element = document.getElementById(targetId);

            if (!element) {
              const normalizedId = targetId
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "");

              element = document.getElementById(normalizedId);
              if (element) targetId = normalizedId;
            }

            if (element) {
              const headerHeight = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

              window.scrollTo({ top: Math.max(0, offsetPosition), behavior: "smooth" });
            } else if (attempts < 5) {
              setTimeout(() => findAndScroll(attempts + 1), 100);
            }
          };

          findAndScroll();
        };

        return (
          <a className="text-primary hover:underline cursor-pointer" href={href} onClick={handleAnchorClick} {...props}>
            {children}
          </a>
        );
      }

      return (
        <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" href={href} {...props}>
          {children}
        </a>
      );
    }
  };

  return (
    <div data-article-content className={`rounded-lg p-6 transition-colors ${isLight ? "bg-white text-gray-900 border border-gray-200" : "bg-transparent"}`}>
      <article className={`prose max-w-none ${isLight ? "prose-slate" : "prose-invert"}`}>
        {hasReactComponents ? (
          <>
            {processedParts.map((part, index) =>
              React.isValidElement(part) ? (
                <React.Fragment key={`yt-${index}`}>{part}</React.Fragment>
              ) : (
                <ReactMarkdown key={`md-${index}`} components={markdownComponents}>
                  {part as string}
                </ReactMarkdown>
              )
            )}
          </>
        ) : (
          <ReactMarkdown components={markdownComponents}>{article.content}</ReactMarkdown>
        )}
      </article>
    </div>
  );
}

/* ============================================================
   TOGGLE DE TEMA
============================================================ */
function ArticleThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  return (
    <Button variant="outline" size="icon" onClick={onToggle} aria-label="Alternar tema do artigo">
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

/* ============================================================
   PÁGINA PRINCIPAL
============================================================ */
export default function ArticlePage() {
  const { articleId } = useParams();
  const article = articles.find((a) => a.id === articleId);

  if (!article) return <NotFound />;

  const articleUrl = `/articles/${article.id}`;
  const fullUrl = typeof window !== "undefined" ? window.location.origin + articleUrl : articleUrl;

  const getShareImageUrl = () =>
    typeof window !== "undefined"
      ? window.location.origin + "/lovable-uploads/icone-home.png"
      : "/lovable-uploads/icone-home.png";

  const getImageUrl = () => {
    if (!article.imageUrl) {
      return typeof window !== "undefined"
        ? window.location.origin + "/lovable-uploads/5d9ff38a-d664-47c2-bd17-2ea73ba5f9d4.png"
        : "";
    }
    if (article.imageUrl.startsWith("http")) return article.imageUrl;
    const path = article.imageUrl.startsWith("/") ? article.imageUrl : "/" + article.imageUrl;
    return typeof window !== "undefined" ? window.location.origin + path : path;
  };

  const imageUrl = getImageUrl();
  const shareImageUrl = getShareImageUrl();

  useEffect(() => {
    document.title = `${article.title} | Café com Cyber`;

    const updateMetaTag = (property: string, content: string, isProperty = true) => {
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

    updateMetaTag("twitter:card", "summary_large_image", false);
    updateMetaTag("twitter:title", article.title, false);
    updateMetaTag("twitter:description", article.description, false);
    updateMetaTag("twitter:image", shareImageUrl, false);

    updateMetaTag("description", article.description, false);

    return () => {
      document.title = "Café com Cyber";
    };
  }, [article, fullUrl, shareImageUrl]);

  const articleTheme = useArticleTheme();

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

        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight mb-4">{article.title}</h1>

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
          authorSocialType={article.authorSocialType}
          publishedAt={article.publishedAt}
          readTime={article.readTime}
        />

        <ShareButtons
          title={article.title}
          url={articleUrl}
          description={article.description}
          themeToggle={<ArticleThemeToggle theme={articleTheme.theme} onToggle={articleTheme.toggleTheme} />}
          articleId={article.id}
          showStats={true}
        />

        {article.imageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden mt-6">
            <img src={imageUrl} alt={article.title} className="w-full h-auto max-h-64 object-contain bg-muted/20" />
          </div>
        )}

        <ArticleContent article={article} theme={articleTheme.theme} />

        <div className="mt-8">
          <ShareButtons title={article.title} url={articleUrl} description={article.description} articleId={article.id} showStats={false} />
        </div>

        <AuthorBioFooter
          author={article.author}
          authorFirstName={article.authorFirstName}
          authorLastName={article.authorLastName}
          authorAvatar={article.authorAvatar}
          authorBio={article.authorBio}
          authorSocialLink={article.authorSocialLink}
          authorSocialType={article.authorSocialType}
        />

        <CommentsSection articleId={article.id} />

        <div className="mt-12 pt-8 border-t border-border">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ver Todos os Artigos
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
