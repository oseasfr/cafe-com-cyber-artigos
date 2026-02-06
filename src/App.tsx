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

const MAINTENANCE_MODE = false;

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      };
      scrollToTop();
      const timer1 = setTimeout(scrollToTop, 50);
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
  // AJUSTE: Adicionado basename em ambos os retornos (normal e manutenção)
  const repoBasename = "/cafe-com-cyber-artigos";

  if (MAINTENANCE_MODE) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={repoBasename}>
            <Routes>
              <Route path="*" element={<UnderConstruction />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={repoBasename}>
          <ScrollToTop />
          <ScrollToTopButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/articles/:articleId" element={<ArticlePage />} />
            <Route path="/articles" element={<ArticlesArchive />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/sobre-nos" element={<AboutPage />} />
            <Route path="/links-uteis" element={<UsefulLinks />} />
            <Route path="/gerador-de-senhas" element={<GeradorSenhas />} />
            <Route path="/cursos" element={<CursosPage />} />
            <Route path="/em-construcao" element={<UnderConstruction />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
