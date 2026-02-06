// Este script varre a pasta de artigos e carrega tudo automaticamente
const modules = import.meta.glob("../content/articles/*.md", { eager: true });

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
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
}

export const articles: Article[] = Object.entries(modules).map(([path, module]: any) => {
  const { metadata } = module;
  // O conteúdo do markdown geralmente vem no corpo do módulo ou via componente
  // Para simplificar, assumimos que seu loader extrai o texto
  return {
    ...metadata,
    id: metadata.id || path.split("/").pop()?.replace(".md", ""),
    content: module.default, // O conteúdo do Markdown
  };
});
