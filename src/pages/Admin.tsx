
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  FileText, 
  FolderOpen, 
  User, 
  LogOut, 
  Lock, 
  Shield, 
  Terminal, 
  Database, 
  Network, 
  BarChart4,
  KeyRound
} from "lucide-react";

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

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-cyber-dark to-cyber-dark-blue py-12 min-h-[calc(100vh-64px)]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="space-y-4 border-l-4 border-cyber pl-4">
              <div className="flex items-center gap-3">
                <Shield className="text-cyber h-8 w-8" />
                <h1 className="text-3xl md:text-4xl font-bold font-mono">
                  Security Console
                </h1>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Welcome to your secured management dashboard. All actions are logged and encrypted.
              </p>
              <div className="flex items-center gap-2 bg-cyber/5 border border-cyber/20 rounded-md py-2 px-3 text-sm text-cyber/80 font-mono max-w-lg">
                <Lock size={14} className="text-cyber" />
                <span>Authenticated as:</span>
                <span className="font-bold">{user?.email}</span>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Profile Management */}
              <Card className="cyber-panel border-cyber/40 bg-gradient-to-br from-cyber-dark to-cyber/5 hover:shadow-[0_0_25px_rgba(0,255,0,0.15)] transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-cyber-grid opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-lg flex items-center gap-2">
                      <User className="text-cyber h-5 w-5" />
                      Profile Center
                    </CardTitle>
                    <span className="text-xs px-2 py-1 bg-cyber/10 text-cyber rounded font-mono">AUTHORIZED</span>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="h-1 w-full bg-cyber/20 rounded-full overflow-hidden">
                        <div className="h-full bg-cyber w-[85%]"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Profile completion</span>
                        <span className="text-cyber">85%</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Manage your professional information, certifications, and security expertise
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={() => handleNavigate("/admin/profile")}
                      className="w-full bg-cyber text-cyber-dark hover:bg-cyber/90 group-hover:shadow-[0_0_10px_rgba(0,255,0,0.3)] transition-all text-xs md:text-sm"
                    >
                      <KeyRound className="mr-2 h-3 w-3 md:h-4 md:w-4" /> Access Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Projects Management */}
              <Card className="cyber-panel border-cyber-blue/40 bg-gradient-to-br from-cyber-dark to-cyber-blue/5 hover:shadow-[0_0_25px_rgba(15,160,206,0.15)] transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-cyber-grid opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-lg flex items-center gap-2">
                      <FolderOpen className="text-cyber-blue h-5 w-5" />
                      Projects Repository
                    </CardTitle>
                    <span className="text-xs px-2 py-1 bg-cyber-blue/10 text-cyber-blue rounded font-mono">SECURED</span>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-cyber-dark-blue p-2 rounded border border-cyber-blue/20">
                        <div className="text-cyber-blue font-bold">12</div>
                        <div className="text-muted-foreground mt-1">Total</div>
                      </div>
                      <div className="bg-cyber-dark-blue p-2 rounded border border-cyber-blue/20">
                        <div className="text-cyber-blue font-bold">8</div>
                        <div className="text-muted-foreground mt-1">Active</div>
                      </div>
                      <div className="bg-cyber-dark-blue p-2 rounded border border-cyber-blue/20">
                        <div className="text-cyber-blue font-bold">4</div>
                        <div className="text-muted-foreground mt-1">Draft</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Manage your cybersecurity projects, case studies, and technical implementations
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={() => handleNavigate("/admin/projects")}
                      className="w-full bg-cyber-blue text-white hover:bg-cyber-blue/90 group-hover:shadow-[0_0_10px_rgba(15,160,206,0.3)] transition-all text-xs md:text-sm"
                    >
                      <Database className="mr-2 h-3 w-3 md:h-4 md:w-4" /> Manage Projects
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Analytics Dashboard - New Card */}
              <Card className="cyber-panel border-cyber-red/40 bg-gradient-to-br from-cyber-dark to-cyber-red/5 hover:shadow-[0_0_25px_rgba(255,62,62,0.15)] transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-cyber-grid opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-lg flex items-center gap-2">
                      <BarChart4 className="text-cyber-red h-5 w-5" />
                      Analytics Center
                    </CardTitle>
                    <span className="text-xs px-2 py-1 bg-cyber-red/10 text-cyber-red rounded font-mono">MONITORING</span>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2 py-3 bg-cyber-dark rounded border border-cyber-red/20">
                      <div className="flex items-center gap-2">
                        <Terminal className="text-cyber-red h-4 w-4" />
                        <span className="text-xs font-mono">Portfolio Visitors</span>
                      </div>
                      <div className="font-mono text-cyber-red">+28%</div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Monitor portfolio performance, visitor statistics, and engagement metrics
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={() => handleNavigate("/admin/analytics")}
                      variant="outline" 
                      className="w-full border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10 hover:text-cyber-red group-hover:shadow-[0_0_10px_rgba(255,62,62,0.2)] transition-all text-xs md:text-sm"
                    >
                      <Network className="mr-2 h-3 w-3 md:h-4 md:w-4" /> View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Security Controls */}
            <div className="mt-8">
              <Card className="cyber-panel border-cyber-red/30 bg-gradient-to-br from-cyber-dark to-cyber-red/5 max-w-md mx-auto overflow-hidden">
                <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
                <CardHeader className="relative z-10 pb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="text-cyber-red h-5 w-5" />
                    <CardTitle className="font-mono text-base md:text-lg">Security Controls</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-3 py-2 bg-cyber-dark border border-cyber-red/20 rounded text-xs">
                      <span className="text-muted-foreground">Last login:</span>
                      <span className="font-mono text-cyber-red">{new Date().toLocaleString()}</span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      Manage your account security settings and authentication preferences
                    </p>
                    
                    <Button 
                      variant="destructive" 
                      onClick={handleSignOut}
                      disabled={loading}
                      className="w-full font-mono text-xs md:text-sm bg-cyber-red hover:bg-cyber-red/90"
                    >
                      <LogOut className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      {loading ? "Terminating Session..." : "Terminate Session"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
