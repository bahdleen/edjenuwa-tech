
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useEffect } from 'react';

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
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-cyber animate-pulse">Authenticating...</p>
    </div>;
  }
  
  if (!user) {
    // Redirect to auth page and store the attempted location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
