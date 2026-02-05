import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArticlePage from "./pages/articles/ArticlePage";
import ArticlesFiles from "./pages/articles/ArticlesFiles";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme" attribute="class">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/articles" element={<ArticlesFiles />} />
          <Route path="/articles/:articleId" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}
