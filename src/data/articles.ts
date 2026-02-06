// Importa todos os arquivos .md da pasta content/articles
const modules = import.meta.glob("../content/articles/*.md", { eager: true });

export interface Article {
  id: string;
  title: string;
  description: string;
  content: any; // Aqui virá o componente React gerado do Markdown
  author: string;
  authorFirstName?: string;
  authorLastName?: string;
  authorAvatar?: string;
  authorBio?: string;
  authorSocialLink?: string;
  publishedAt: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  tags?: string[];
  featured?: boolean;
}

export const articles: Article[] = Object.entries(modules).map(([path, module]: any) => {
  // O vite-plugin-markdown coloca o frontmatter em 'attributes' e o componente em 'React'
  const { attributes, React } = module;
  const fileNameId = path.split("/").pop()?.replace(".md", "") || "artigo";

  return {
    id: attributes?.id || fileNameId,
    title: attributes?.title || "Artigo sem título",
    description: attributes?.description || "Sem descrição disponível.",
    author: attributes?.author || "Equipe Café com Cyber",
    authorFirstName: attributes?.authorFirstName,
    authorLastName: attributes?.authorLastName,
    authorAvatar: attributes?.authorAvatar,
    authorBio: attributes?.authorBio,
    authorSocialLink: attributes?.authorSocialLink,
    publishedAt: attributes?.publishedAt || new Date().toISOString(),
    readTime: attributes?.readTime || "5 min",
    category: attributes?.category || "Geral",
    imageUrl: attributes?.imageUrl,
    tags: attributes?.tags || [],
    featured: attributes?.featured || false,
    content: React, // Componente pronto para ser usado como <Content />
  };
});

// Exporta os artigos ordenados por data
export const sortedArticles = [...articles].sort((a, b) => 
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);
