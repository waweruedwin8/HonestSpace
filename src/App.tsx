import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Browse from "./pages/Browse";
import HowItWorks from "./pages/HowItWorks";
import BecomeScout from "./pages/BecomeScout";
import About from "./pages/About";
import ListProperty from "./pages/ListProperty";
import PropertyDetails from "./pages/PropertyDetails";
import LovedProperties from "./pages/LovedProperties";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

import { AdminDashboard } from "./pages/AdminDashboard";
import { ScoutDashboard } from "./pages/ScoutDashboard";
import { LandlordDashboard } from "./pages/LandlordDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/become-scout" element={<BecomeScout />} />
          <Route path="/about" element={<About />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/loved-properties" element={<LovedProperties />} />
          <Route path="/auth" element={<Auth />} />

          {/* Dashboards */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/scout" element={<ScoutDashboard />} />
          <Route path="/landlord" element={<LandlordDashboard />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
