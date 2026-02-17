import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "./pages/NotFound";
import ArticlePage from "./pages/articles/ArticlePage";
import ArticlesFiles from "./pages/articles/ArticlesFiles";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme" attribute="class">
      <BrowserRouter basename="/cafe-com-cyber-artigos">
        <Routes>
          <Route path="/" element={<Navigate to="/articles" replace />} />
          <Route path="/index.html" element={<Navigate to="/articles" replace />} />
          <Route path="/articles" element={<ArticlesFiles />} />
          <Route path="/articles/:articleId" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}
