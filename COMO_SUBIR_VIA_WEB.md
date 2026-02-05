# Como subir o projeto no GitHub via Web (sem CLI)

## Passo 1 — Criar o repositório

1. Acesse [github.com/new](https://github.com/new)
2. Em **Repository name**, use: `cafe-com-cyber-artigos` (ou outro nome)
3. Selecione **Public**
4. **Não** marque "Add a README file"
5. Clique em **Create repository**

---

## Passo 2 — Upload dos arquivos

1. Na página do repositório recém-criado, clique em **uploading an existing file**  
   (ou em **Add file** → **Upload files**)
2. Arraste para a tela **toda a pasta** do projeto (incluindo subpastas), **menos**:
   - `node_modules` (se existir — não inclua)
   - `dist` (se existir — não inclua)
3. Na caixa de texto **Commit message**, escreva: `Initial commit`
4. Clique em **Commit changes**

---

## Próximos passos

Depois do upload, o código já estará no GitHub.

Para publicar na Vercel:

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta do GitHub
3. **Add New** → **Project**
4. Escolha o repositório `cafe-com-cyber-artigos`
5. Clique em **Deploy**
