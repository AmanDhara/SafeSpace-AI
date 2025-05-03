import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import ChatInterface from "@/pages/ChatInterface";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import { LanguageProvider } from "./hooks/use-language";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/Navbar";
import Therapists from "@/pages/therapists";
import Recommendations from "@/pages/recommendations";
import HelpContact from "@/pages/help-contact";

// Lazy load components
import { lazy, Suspense } from 'react';
const TopicsPage = lazy(() => import('./pages/topics'));
const TopicDetailsPage = lazy(() => import('./pages/topic-details'));

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="p-10 flex justify-center">
    <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/chat" component={ChatInterface} />
      <ProtectedRoute path="/therapists" component={Therapists} />
      <ProtectedRoute path="/recommendations" component={Recommendations} />
      <ProtectedRoute path="/help-contact" component={HelpContact} />
      <ProtectedRoute path="/topics" component={() => (
        <Suspense fallback={<LoadingSpinner />}>
          <TopicsPage />
        </Suspense>
      )} />
      <ProtectedRoute path="/topics/:topicId" component={() => (
        <Suspense fallback={<LoadingSpinner />}>
          <TopicDetailsPage />
        </Suspense>
      )} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col bg-neutral-50/50">
              <Navbar />
              <main className="flex-1 pt-1">
                <Router />
              </main>
            </div>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
