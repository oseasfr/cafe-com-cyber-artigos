import { loadArticles } from "@/lib/articleLoader";

// Procura os arquivos .md em qualquer lugar do projeto
// até encontrar a pasta content/articles
const files = import.meta.glob("/**/content/articles/*.md", {
  eager: true,
  as: "raw"
});

const markdownContents = Object.values(files) as string[];

export const articles = loadArticles(markdownContents);
