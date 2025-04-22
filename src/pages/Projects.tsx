
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink, FileText, Youtube, Shield, Network, Terminal, Eye } from "lucide-react";
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
    "Cybersecurity": <Shield size={18} className="text-cyber-red" />,
    "Networking": <Network size={18} className="text-cyber-blue" />,
    "AI": <Terminal size={18} className="text-cyber" />
  };

  // Map of category colors
  const categoryColors: Record<string, string> = {
    "Cybersecurity": "from-cyber-dark-blue to-cyber-red/30 border-cyber-red/40 hover:border-cyber-red",
    "Networking": "from-cyber-dark-blue to-cyber-blue/30 border-cyber-blue/40 hover:border-cyber-blue",
    "AI": "from-cyber-dark-blue to-cyber/30 border-cyber/40 hover:border-cyber"
  };

  // Function to handle clicking on a project card
  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-cyber-dark to-cyber-dark-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="space-y-2 text-center">
              <h1 className="text-5xl font-bold tracking-tight font-mono">
                <span className="text-cyber">&gt;</span> Security Projects
              </h1>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
                Professional work in cybersecurity, networking, and artificial intelligence with 
                detailed explanations, tutorials, and configuration files
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                variant={filter === null ? "default" : "outline"} 
                onClick={() => setFilter(null)}
                className={filter === null ? "bg-cyber text-cyber-dark" : "border-cyber text-cyber hover:bg-cyber/10"}
                size="lg"
              >
                All Projects
              </Button>
              <Button 
                variant={filter === "Cybersecurity" ? "default" : "outline"} 
                onClick={() => setFilter("Cybersecurity")}
                className={filter === "Cybersecurity" ? "bg-cyber-red text-white" : "border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10"}
                size="lg"
              >
                <Shield size={18} className="mr-2" /> Cybersecurity
              </Button>
              <Button 
                variant={filter === "Networking" ? "default" : "outline"} 
                onClick={() => setFilter("Networking")}
                className={filter === "Networking" ? "bg-cyber-blue text-white" : "border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"}
                size="lg"
              >
                <Network size={18} className="mr-2" /> Networking
              </Button>
              <Button 
                variant={filter === "AI" ? "default" : "outline"} 
                onClick={() => setFilter("AI")}
                className={filter === "AI" ? "bg-cyber text-cyber-dark" : "border-cyber/50 text-cyber hover:bg-cyber/10"}
                size="lg"
              >
                <Terminal size={18} className="mr-2" /> AI
              </Button>
            </div>

            {isLoading ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">Loading projects...</p>
              </div>
            ) : filteredProjects && filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    className={`cyber-panel group transition-all duration-300 h-full flex flex-col bg-gradient-to-br ${categoryColors[project.category] || "from-cyber-dark-blue to-cyber/20 border-cyber/30 hover:border-cyber"} cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,0,0.15)]`}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    {project.image_url && (
                      <div className="aspect-video w-full overflow-hidden border-b border-cyber/20 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent opacity-80 z-10"></div>
                        <img 
                          src={project.image_url} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-2 right-2 z-20 flex gap-2">
                          {project.youtube_url && (
                            <div className="p-1.5 rounded-full bg-cyber-dark/70 border border-cyber-red/40">
                              <Youtube size={16} className="text-cyber-red" />
                            </div>
                          )}
                          {project.config_file_url && (
                            <div className="p-1.5 rounded-full bg-cyber-dark/70 border border-cyber/40">
                              <FileText size={16} className="text-cyber" />
                            </div>
                          )}
                          {project.demo_video_url && (
                            <div className="p-1.5 rounded-full bg-cyber-dark/70 border border-cyber-blue/40">
                              <ExternalLink size={16} className="text-cyber-blue" />
                            </div>
                          )}
                        </div>
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
                    <CardFooter className="flex justify-between border-t border-white/5 pt-4">
                      <div className="flex gap-3">
                        {(project.youtube_url || project.tutorial_url || project.config_file_url || project.demo_video_url) && (
                          <Badge variant="outline" className="bg-cyber-dark/50 border-cyber/30 text-muted-foreground font-mono">
                            Resources Available
                          </Badge>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click handler from firing
                          navigate(`/projects/${project.id}`);
                        }}
                        className="border-cyber/50 text-cyber hover:bg-cyber/10 font-mono"
                      >
                        <Eye size={14} className="mr-1" /> Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center cyber-panel border-cyber/30 bg-cyber-dark-blue/50 backdrop-blur-sm">
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
