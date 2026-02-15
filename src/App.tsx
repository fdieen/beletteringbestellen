import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/hooks/useAuth";
import { testSupabaseConnection } from "@/lib/testSupabase";
import Index from "./pages/Index";
import Checkout from "./pages/Checkout";
import FAQPage from "./pages/FAQPage";
import Contact from "./pages/Contact";
import Bedankt from "./pages/Bedankt";
import BetalingSucces from "./pages/BetalingSucces";
import BetalingMislukt from "./pages/BetalingMislukt";
import Auth from "./pages/Auth";
import MijnAccount from "./pages/MijnAccount";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Test Supabase connectie bij opstarten (alleen in development)
  useEffect(() => {
    if (import.meta.env.DEV) {
      testSupabaseConnection().then((result) => {
        if (result.success) {
          console.log('🎉 Supabase test geslaagd!');
        } else {
          console.error('💥 Supabase test mislukt:', result.error);
        }
      });
    }
  }, []);

  return (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/bedankt" element={<Bedankt />} />
              <Route path="/betaling-succes" element={<BetalingSucces />} />
              <Route path="/betaling-mislukt" element={<BetalingMislukt />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/mijn-account" element={<MijnAccount />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
