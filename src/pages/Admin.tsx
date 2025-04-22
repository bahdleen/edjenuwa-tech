
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, FolderOpen, User, LogOut, Lock, Shield } from "lucide-react";

const Admin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToProfile = () => {
    navigate("/admin/profile");
  };

  const handleNavigateToProjects = () => {
    navigate("/admin/projects");
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-cyber-dark to-cyber-dark-blue py-16 min-h-[calc(100vh-64px)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-cyber-dark border border-cyber/30 shadow-[0_0_10px_rgba(0,255,0,0.1)]">
                  <Lock className="text-cyber h-6 w-6" />
                </div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight font-mono">
                  <span className="text-cyber">&gt;</span> Admin Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground text-base md:text-lg">
                Secure management interface for your portfolio content
              </p>
              <div className="border border-cyber/20 bg-cyber/5 rounded-md p-3 text-xs md:text-sm text-cyber/80 font-mono overflow-x-auto">
                Logged in as: {user?.email}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="cyber-panel border-cyber/30 bg-gradient-to-br from-cyber-dark to-cyber/10 hover:shadow-[0_0_20px_rgba(0,255,0,0.1)] transition-all group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <User className="text-cyber h-5 w-5" />
                    <CardTitle className="font-mono text-base md:text-lg">Profile Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-5 text-sm md:text-base">
                    Update your professional profile information, resume, and skills
                  </p>
                  <Button
                    onClick={handleNavigateToProfile}
                    className="w-full bg-cyber text-cyber-dark hover:bg-cyber/90 group-hover:shadow-[0_0_10px_rgba(0,255,0,0.2)] transition-all text-xs md:text-sm"
                  >
                    <User className="mr-2 h-3 w-3 md:h-4 md:w-4" /> Manage Profile
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="cyber-panel border-cyber/30 bg-gradient-to-br from-cyber-dark to-cyber-blue/10 hover:shadow-[0_0_20px_rgba(15,160,206,0.1)] transition-all group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="text-cyber-blue h-5 w-5" />
                    <CardTitle className="font-mono text-base md:text-lg">Projects Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-5 text-sm md:text-base">
                    Add, edit, and delete your projects, including resources and media files
                  </p>
                  <Button
                    onClick={handleNavigateToProjects}
                    className="w-full bg-cyber-blue text-white hover:bg-cyber-blue/90 group-hover:shadow-[0_0_10px_rgba(15,160,206,0.2)] transition-all text-xs md:text-sm"
                  >
                    <FileText className="mr-2 h-3 w-3 md:h-4 md:w-4" /> Manage Projects
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card className="cyber-panel border-cyber-red/30 bg-gradient-to-br from-cyber-dark to-cyber-red/10 max-w-md mx-auto">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="text-cyber-red h-5 w-5" />
                  <CardTitle className="font-mono text-base md:text-lg">Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-5 text-sm md:text-base">
                  Manage your account security and access control
                </p>
                <Button 
                  variant="destructive" 
                  onClick={handleSignOut}
                  disabled={loading}
                  className="w-full font-mono text-xs md:text-sm"
                >
                  <LogOut className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                  {loading ? "Signing out..." : "Sign Out"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
