
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink, FileText, Youtube, Shield, Network, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  // Map of category icons
  const categoryIcons: Record<string, React.ReactNode> = {
    "Cybersecurity": <Shield size={16} className="text-cyber-red" />,
    "Networking": <Network size={16} className="text-cyber-blue" />,
    "AI": <Terminal size={16} className="text-cyber" />
  };

  // Map of category colors
  const categoryColors: Record<string, string> = {
    "Cybersecurity": "border-cyber-red/40 hover:border-cyber-red",
    "Networking": "border-cyber-blue/40 hover:border-cyber-blue",
    "AI": "border-cyber/40 hover:border-cyber"
  };

  return (
    <MainLayout>
      <div className="bg-cyber-dark-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight font-mono">
                <span className="text-cyber">//</span> Security Projects
              </h1>
              <p className="text-muted-foreground text-lg">
                Professional work in cybersecurity, networking, and artificial intelligence
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={filter === null ? "default" : "outline"} 
                onClick={() => setFilter(null)}
                className={filter === null ? "bg-cyber text-cyber-dark" : "border-cyber text-cyber hover:bg-cyber/10"}
              >
                All
              </Button>
              <Button 
                variant={filter === "Cybersecurity" ? "default" : "outline"} 
                onClick={() => setFilter("Cybersecurity")}
                className={filter === "Cybersecurity" ? "bg-cyber-red text-white" : "border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10"}
              >
                <Shield size={16} className="mr-1" /> Cybersecurity
              </Button>
              <Button 
                variant={filter === "Networking" ? "default" : "outline"} 
                onClick={() => setFilter("Networking")}
                className={filter === "Networking" ? "bg-cyber-blue text-white" : "border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"}
              >
                <Network size={16} className="mr-1" /> Networking
              </Button>
              <Button 
                variant={filter === "AI" ? "default" : "outline"} 
                onClick={() => setFilter("AI")}
                className={filter === "AI" ? "bg-cyber text-cyber-dark" : "border-cyber/50 text-cyber hover:bg-cyber/10"}
              >
                <Terminal size={16} className="mr-1" /> AI
              </Button>
            </div>

            {isLoading ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">Loading projects...</p>
              </div>
            ) : filteredProjects && filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    className={`cyber-panel group transition-all duration-300 h-full flex flex-col ${categoryColors[project.category] || "border-cyber/30 hover:border-cyber"}`}
                  >
                    {project.image_url && (
                      <div className="aspect-video w-full overflow-hidden border-b border-cyber/20 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent opacity-70 z-10"></div>
                        <img 
                          src={project.image_url} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-1 text-xs mb-1">
                        {categoryIcons[project.category] || <Shield size={16} />}
                        <span className="text-muted-foreground font-mono">{project.category}</span>
                      </div>
                      <CardTitle className="line-clamp-1 font-mono group-hover:text-cyber transition-colors">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground line-clamp-3">{project.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t border-cyber/10 pt-4">
                      <div className="flex gap-2">
                        {project.youtube_url && (
                          <a 
                            href={project.youtube_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-muted-foreground hover:text-cyber transition-colors"
                          >
                            <Youtube size={18} />
                          </a>
                        )}
                        {project.tutorial_url && (
                          <a 
                            href={project.tutorial_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-muted-foreground hover:text-cyber-red transition-colors"
                          >
                            <FileText size={18} />
                          </a>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="border-cyber/50 text-cyber hover:bg-cyber/10"
                      >
                        View Details <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center cyber-panel border-cyber/30">
                <p className="text-muted-foreground">
                  No projects found{filter ? ` in ${filter}` : ""}. Check back later!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Projects;
