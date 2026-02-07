import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import MarkdownPreview from "vite-plugin-markdown-preview";

export default defineConfig({
  plugins: [
    react(),
    MarkdownPreview()
  ],

  // 🔥 ESSENCIAL: permite que o Vite inclua arquivos .md no bundle
  assetsInclude: ["**/*.md"],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
