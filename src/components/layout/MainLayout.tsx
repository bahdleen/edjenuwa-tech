
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Menu, X, Lock, Shield, Database, Network, Terminal } from "lucide-react";

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
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className={cn(
      "min-h-screen bg-cyber-dark text-foreground",
      "flex flex-col",
      className
    )}>
      {/* Header */}
      <header className="border-b border-cyber/30 sticky top-0 z-10 bg-cyber-dark/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-mono text-xl flex items-center gap-2">
              <Shield className="text-cyber" size={20} />
              <span className="text-cyber font-bold tracking-wider">EDJENUWA.TECH</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm transition-colors hover:text-cyber font-mono tracking-wide uppercase",
                    isActive(item.path) 
                      ? "text-foreground border-b border-cyber" 
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <Button variant="outline" size="sm" asChild className="border-cyber text-cyber hover:bg-cyber/10 hover:text-cyber">
                  <Link to="/admin">Dashboard</Link>
                </Button>
              ) : (
                <Button size="sm" asChild className="bg-cyber text-cyber-dark hover:bg-cyber/90">
                  <Link to="/auth"><Lock size={16} className="mr-1" /> Login</Link>
                </Button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-cyber"
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
        <div className="md:hidden bg-cyber-dark border-b border-cyber/30">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "py-2 transition-colors hover:text-cyber font-mono",
                  isActive(item.path) 
                    ? "text-cyber border-l-2 border-cyber pl-2" 
                    : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <Button variant="outline" asChild className="border-cyber text-cyber hover:bg-cyber/10">
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              </Button>
            ) : (
              <Button asChild className="bg-cyber text-cyber-dark hover:bg-cyber/90">
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}><Lock size={16} className="mr-1" /> Login</Link>
              </Button>
            )}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 relative">
        {/* Scanning line effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none scanner"></div>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-cyber/30 py-8 bg-cyber-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center gap-2">
              <Shield className="text-cyber" size={18} />
              <p className="text-sm text-muted-foreground font-mono">
                © {new Date().getFullYear()} | <span className="text-cyber">ANTHONY E. EDJENUWA</span>
              </p>
            </div>
            <div className="flex gap-6">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-cyber font-mono"
                aria-label="GitHub"
              >
                GITHUB
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-cyber font-mono"
                aria-label="LinkedIn"
              >
                LINKEDIN
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
