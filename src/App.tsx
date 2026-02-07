import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArticlePage from "./pages/articles/ArticlePage";
import ArticlesFiles from "./pages/articles/ArticlesFiles";
import NotFound from "./pages/NotFound";

// Configuração simplificada do QueryClient
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/">      <Routes>
        {/* Rota Principal */}
        <Route path="/" element={<Index />} />
        
        {/* Listagem de Artigos */}
        <Route path="/articles" element={<ArticlesFiles />} />
        
        {/* Página do Artigo */}
        <Route path="/articles/:id" element={<ArticlePage />} />
        
        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

