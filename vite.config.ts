import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import markdown from "vite-plugin-md";

export default defineConfig({
  // Define a base para o GitHub Pages
  base: "/cafe-com-cyber-artigos/",
  plugins: [
    // 1. O plugin de Markdown vem primeiro para transformar .md em componente React
    markdown({
      wrapperClasses: "prose prose-lg max-w-none dark:prose-invert",
    }),
    // 2. O plugin do React deve aceitar arquivos .md como se fossem componentes
    react({
      include: [/\.tsx$/, /\.md$/],
    }),
  ],
  resolve: {
    alias: {
      // Configura o atalho @ para a pasta src
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Isso evita que o Vite tente analisar o MD como JS puro antes da transformação
  optimizeDeps: {
    include: ["react-router-dom"],
  }
});
