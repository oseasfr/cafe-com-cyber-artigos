import { loadArticles } from "../lib/articleLoader";

// Carregamento automático: todos os .md em content/articles são incluídos
const modules = import.meta.glob("../content/articles/*.md", {
  as: "raw",
  eager: true,
});

const markdownContents = Object.values(modules) as string[];
export const articles = loadArticles(markdownContents);

export type { Article, ArticleMetadata } from "../lib/articleLoader";
