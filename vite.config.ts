import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { plugin as markdown } from "vite-plugin-markdown"; // Adicione isso

export default defineConfig({
  base: "/cafe-com-cyber-artigos/",
  plugins: [
    react(),
    markdown({ mode: ["html", "react", "meta"] }) // Ativa o suporte a Markdown
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
