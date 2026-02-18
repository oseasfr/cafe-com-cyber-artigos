# Café com Cyber — Artigos

Projeto focado em **artigos** do [Café com Cyber](https://github.com/oseasfr/cafe-com-cyber). Site estático (React + Vite) com listagem e páginas de artigo a partir de arquivos Markdown.

**Publicação:** o site é publicado no **GitHub Pages** via **GitHub Actions**. Cada push na branch configurada dispara o workflow de build e deploy; não é necessário fazer upload manual da pasta `dist/`.

- **Home:** https://oseasfr.github.io/cafe-com-cyber-artigos/
- **Listagem de artigos:** https://oseasfr.github.io/cafe-com-cyber-artigos/articles
- **Documentação em artigo:** o artigo [Como publicar artigos neste projeto](https://oseasfr.github.io/cafe-com-cyber-artigos/articles/exemplo-artigo) é o guia oficial passo a passo para desenvolvedores.

---

## Início rápido

### 1. Instalar dependências

```bash
cd cafe-com-cyber-artigos
npm install
```

### 2. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse a URL indicada no terminal (ex.: `http://localhost:8080`). A home tem um botão **Ver artigos** que leva à listagem.

### 3. Build para produção

```bash
npm run build
```

A pasta `dist/` contém os arquivos estáticos para deploy.

---

## Como publicar um novo artigo

1. **Crie um arquivo `.md`** em `src/content/articles/` (ex.: `meu-artigo.md`).
2. **Preencha o frontmatter** no topo (entre `---`) com os campos obrigatórios e opcionais.
3. **Escreva o conteúdo** em Markdown abaixo do frontmatter.
4. Nenhum outro arquivo precisa ser alterado — o carregamento é **automático**.

### Frontmatter obrigatório

| Campo | Exemplo | Descrição |
|-------|---------|-----------|
| `id` | `meu-artigo` | Identificador único (vira a URL: `/articles/meu-artigo`) |
| `title` | `"Título"` | Título do artigo |
| `description` | `"Resumo."` | Descrição/resumo |
| `author` | `"Nome"` | Nome do autor |
| `readTime` | `"5 min de leitura"` | Tempo estimado de leitura |
| `category` | `Web Security` | Categoria (influencia ícone) |
| `icon` | `Shield` | Nome do ícone Lucide |
| `gradient` | `from-primary/20 to-accent/20` | Classes Tailwind do gradiente do card |

### Frontmatter opcional

- `authorFirstName`, `authorLastName` — Nome e sobrenome para exibição
- `authorAvatar` — URL da foto do autor (ex.: `https://...` ou `/images/authors/avatar.jpg`)
- `authorBio` — Biografia
- `authorSocialLink`, `authorSocialType` — Link do perfil (`linkedin` ou `github`)
- `publishedAt` — Data em ISO (ex.: `2025-02-17T10:00:00`) — define ordem
- `tags` — Array de tags, ex.: `[tag1, tag2]`
- `featured` — `true` para destacar
- `priority` — Número (maior = mais destaque)

### Exemplo mínimo

```markdown
---
id: meu-primeiro-artigo
title: "Meu primeiro artigo"
description: "Um resumo em uma linha."
author: "Seu Nome"
readTime: "5 minutos de leitura"
category: "Web Security"
icon: "Shield"
gradient: "from-primary/20 to-accent/20"
publishedAt: "2025-02-17T10:00:00"
tags: [exemplo, tutorial]
---

Conteúdo em **Markdown** aqui.
```

Para o **passo a passo completo** (incluindo avatar do autor, teste local e deploy), leia o artigo oficial no próprio site: [Como publicar artigos neste projeto](https://oseasfr.github.io/cafe-com-cyber-artigos/articles/exemplo-artigo).

---

## Deploy: GitHub Pages via GitHub Actions

O projeto **publica no GitHub Pages usando GitHub Actions**. Não há deploy manual: ao dar **push** na branch configurada, o workflow faz o build e publica o site.

1. **Configuração no repositório:** **Settings → Pages → Build and deployment → Source** = **GitHub Actions**.
2. **Workflow:** o arquivo `.github/workflows/deploy.yml` roda em cada push na branch definida (ex.: `Principal`). Ele instala dependências, roda `npm run build` e envia a pasta `dist/` para o GitHub Pages.
3. **Build:** usa `vite build` com `base: "/cafe-com-cyber-artigos/"` e gera `404.html` a partir do `index.html` para o SPA funcionar em qualquer rota.
4. **URL do site:** **https://oseasfr.github.io/cafe-com-cyber-artigos/**

Resumo: **push → GitHub Actions faz o build → GitHub Pages publica**. Não é necessário fazer upload manual da pasta `dist/`.

---

## Estrutura do projeto

```
cafe-com-cyber-artigos/
├── .github/workflows/
│   └── deploy.yml          # Build e deploy no GitHub Pages
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Header, Footer, HeroSection, ArticleCard, etc.
│   │   └── ui/            # Componentes shadcn/ui
│   ├── content/
│   │   └── articles/      # Artigos .md (um arquivo = um artigo)
│   ├── data/
│   │   └── articles.ts    # Carrega todos os .md de content/articles
│   ├── lib/
│   │   ├── articleLoader.ts
│   │   ├── articleIcons.tsx
│   │   └── dateFormatter.ts
│   ├── pages/
│   │   ├── Index.tsx      # Home (hero + botão Ver artigos)
│   │   ├── NotFound.tsx   # 404
│   │   └── articles/
│   │       ├── ArticlePage.tsx   # Página de um artigo
│   │       └── ArticlesFiles.tsx  # Listagem de artigos
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Home (hero + botão para artigos) |
| `/articles` | Lista de todos os artigos |
| `/articles/:id` | Artigo individual (ex.: `/articles/exemplo-artigo`) |

---

## Ícones (categorias e frontmatter)

O campo `icon` do frontmatter usa nomes do **Lucide React**. Exemplos: `Shield`, `Lock`, `Key`, `Bug`, `Network`, `Cloud`, `Search`, `Terminal`, `Eye`.  
Para incluir novos ícones ou mapear categorias, edite `src/lib/articleIcons.tsx`.

---

## Documentação oficial

- **Neste repositório:** este README.
- **No site:** artigo [Como publicar artigos neste projeto](https://oseasfr.github.io/cafe-com-cyber-artigos/articles/exemplo-artigo) — guia passo a passo para quem vai divulgar novos artigos.

---

## Licença

Estrutura extraída do Café com Cyber. Use conforme a licença do projeto original.
