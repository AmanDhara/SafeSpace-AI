import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
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
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
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
                Home
              </Link>
              <Link 
                href="/chat" 
                className={`ml-4 text-sm font-medium ${
                  isActive("/chat") 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Chat
              </Link>
              <Link 
                href="/recommendations" 
                className={`ml-4 text-sm font-medium ${
                  isActive("/recommendations") 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Recommendations
              </Link>
              <Link 
                href="/therapists" 
                className={`ml-4 text-sm font-medium ${
                  isActive("/therapists") 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Therapists
              </Link>
              <Link 
                href="/help-contact" 
                className={`ml-4 text-sm font-medium ${
                  isActive("/help-contact") 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Help & Contact
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
                <DropdownMenuItem key={lang.code} className="cursor-pointer">
                  {lang.name}
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
                  <span>Signed in as {user.username}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth" className="inline-block">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}