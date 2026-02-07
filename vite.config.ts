import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import MarkdownPreview from "vite-plugin-markdown-preview";

export default defineConfig({
  plugins: [
    react(),
    MarkdownPreview()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
