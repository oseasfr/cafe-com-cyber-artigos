# Café com Cyber — Estrutura de Artigos

Estrutura standalone extraída do projeto [Café com Cyber](https://github.com/oseasfr/cafe-com-cyber), focada **apenas em artigos**. Pode ser usada como blog ou base para um site de conteúdo técnico.

---

## Passo a Passo de Uso

### 1. Instalar dependências

```bash
cd cafe-com-cyber-artigos
npm install
```

### 2. Adicionar um artigo

Crie um arquivo `.md` em `src/content/articles/` com o frontmatter obrigatório:

**Exemplo:** `src/content/articles/meu-primeiro-artigo.md`

```markdown
---
id: meu-primeiro-artigo
title: "Título do Artigo"
description: "Breve descrição do artigo."
author: "Seu Nome"
readTime: "5 minutos de leitura"
category: "Web Security"
icon: "Shield"
gradient: "from-primary/20 to-accent/20"
publishedAt: "2025-02-05T10:00:00"
tags: [tag1, tag2]
---

Conteúdo em **Markdown** aqui.
```

**Campos obrigatórios:** `id`, `title`, `description`, `author`, `readTime`, `category`, `icon`, `gradient`

**Campos opcionais:** `authorFirstName`, `authorLastName`, `authorAvatar`, `authorBio`, `authorSocialLink`, `authorSocialType`, `imageUrl`, `publishedAt`, `updatedAt`, `tags`, `featured`, `priority`

O carregamento é **automático** — não é necessário editar nenhum outro arquivo.

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:8080`

### 4. Build para produção

```bash
npm run build
```

A pasta `dist/` contém os arquivos estáticos prontos para deploy.

### 5. Deploy

Faça deploy da pasta `dist/` em Vercel, Netlify, Cloudflare Pages, etc.

Para **SPA (React Router)**, configure redirecionamento de rotas:
- **Vercel/Netlify:** crie `public/_redirects` com:
  ```
  /*    /index.html   200
  ```

---

## Estrutura do Projeto

```
cafe-com-cyber-artigos/
├── public/                 # Arquivos estáticos (adicione favicon.ico)
├── src/
│   ├── components/         # Componentes React
│   │   ├── ui/             # shadcn/ui (button, card, badge, avatar)
│   │   ├── ArticleCard.tsx
│   │   ├── ArticlesSection.tsx
│   │   ├── AuthorHeader.tsx
│   │   ├── AuthorBioFooter.tsx
│   │   ├── ShareButtons.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── content/
│   │   └── articles/       # Seus artigos .md
│   ├── data/
│   │   └── articles.ts     # Carrega artigos automaticamente
│   ├── lib/
│   │   ├── articleLoader.ts
│   │   ├── articleIcons.tsx
│   │   └── dateFormatter.ts
│   ├── pages/
│   │   ├── Index.tsx       # Home
│   │   ├── NotFound.tsx    # 404
│   │   └── articles/
│   │       ├── ArticlePage.tsx    # Artigo individual
│   │       └── ArticlesFiles.tsx  # Lista todos
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com artigos em destaque |
| `/articles` | Lista todos os artigos |
| `/articles/:id` | Artigo individual (ex: `/articles/exemplo-artigo`) |

---

## Ícones Disponíveis (Lucide)

O `articleIcons.tsx` mapeia categorias e nomes para ícones Lucide:

- **Categorias:** Web Security, Architecture, Intelligence, Network Security, Cryptography, Malware, Cloud Security, Forensics, etc.
- **Nomes:** Shield, Lock, Eye, Key, Bug, Network, Cloud, Search, Terminal

Edite `src/lib/articleIcons.tsx` para adicionar novos ícones.

---

## O que foi removido (em relação ao projeto original)

- Seção de comentários (dependia de API)
- Estatísticas de visualizações/comentários no ShareButtons
- Font Awesome (substituído por Lucide React)
- Páginas: About, Community, Cursos, Gerador de Senhas, Links Úteis
- Modo de manutenção

---

## Sugestões de Melhorias

1. **Favicon:** Adicione `favicon.ico` em `public/`
2. **Imagens:** Coloque imagens em `public/images/` e use caminhos como `/images/artigos/foto.jpg` no frontmatter
3. **SEO:** O ArticlePage já atualiza meta tags (og:title, og:description, etc.)
4. **Comentários:** Para adicionar comentários, integre Disqus, Giscus ou outro serviço externo

---

## Licença

Estrutura extraída do Café com Cyber. Use conforme a licença do projeto original.
