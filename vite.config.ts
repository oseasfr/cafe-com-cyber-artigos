import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { plugin as markdown, Mode } from "vite-plugin-markdown";

export default defineConfig({
  base: "/cafe-com-cyber-artigos/",
  plugins: [
    react(),
    markdown({ mode: [Mode.REACT, Mode.HTML] })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
