import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import markdown from "vite-plugin-md";

export default defineConfig({
  base: "/cafe-com-cyber-artigos/",
  plugins: [
    react({
      include: [/\.tsx$/, /\.md$/], // Faz o React entender o Markdown como componente
    }),
    markdown(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
