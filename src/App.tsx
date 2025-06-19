import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DesktopView from "./pages/DesktopView";
import FinderWindowView from "./pages/FinderWindowView";
import ApplicationWindowView from "./pages/ApplicationWindowView";
import SystemSettingsView from "./pages/SystemSettingsView";
import SpotlightSearchViewPage from "./pages/SpotlightSearchViewPage"; // Updated name
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DesktopView />} />
          <Route path="/finder" element={<FinderWindowView />} />
          <Route path="/application" element={<ApplicationWindowView />} />
          <Route path="/system-settings" element={<SystemSettingsView />} />
          <Route path="/spotlight" element={<SpotlightSearchViewPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;