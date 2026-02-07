import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [
    react()
  ],

  // Permite que o Vite inclua arquivos .md no bundle
  assetsInclude: ["**/*.md"],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
