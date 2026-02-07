import { loadArticles } from "../lib/articleLoader";

// Importa os arquivos .md como texto bruto usando ?raw
import artigo1 from "../content/articles/quando-foi-a-ultima-vez-que-voce-alterou-sua-senha.md?raw";
// import artigo2 from "../content/articles/external-secrets-k8s-vault-hashicorp-ldap-postgres.md?raw";
// import artigo3 from "../content/articles/monitoramento-continuo-o-papel-estrategico-na-seguranca-da-informacao-corporativa.md?raw";

// Carrega todos os artigos usando o loader
export const articles = loadArticles([
  artigo1,
  // artigo2,
  // artigo3,
]);

// Exporta tipos para uso em outros arquivos
export type { Article, ArticleMetadata } from "../lib/articleLoader";
