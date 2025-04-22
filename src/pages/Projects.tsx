
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ExternalLink, FileText, Youtube } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string | null;
  youtube_url: string | null;
  tutorial_url: string | null;
  config_file_url: string | null;
  demo_video_url: string | null;
};

const Projects = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string | null>(null);
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', 'public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    }
  });

  const filteredProjects = filter
    ? projects?.filter(project => project.category === filter)
    : projects;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-green-500">{">"}</span> Projects
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse my work in cybersecurity, networking, and AI
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={filter === null ? "default" : "outline"} 
              onClick={() => setFilter(null)}
            >
              All
            </Button>
            <Button 
              variant={filter === "Cybersecurity" ? "default" : "outline"} 
              onClick={() => setFilter("Cybersecurity")}
            >
              Cybersecurity
            </Button>
            <Button 
              variant={filter === "Networking" ? "default" : "outline"} 
              onClick={() => setFilter("Networking")}
            >
              Networking
            </Button>
            <Button 
              variant={filter === "AI" ? "default" : "outline"} 
              onClick={() => setFilter("AI")}
            >
              AI
            </Button>
          </div>

          {isLoading ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
                  {project.image_url && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-1">{project.category}</div>
                    <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex gap-2">
                      {project.youtube_url && (
                        <a 
                          href={project.youtube_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Youtube size={18} />
                        </a>
                      )}
                      {project.tutorial_url && (
                        <a 
                          href={project.tutorial_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-muted-foreground hover:text-primary"
                        >
                          <FileText size={18} />
                        </a>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">
                No projects found{filter ? ` in ${filter}` : ""}. Check back later!
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Projects;
