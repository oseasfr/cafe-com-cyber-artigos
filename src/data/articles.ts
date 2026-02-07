import { loadArticles } from "@/lib/articleLoader";

const files = import.meta.glob("/src/content/articles/*.md", {
  eager: true,
  as: "raw"
});

const markdownContents = Object.values(files) as string[];

export const articles = loadArticles(markdownContents);
