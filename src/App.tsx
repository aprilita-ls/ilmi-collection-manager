
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TambahKoleksi from "./pages/TambahKoleksi";
import LihatKoleksi from "./pages/LihatKoleksi";
import EditKoleksi from "./pages/EditKoleksi";
import Feedbacks from "./pages/Feedbacks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tambah-koleksi" element={<TambahKoleksi />} />
          <Route path="/lihat-koleksi" element={<LihatKoleksi />} />
          <Route path="/edit-koleksi/:id" element={<EditKoleksi />} />
          <Route path="/feedbacks" element={<Feedbacks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
