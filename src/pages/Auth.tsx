
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, User, Shield, Key } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  
  // Get the page the user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/admin';

  // If user is already logged in, redirect to intended destination or admin
  useEffect(() => {
    if (user && !loading) {
      console.log("User is logged in, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setAuthLoading(true);
    
    try {
      console.log("Attempting login with:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Auth state change listener will handle the redirection
      toast.success("Login successful!");
      // Force immediate navigation to ensure the redirect happens
      navigate(from, { replace: true });
      
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error(error.message || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  // If we're still checking authentication status, show a loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyber-dark to-cyber-dark-blue flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-cyber mx-auto animate-pulse mb-4" />
          <p className="text-cyber animate-pulse text-lg">Checking authentication status...</p>
        </div>
      </div>
    );
  }

  // If user is already logged in, show a redirect message (the actual redirect is handled by useEffect)
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyber-dark to-cyber-dark-blue flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-cyber mx-auto mb-4" />
          <p className="text-cyber">You are already logged in. Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyber-dark to-cyber-dark-blue flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-cyber-grid"></div>
        <div className="scanner"></div>
      </div>
      
      <Card className="w-full max-w-md cyber-panel border-cyber/30 backdrop-blur-sm bg-cyber-dark/70 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber/20 via-cyber to-cyber/20"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyber/20 via-cyber to-cyber/20"></div>
        
        <CardHeader className="pt-8 pb-6 text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-cyber-dark border border-cyber/40 w-16 h-16 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,0,0.2)]">
            <Shield className="h-8 w-8 text-cyber" />
          </div>
          <CardTitle className="text-2xl font-mono">Secure Access Portal</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-cyber-dark border-cyber/30 focus:border-cyber focus:ring-cyber font-mono"
                  disabled={authLoading}
                  data-testid="email-input"
                />
                <User className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-cyber-dark border-cyber/30 focus:border-cyber focus:ring-cyber font-mono"
                  disabled={authLoading}
                  data-testid="password-input"
                />
                <Key className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-cyber text-cyber-dark hover:bg-cyber/90 font-mono shadow-[0_0_10px_rgba(0,255,0,0.1)] hover:shadow-[0_0_15px_rgba(0,255,0,0.2)] transition-all" 
              disabled={authLoading}
              data-testid="login-button"
            >
              {authLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Access Dashboard
                </>
              )}
            </Button>
            
            <div className="text-center text-xs text-muted-foreground font-mono">
              <p>Secure area - Authorized personnel only</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
