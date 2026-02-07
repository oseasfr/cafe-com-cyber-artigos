export default defineConfig({
  plugins: [
    react(),
    markdown({ mode: ['react'] })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
