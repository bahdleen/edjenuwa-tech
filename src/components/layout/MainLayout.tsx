
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground",
      "flex flex-col dark",
      className
    )}>
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-bold text-xl">
              <span className="text-green-500">{">"}</span> Portfolio
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm transition-colors hover:text-primary",
                    isActive(item.path) 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin">Dashboard</Link>
                </Button>
              ) : (
                <Button size="sm" asChild>
                  <Link to="/auth">Login</Link>
                </Button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "py-2 transition-colors hover:text-primary",
                  isActive(item.path) 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <Button variant="outline" asChild>
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              </Button>
            )}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} | Cybersecurity • Networking • AI
              </p>
            </div>
            <div className="flex gap-6">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-primary"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-primary"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
