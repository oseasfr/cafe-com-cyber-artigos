import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Importação das páginas
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UnderConstruction from "./pages/UnderConstruction";
import ArticlePage from "./pages/articles/ArticlePage";
import ArticlesArchive from "./pages/articles/ArticlesFiles";
import CommunityPage from "./pages/CommunityPage";
import AboutPage from "./pages/AboutPage";
import UsefulLinks from "./pages/links-uteis";
import GeradorSenhas from "./pages/gerador-de-senhas";
import CursosPage from "./pages/CursosPage";
import ScrollToTopButton from "./components/ScrollToTopButton";

// *** Variável de controle: Altere para 'false' para desativar a página de manutenção ***
const MAINTENANCE_MODE = false;

// Componente para rolar a página para o topo em cada mudança de rota
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Se não há hash, rola para o topo
    if (!hash) {
      // Função robusta para scroll no mobile e desktop
      const scrollToTop = () => {
        // Método 1: window.scrollTo (funciona na maioria dos casos)
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' as ScrollBehavior
        });
        
        // Método 2: Fallback direto para elementos (importante no mobile)
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        if (document.body) {
          document.body.scrollTop = 0;
        }
        
        // Método 3: Para iOS Safari e outros navegadores mobile
        const scrollableElements = [
          document.documentElement,
          document.body,
          window
        ];
        
        scrollableElements.forEach(element => {
          if (element && typeof (element as any).scrollTo === 'function') {
            try {
              (element as any).scrollTo({ top: 0, left: 0, behavior: 'instant' });
            } catch (e) {
              // Ignora erros
            }
          }
        });
      };

      // Rola imediatamente (0ms)
      scrollToTop();
      
      // Aguarda a renderização e rola novamente (50ms)
      const timer1 = setTimeout(scrollToTop, 50);
      
      // Rola novamente após um tempo maior (300ms) para garantir no mobile
      const timer2 = setTimeout(scrollToTop, 300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [pathname, search, hash]);

  return null;
};

const queryClient = new QueryClient();

const App = () => {
  // CONFIGURAÇÃO DE BASE PARA GITHUB PAGES
  const baseName = "/cafe-com-cyber-artigos";

  // Se o modo de manutenção estiver ativado, renderiza apenas a página de manutenção
  if (MAINTENANCE_MODE) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={baseName}>
            <Routes>
              <Route path="*" element={<UnderConstruction />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Se o modo de manutenção estiver desativado, renderiza as rotas normais
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={baseName}>
          <ScrollToTop /> {/* Adicionado para forçar a rolagem para o topo */}
          <ScrollToTopButton /> {/* Botão flutuante para voltar ao topo */}
          <Routes>
            {/* Rota principal que carrega a página inicial */}
            <Route path="/" element={<Index />} />
            
            {/* Rota para os artigos, com um ID dinâmico */}
            <Route path="/articles/:articleId" element={<ArticlePage />} />

            {/* Rota para a página de arquivo de artigos */}
            <Route path="/articles" element={<ArticlesArchive />} />

            {/* Rota para a página da comunidade */}
            <Route path="/community" element={<CommunityPage />} />

            {/* Rota para a página Sobre Nós */}
            <Route path="/sobre-nos" element={<AboutPage />} />

            {/* Rota para a página de Links Úteis */}
            <Route path="/links-uteis" element={<UsefulLinks />} />

            {/* Rota para a página de Gerador de Senhas */}
            <Route path="/gerador-de-senhas" element={<GeradorSenhas />} />

            {/* Rota para a página de Cursos */}
            <Route path="/cursos" element={<CursosPage />} />

            {/* A página "em-construcao" pode ser acessada por esta rota */}
            <Route path="/em-construcao" element={<UnderConstruction />} />
            
            {/* Página 404 - SEMPRE deve ser a última rota */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
