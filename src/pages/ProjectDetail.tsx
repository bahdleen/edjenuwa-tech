
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Download, ExternalLink, FileText, Youtube, Shield, Network, Terminal, Lock } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', 'detail', id],
    queryFn: async () => {
      if (!id) throw new Error("Project ID is required");
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (error) {
    toast.error("Failed to load project details");
  }

  // Map of category icons
  const categoryIcons: Record<string, React.ReactNode> = {
    "Cybersecurity": <Shield size={18} className="text-cyber-red" />,
    "Networking": <Network size={18} className="text-cyber-blue" />,
    "AI": <Terminal size={18} className="text-cyber" />
  };

  const renderYouTubeEmbed = (url: string) => {
    let videoId = "";
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    
    if (match && match[1]) {
      videoId = match[1];
    }
    
    if (!videoId) return null;
    
    return (
      <div className="aspect-video w-full cyber-border p-1">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-sm"
        ></iframe>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="bg-cyber-dark-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {isLoading ? (
              <div className="py-20 text-center cyber-panel border-cyber/30">
                <p className="text-muted-foreground">Loading project details...</p>
              </div>
            ) : project ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate('/projects')}
                      className="border-cyber/50 text-cyber hover:bg-cyber/10"
                    >
                      <ArrowLeft size={16} className="mr-1" /> Back to Projects
                    </Button>
                    <div className="flex items-center gap-1 ml-2">
                      {categoryIcons[project.category] || <Shield size={16} />}
                      <span className="text-muted-foreground font-mono">{project.category}</span>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight mt-4 font-mono">
                    <span className="text-cyber">//</span> {project.title}
                  </h1>
                </div>

                {project.image_url && (
                  <div className="cyber-border p-1 rounded-sm overflow-hidden">
                    <div className="rounded-sm overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/70 to-transparent z-10"></div>
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="w-full object-cover max-h-[400px]"
                      />
                    </div>
                  </div>
                )}
                
                <Card className="cyber-panel border-cyber/30">
                  <CardContent className="pt-6">
                    <div className="prose prose-invert max-w-none">
                      <p className="whitespace-pre-line">{project.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {project.youtube_url && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold font-mono">
                      <span className="text-cyber">{">"}</span> Video Demonstration
                    </h2>
                    {renderYouTubeEmbed(project.youtube_url)}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.tutorial_url && (
                    <Button 
                      className="w-full bg-cyber text-cyber-dark hover:bg-cyber/90" 
                      asChild
                    >
                      <a href={project.tutorial_url} target="_blank" rel="noreferrer">
                        <FileText className="mr-2" /> Download Tutorial
                      </a>
                    </Button>
                  )}
                  
                  {project.config_file_url && (
                    <Button 
                      variant="outline" 
                      className="w-full border-cyber/50 text-cyber hover:bg-cyber/10" 
                      asChild
                    >
                      <a href={project.config_file_url} target="_blank" rel="noreferrer">
                        <Download className="mr-2" /> Download Config Files
                      </a>
                    </Button>
                  )}
                  
                  {project.demo_video_url && (
                    <Button 
                      variant="outline" 
                      className="w-full border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10" 
                      asChild
                    >
                      <a href={project.demo_video_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-2" /> View Demo Video
                      </a>
                    </Button>
                  )}
                </div>

                {/* Security Status Box */}
                <Card className="cyber-panel border-cyber-red/30">
                  <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-4">
                    <div className="p-3 bg-cyber-dark rounded-full">
                      <Lock className="h-8 w-8 text-cyber-red" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-mono mb-1">Security Classification</h3>
                      <p className="text-muted-foreground">
                        This project demonstrates security concepts that should be implemented with caution in production environments.
                        Always follow proper security protocols and best practices.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="py-20 text-center cyber-panel border-cyber/30">
                <p className="text-muted-foreground">Project not found</p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/projects')}
                  className="mt-4 border-cyber/50 text-cyber hover:bg-cyber/10"
                >
                  <ArrowLeft size={16} className="mr-1" /> Back to Projects
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetail;
