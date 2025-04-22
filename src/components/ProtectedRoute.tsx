
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Shield } from 'lucide-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    if (!user && !loading) {
      toast.error("You must be logged in to access this page");
    }
  }, [user, loading]);
  
  // Show a loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-dark">
        <Shield className="text-cyber h-12 w-12 animate-pulse mb-4" />
        <p className="text-cyber text-lg font-mono animate-pulse">Authenticating...</p>
        <p className="text-muted-foreground text-sm mt-2 font-mono">Please wait while we verify your credentials</p>
      </div>
    );
  }
  
  if (!user) {
    // Redirect to auth page and store the attempted location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
