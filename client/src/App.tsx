import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import ChatInterface from "@/pages/ChatInterface";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ChatInterface} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Router />
    </TooltipProvider>
  );
}

export default App;
