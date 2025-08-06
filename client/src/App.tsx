import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/auth" component={Auth} />
          <Route path="/admin" component={AdminPanel} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
