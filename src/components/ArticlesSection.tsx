import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { articles } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";
import { memo } from "react";

const ArticlesSection = memo(() => {
  if (!articles || articles.length === 0) return null;

  const now = new Date().getTime();
  const recentArticles = [...articles].sort((a, b) => {
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
    const dateA = getTimestamp(a.publishedAt);
    const dateB = getTimestamp(b.publishedAt);
    const isFutureA = dateA > now;
    const isFutureB = dateB > now;
    if (isFutureA && !isFutureB) return 1;
    if (!isFutureA && isFutureB) return -1;
    if (isFutureA && isFutureB) return dateA - dateB;
    return dateB - dateA;
  });

  const topRecentArticles = recentArticles.slice(0, 3);

  return (
    <section id="artigos" className="py-16 md:py-24 bg-background">
      <div className="container">
        <Card className="border-border/50 bg-card/30 backdrop-blur p-8 md:p-12">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Artigos em Destaque
            </CardTitle>
            <CardContent className="p-0">
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Conteúdo de qualidade produzido pela nossa comunidade de
                especialistas em cybersecurity
              </p>
            </CardContent>
          </CardHeader>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {topRecentArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          {articles.length > 3 && (
            <div className="mt-8 text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/articles" className="gap-2">
                  Ver Todos os Artigos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
});

ArticlesSection.displayName = "ArticlesSection";
export default ArticlesSection;
