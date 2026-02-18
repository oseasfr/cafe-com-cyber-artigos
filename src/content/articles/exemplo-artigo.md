---
id: exemplo-artigo
title: "Como publicar artigos neste projeto — Guia do desenvolvedor"
description: Passo a passo oficial para criar, publicar e divulgar novos artigos na plataforma Café com Cyber Artigos.
author: "Doc Autor"
authorFirstName: "Doc"
authorLastName: "Autor"
authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face"
authorBio: "Mantenedor da documentação do projeto. Focado em cibersegurança e boas práticas para desenvolvedores."
authorSocialLink: "https://linkedin.com/in/exemplo"
authorSocialType: "linkedin"
readTime: "8 minutos de leitura"
category: "Web Security"
icon: "Shield"
gradient: "from-primary/20 to-accent/20"
publishedAt: "2025-02-17T10:00:00"
tags: [documentação, tutorial, artigos, deploy, frontmatter]
featured: true
priority: 1
---

Este é o **guia oficial** para quem vai publicar artigos neste projeto. Siga os passos abaixo para garantir que seus artigos apareçam corretamente na home e na listagem.

**Contexto:** este site é publicado no **GitHub Pages** via **GitHub Actions**. Ou seja, ao dar push no repositório (na branch configurada), o workflow faz o build e publica automaticamente; não é preciso fazer deploy manual da pasta `dist/`. Os novos artigos passam a aparecer no ar assim que o workflow terminar.

---

## 1. Onde ficam os artigos

Todos os artigos são arquivos **Markdown (`.md`)** na pasta:

```
src/content/articles/
```

Cada arquivo `.md` vira um artigo. Não é necessário registrar o artigo em nenhum outro arquivo: o carregamento é **automático**.

---

## 2. Estrutura de um artigo

Todo artigo deve ter:

1. **Frontmatter** — bloco YAML no topo, entre duas linhas `---`
2. **Corpo** — conteúdo em Markdown (títulos, parágrafos, listas, código, etc.)

Exemplo mínimo:

```markdown
---
id: meu-artigo
title: "Meu título"
description: "Breve descrição."
author: "Seu Nome"
readTime: "5 min de leitura"
category: "Web Security"
icon: "Shield"
gradient: "from-primary/20 to-accent/20"
---

Aqui vai o conteúdo em **Markdown**.
```

---

## 3. Campos obrigatórios do frontmatter

| Campo        | Exemplo                    | Uso |
|-------------|----------------------------|-----|
| `id`        | `meu-artigo`               | Identificador único; vira a URL: `/articles/meu-artigo` |
| `title`     | `"Título do artigo"`       | Título exibido na listagem e na página do artigo |
| `description` | `"Resumo em uma linha."`  | Descrição/SEO e cards |
| `author`    | `"Nome Completo"`          | Nome do autor |
| `readTime`  | `"5 minutos de leitura"`   | Tempo de leitura estimado |
| `category`  | `Web Security`              | Categoria (define ícone na listagem) |
| `icon`      | `Shield`                    | Nome do ícone Lucide (Shield, Lock, Key, Bug, etc.) |
| `gradient`  | `from-primary/20 to-accent/20` | Classes Tailwind do gradiente do card |

Sem esses campos, o artigo **não** será carregado (erro no build).

---

## 4. Campos opcionais (recomendados)

| Campo              | Exemplo                          | Uso |
|--------------------|-----------------------------------|-----|
| `authorFirstName` | `"João"`                          | Primeiro nome (exibido no header do artigo) |
| `authorLastName`  | `"Silva"`                         | Sobrenome |
| `authorAvatar`    | `https://...` ou `/images/...`   | URL da foto do autor (fictícia ou real) |
| `authorBio`       | `"Texto da bio."`                 | Biografia no rodapé do artigo |
| `authorSocialLink`| `https://linkedin.com/in/...`     | Link do perfil (LinkedIn ou GitHub) |
| `authorSocialType`| `linkedin` ou `github`            | Tipo do link social |
| `publishedAt`     | `2025-02-17T10:00:00`             | Data de publicação (ISO) — define ordem |
| `tags`            | `[tag1, tag2]`                    | Tags exibidas no artigo |
| `featured`        | `true`                            | Destacar na home (se houver seção de destaques) |
| `priority`        | `1`                               | Número maior = mais destaque na ordenação |

