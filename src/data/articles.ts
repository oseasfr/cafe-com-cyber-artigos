import { loadArticles } from "@/lib/articleLoader";

// Caminho correto relativo ao arquivo atual (src/data/articles.ts)
const files = import.meta.glob("../content/articles/*.md", {
  eager: true,
  as: "raw"
});

const markdownContents = Object.values(files) as string[];

export const articles = loadArticles(markdownContents);
