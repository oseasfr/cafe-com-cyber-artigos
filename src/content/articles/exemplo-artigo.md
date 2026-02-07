---
id: "exemplo-artigo"
title: "Exemplo de Artigo"
description: "Este é um artigo de exemplo para demonstrar a estrutura de artigos."
author: "Seu Nome"
authorFirstName: "Seu"
authorLastName: "Nome"
authorBio: "Especialista em cibersegurança e tecnologia."
authorSocialLink: "https://linkedin.com/in/seu-perfil"
authorSocialType: "linkedin"
readTime: "5 minutos de leitura"
category: "Web Security"
icon: "Shield"
gradient: "from-primary/20 to-accent/20"
publishedAt: "2025-02-05T10:00:00"
tags: ["exemplo", "tutorial", "cibersegurança"]
featured: true
priority: 1
---

Este é um **artigo de exemplo** para demonstrar como a estrutura funciona.

## O que você precisa saber

1. Crie arquivos `.md` em `src/content/articles/`
2. Use o frontmatter YAML no início (entre `---`)
3. O conteúdo em Markdown é renderizado automaticamente

### Campos obrigatórios do frontmatter

- `id` - identificador único (usado na URL)
- `title` - título do artigo
- `description` - resumo
- `author` - nome completo
- `readTime` - tempo estimado de leitura
- `category` - categoria (ex: Web Security, Malware)
- `icon` - nome do ícone (Shield, Key, Bug, etc.)
- `gradient` - classes Tailwind para o gradiente (ex: from-primary/20 to-accent/20)

### Campos opcionais

- `authorFirstName`, `authorLastName`
- `authorAvatar` - caminho da imagem (ex: /images/authors/avatar.jpg)
- `authorBio` - biografia
- `authorSocialLink`, `authorSocialType` (linkedin ou github)
- `imageUrl` - imagem de capa
- `publishedAt` - data ISO
- `tags` - array de tags
- `featured` - boolean
- `priority
