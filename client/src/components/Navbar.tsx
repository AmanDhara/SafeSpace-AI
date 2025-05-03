import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supportedLanguages } from "@/lib/languages";
import { Globe, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-blue-500 hover:text-blue-600">
            MindfulAI
          </Link>
          {user && (
            <nav className="ml-8 hidden md:flex">
              <Link 
                href="/" 
                className={`ml-4 text-sm font-medium ${
                  isActive("/") 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {t("home")}
              </Link>
              <Link 
                href="/chat" 
                className={`ml-4 text-sm font-medium ${
                  isActive("/chat") 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {t("chat")}
              </Link>
              <Link 
                href="/recommendations" 
                className={`ml-4 text-sm font-medium ${
                  isActive("/recommendations") 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {t("recommendations")}
              </Link>
              <Link 
                href="/therapists" 
                className={`ml-4 text-sm font-medium ${
                  isActive("/therapists") 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {t("therapists")}
              </Link>
              <Link 
                href="/help-contact" 
                className={`ml-4 text-sm font-medium ${
                  isActive("/help-contact") 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {t("helpContact")}
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {supportedLanguages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code} 
                  className={`cursor-pointer ${currentLanguage === lang.code ? "bg-blue-50 font-medium" : ""}`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <div className="flex items-center">
                    {currentLanguage === lang.code && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                    )}
                    <span>{lang.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="relative rounded-full w-9 h-9 p-0 overflow-hidden"
                >
                  <span className="w-full h-full flex items-center justify-center text-lg font-semibold uppercase bg-blue-100 text-blue-600">
                    {user.username?.charAt(0) || "U"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  <User className="mr-2 h-4 w-4" />
                  <span>{user.username}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("logOut")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth" className="inline-block">
              <Button size="sm">{t("signIn")}</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}