---

## 5. Passo a passo para publicar um novo artigo

### Passo 1 — Criar o arquivo

Crie um novo `.md` em `src/content/articles/`, por exemplo:

- `src/content/articles/meu-novo-post.md`

O `id` do frontmatter deve ser **único** e igual ao nome do arquivo (sem `.md`), para a URL ficar coerente: `/articles/meu-novo-post`.

### Passo 2 — Preencher o frontmatter

Copie o bloco abaixo e ajuste os valores. Não remova nenhum campo obrigatório.

```yaml
---
id: meu-novo-post
title: "Título que aparece na listagem e na página"
description: "Uma linha resumindo o artigo."
author: "Seu Nome"
authorFirstName: "Seu"
authorLastName: "Nome"
authorAvatar: "https://exemplo.com/sua-foto.jpg"
authorBio: "Sua bio curta."
authorSocialLink: "https://linkedin.com/in/seu-perfil"
authorSocialType: "linkedin"
readTime: "6 minutos de leitura"
category: "Web Security"
icon: "Shield"
gradient: "from-primary/20 to-accent/20"
publishedAt: "2025-02-17T14:00:00"
tags: [tag1, tag2, tag3]
featured: true
priority: 0
---
```

### Passo 3 — Escrever o conteúdo

Abra uma linha em branco após o último `---` e escreva o artigo em Markdown:

- Use `#`, `##`, `###` para títulos (evite aspas nos títulos; o sistema remove automaticamente).
- Use **negrito**, *itálico*, listas, blocos de código e links normalmente.

### Passo 4 — Testar em desenvolvimento

No terminal, na raiz do projeto:

```bash
npm install
npm run dev
```

Acesse `http://localhost:8080` (ou a porta indicada), vá em **Ver artigos** e confira se o novo artigo aparece e se a página do artigo abre corretamente em `/articles/meu-novo-post`.

### Passo 5 — Publicar no ar (GitHub Pages via GitHub Actions)

O projeto **publica no GitHub Pages via GitHub Actions**. Você não precisa fazer upload manual: basta dar **push** no repositório na branch configurada (ex.: `Principal`).

1. Faça commit do seu novo artigo (e de qualquer alteração).
2. Dê **push** para o GitHub (ex.: `git push origin Principal`).
3. O **GitHub Actions** executa o workflow (`.github/workflows/deploy.yml`): instala dependências, roda `npm run build` e envia o resultado para o **GitHub Pages**.
4. Quando o workflow terminar (verifique em **Actions** no repositório), o site estará atualizado em:

**https://oseasfr.github.io/cafe-com-cyber-artigos/**

Os artigos ficam em:

- **Home:** https://oseasfr.github.io/cafe-com-cyber-artigos/
- **Listagem:** https://oseasfr.github.io/cafe-com-cyber-artigos/articles
- **Artigo:** https://oseasfr.github.io/cafe-com-cyber-artigos/articles/meu-novo-post

---

## 6. Imagem do autor (avatar)

Para exibir uma foto ao lado do nome do autor:

- Use **`authorAvatar`** no frontmatter.
- Pode ser URL absoluta: `https://...` (ex.: Unsplash, LinkedIn, seu site).
- Ou caminho local: coloque a imagem em `public/images/authors/` e use por exemplo `/images/authors/meu-avatar.jpg`.

Se não informar `authorAvatar`, o sistema pode usar uma imagem padrão ou as iniciais do nome.

---

## 7. Resumo rápido

1. Crie um `.md` em `src/content/articles/`.
2. Preencha o frontmatter (obrigatórios + opcionais que quiser).
3. Escreva o conteúdo em Markdown.
4. Rode `npm run dev`, confira na listagem e na página do artigo.
5. Dê **push** no repositório: o **GitHub Actions** faz o build e publica no **GitHub Pages** automaticamente.

Nenhum outro arquivo precisa ser editado para **divulgar um novo artigo** — apenas o novo `.md` em `src/content/articles/`. A publicação no ar é feita pelo workflow ao dar push.

Para mais detalhes do projeto (estrutura, rotas, ícones, deploy via GitHub Actions), consulte o **README.md** na raiz do repositório.
