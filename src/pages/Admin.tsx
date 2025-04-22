
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-green-500">{">"}</span> Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your portfolio content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Update your profile information and resume
                </p>
                <Button
                  onClick={() => navigate("/admin/profile")}
                  className="w-full"
                >
                  Manage Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Add, edit, and delete your projects
                </p>
                <Button
                  onClick={() => navigate("/admin/projects")}
                  className="w-full"
                >
                  Manage Projects
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Button 
              variant="destructive" 
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? "Signing out..." : "Sign Out"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
