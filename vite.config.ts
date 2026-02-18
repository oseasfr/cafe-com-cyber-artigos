import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

function copyIndexTo404() {
  return {
    name: "copy-index-to-404",
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      const indexPath = path.join(outDir, "index.html");
      const notFoundPath = path.join(outDir, "404.html");
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
      }
    },
  };
}

export default defineConfig({
  base: "/cafe-com-cyber-artigos/",
  plugins: [react(), copyIndexTo404()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
  },
  server: {
    host: "::",
    port: 8080,
  },
});
