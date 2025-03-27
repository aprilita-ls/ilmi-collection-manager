
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TambahKoleksi from "./pages/TambahKoleksi";
import LihatKoleksi from "./pages/LihatKoleksi";
import Feedbacks from "./pages/Feedbacks";
import AllFeedbacks from "./pages/AllFeedbacks";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tambah-koleksi" element={<TambahKoleksi />} />
              <Route path="/lihat-koleksi" element={<LihatKoleksi />} />
              <Route path="/feedbacks" element={<Feedbacks />} />
              <Route path="/all-feedbacks" element={<AllFeedbacks />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
