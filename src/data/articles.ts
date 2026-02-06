const modules = import.meta.glob("../content/articles/*.md", { eager: true });

export interface Article {
  id: string;
  title: string;
  description: string;
  content: any; // O componente do artigo
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  tags?: string[];
}

export const articles: Article[] = Object.entries(modules).map(([path, module]: any) => {
  const { frontmatter } = module;
  const fileNameId = path.split("/").pop()?.replace(".md", "") || "artigo";

  return {
    id: frontmatter?.id || fileNameId,
    title: frontmatter?.title || "Artigo sem título",
    description: frontmatter?.description || "Sem descrição.",
    author: frontmatter?.author || "Equipe",
    publishedAt: frontmatter?.publishedAt || new Date().toISOString(),
    readTime: frontmatter?.readTime || "5 min",
    category: frontmatter?.category || "Cibersegurança",
    imageUrl: frontmatter?.imageUrl,
    tags: frontmatter?.tags || [],
    content: module.default, // O conteúdo Markdown já processado
  };
});

export const sortedArticles = [...articles].sort((a, b) => 
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);
