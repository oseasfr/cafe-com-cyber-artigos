import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getArticleIcon } from "@/lib/articleIcons";

interface ArticleProps {
  article: {
    id: string;
    title: string;
    description: string;
    author: string;
    readTime: string;
    category: string;
    icon: string;
    gradient: string;
    imageUrl?: string;
  };
}

export const ArticleCard = ({ article }: ArticleProps) => {
  const { Icon, color } = getArticleIcon(article.category, article.icon);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur flex flex-col h-full">
      <CardHeader className="space-y-4">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${article.gradient} flex items-center justify-center`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {article.category}
          </Badge>
          <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-4">
            <Link
              to={`/articles/${article.id}`}
              className="no-underline hover:text-primary"
            >
              {article.title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col flex-grow">
        <CardDescription className="text-sm leading-relaxed line-clamp-4">
          {article.description}
        </CardDescription>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <Button
            asChild
            variant="ghost"
            className="w-full group/btn justify-between p-0 h-auto hover:bg-transparent"
          >
            <Link to={`/articles/${article.id}`} className="flex justify-between w-full">
              <span className="text-sm font-medium group-hover/btn:text-primary transition-colors">
                Ler artigo
              </span>
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
