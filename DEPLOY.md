# Deploy via Web

## Vercel (recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login (GitHub, GitLab ou e-mail)
2. Clique em **Add New** → **Project**
3. Importe o repositório ou faça **upload** da pasta do projeto
4. O `vercel.json` já está configurado — basta clicar em **Deploy**
5. O site ficará disponível em `seu-projeto.vercel.app`

## Netlify

1. Acesse [netlify.com](https://netlify.com) e faça login
2. Arraste a pasta **`dist`** (após rodar `npm run build`) na área de deploy  
   **ou** conecte o repositório Git
3. O `netlify.toml` já define build e redirecionamentos
4. O site ficará disponível em `seu-projeto.netlify.app`

## Cloudflare Pages

1. Acesse [pages.cloudflare.com](https://pages.cloudflare.com) e faça login
2. **Create project** → **Connect to Git** ou **Direct Upload**
3. Configuração:
   - **Build command:** `npm run build`
   - **Build output:** `dist`
4. Deploy automático a cada push (se conectou via Git)
