import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  root: "src", // 👈 ESSENCIAL
  base: "/",   // 👈 ESSENCIAL
  build: {
    outDir: "../dist", // 👈 dist volta para a raiz
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
