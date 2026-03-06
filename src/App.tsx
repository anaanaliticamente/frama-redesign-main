import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RetiradaUralitaTejados from "./pages/servicios/RetiradaUralitaTejados";
import RetiradaChimeneasAmianto from "./pages/servicios/RetiradaChimeneasAmianto";
import RetiradaBajantesTuberias from "./pages/servicios/RetiradaBajantesTuberias";
import LocalidadPage from "./pages/localidades/LocalidadPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NuestrosTrabajos from "./pages/NuestrosTrabajos";
import Contacto from "./pages/Contacto";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicios/retirada-uralita-tejados" element={<RetiradaUralitaTejados />} />
          <Route path="/servicios/retirada-chimeneas-amianto" element={<RetiradaChimeneasAmianto />} />
          <Route path="/servicios/retirada-bajantes-tuberias" element={<RetiradaBajantesTuberias />} />
          <Route path="/localidades/:slug" element={<LocalidadPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/nuestros-trabajos" element={<NuestrosTrabajos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
