import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { plugin as markdown } from "vite-plugin-markdown";

export default defineConfig({
  base: "/cafe-com-cyber-artigos/",
  plugins: [
    react(),
    markdown({ mode: ['react'] }) // Força o modo React para evitar erros de sintaxe JS
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
