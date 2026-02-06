import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode } ) => {
  // Carrega as variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // --- CORREÇÃO PARA GITHUB PAGES ---
    // Define o caminho base como o nome do repositório para o build funcionar corretamente
    base: "/cafe-com-cyber-artigos/", 
    
    // --- OTIMIZAÇÃO DE PRODUÇÃO ---
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },

    // --- CONFIGURAÇÕES ORIGINAIS MANTIDAS ---
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    },
  };
});
