export interface ArticleMetadata {
  id: string;
  title: string;
  description: string;
  author: string;
  authorFirstName?: string;
  authorLastName?: string;
  authorAvatar?: string;
  authorBio?: string;
  authorSocialLink?: string;
  authorSocialType?: "linkedin" | "github";
  readTime: string;
  category: string;
  icon: string;
  gradient: string;
  imageUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
  featured?: boolean;
  priority?: number;
}

export interface Article extends ArticleMetadata {
  content: string;
}

export function parseFrontmatter(markdown: string): {
  metadata: Partial<ArticleMetadata>;
  content: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    throw new Error("Invalid markdown format: missing frontmatter (---)");
  }

  const frontmatterText = match[1];
  const content = match[2].trim();
  const metadata: Partial<ArticleMetadata> = {};

  frontmatterText.split("\n").forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) return;

    const colonIndex = trimmedLine.indexOf(":");
    if (colonIndex === -1) return;

    const key = trimmedLine.substring(0, colonIndex).trim();
    let value = trimmedLine.substring(colonIndex + 1).trim();

    value = value.replace(/^["']|["']$/g, "");

    if (key === "tags") {
      metadata.tags = value
        .replace(/[\[\]]/g, "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (key === "readTime") {
      metadata.readTime = value;
    } else if (key === "featured") {
      metadata.featured = value.toLowerCase() === "true";
    } else if (key === "priority") {
      metadata.priority = parseInt(value, 10) || 0;
    } else {
      (metadata as Record<string, unknown>)[key] = value;
    }
  });

  return { metadata: metadata as Partial<ArticleMetadata>, content };
}

export function loadArticle(markdownContent: string): Article {
  const { metadata, content } = parseFrontmatter(markdownContent);

  const requiredFields: (keyof ArticleMetadata)[] = [
    "id",
    "title",
    "description",
    "author",
    "readTime",
    "category",
    "icon",
    "gradient",
  ];

  for (const field of requiredFields) {
    if (!metadata[field]) {
      throw new Error(`Missing required field in frontmatter: ${field}`);
    }
  }

  return {
    ...(metadata as ArticleMetadata),
    content,
  };
}

export function loadArticles(markdownContents: string[]): Article[] {
  return markdownContents
    .map((content) => {
      try {
        return loadArticle(content);
      } catch (error) {
        console.error("Error loading article:", error);
        return null;
      }
    })
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      const featuredA = a.featured === true ? 1 : 0;
      const featuredB = b.featured === true ? 1 : 0;
      if (featuredB !== featuredA) return featuredB - featuredA;

      const priorityA = a.priority ?? 0;
      const priorityB = b.priority ?? 0;
      if (priorityB !== priorityA) return priorityB - priorityA;

      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });
}
