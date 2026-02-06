import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArticlePage from "./pages/articles/ArticlePage";
import ArticlesFiles from "./pages/articles/ArticlesFiles";
import NotFound from "./pages/NotFound";

// Configuração do cliente para o React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter basename="/cafe-com-cyber-artigos">
        <Routes>
          {/* Rota Principal: Home */}
          <Route path="/" element={<Index />} />
          
          {/* Rota para Listagem de Artigos */}
          <Route path="/articles" element={<ArticlesFiles />} />
          
          {/* Rota para Artigo Individual */}
          <Route path="/articles/:id" element={<ArticlePage />} />
          
          {/* Rota para páginas não encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
