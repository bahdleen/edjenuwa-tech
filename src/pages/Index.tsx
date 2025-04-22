
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  
  const { data: profile } = useQuery({
    queryKey: ['profile', 'home'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    }
  });

  const { data: featuredProjects } = useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-24 flex-grow flex flex-col justify-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight">
                <span className="text-green-500">{">"}</span> {profile?.full_name || "Welcome to my Portfolio"}
              </h1>
              <p className="text-muted-foreground text-xl">
                Cybersecurity | Networking | AI
              </p>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg">
                Explore my projects and experiences in cybersecurity, networking, and artificial intelligence.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/projects">View Projects</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/about">About Me</Link>
                </Button>
                {user ? (
                  <Button variant="outline" asChild size="lg">
                    <Link to="/admin">Admin Dashboard</Link>
                  </Button>
                ) : (
                  <Button variant="outline" asChild size="lg">
                    <Link to="/auth">Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Projects */}
        {featuredProjects && featuredProjects.length > 0 && (
          <div className="bg-secondary/30 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    <span className="text-green-500">{">"}</span> Featured Projects
                  </h2>
                  <p className="text-muted-foreground">
                    Check out some of my latest work
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredProjects.map((project) => (
                    <Card key={project.id} className="hover:shadow-md transition-shadow">
                      {project.image_url && (
                        <div className="aspect-video w-full overflow-hidden">
                          <img 
                            src={project.image_url} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="mb-1 text-sm text-muted-foreground">{project.category}</div>
                        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                        <p className="text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
                        <Button asChild>
                          <Link to={`/projects/${project.id}`}>View Details</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button variant="outline" asChild>
                    <Link to="/projects">View All Projects</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
