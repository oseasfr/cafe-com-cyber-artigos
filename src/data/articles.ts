import { loadArticles } from "../lib/articleLoader";

// Importa automaticamente todos os arquivos .md do diretório de artigos
const articleFiles = import.meta.glob("../content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Extrai o conteúdo de cada arquivo importado
const markdownContents = Object.values(articleFiles) as string[];

// Carrega todos os artigos usando o loader
export const articles = loadArticles(markdownContents);

// Exporta tipos para uso em outros arquivos
export type { Article, ArticleMetadata } from "../lib/articleLoader";
