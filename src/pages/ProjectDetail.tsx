
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Download, ExternalLink, FileText, Youtube, Shield, Network, Terminal, Lock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
    "Cybersecurity": <Shield size={20} className="text-cyber-red" />,
    "Networking": <Network size={20} className="text-cyber-blue" />,
    "AI": <Terminal size={20} className="text-cyber" />
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
      <div className="aspect-video w-full cyber-border p-1 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
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
      <div className="bg-gradient-to-b from-cyber-dark to-cyber-dark-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-10">
            {isLoading ? (
              <div className="py-20 text-center cyber-panel border-cyber/30">
                <p className="text-muted-foreground">Loading project details...</p>
              </div>
            ) : project ? (
              <>
                <div className="space-y-4">
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
                      {categoryIcons[project.category] || <Shield size={18} />}
                      <span className="text-muted-foreground font-mono">{project.category}</span>
                    </div>
                  </div>
                  <h1 className="text-5xl font-bold tracking-tight mt-4 font-mono">
                    <span className="text-cyber">&gt;</span> {project.title}
                  </h1>
                </div>

                {project.image_url && (
                  <div className="cyber-border p-1 rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,255,0,0.1)]">
                    <div className="rounded-sm overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 via-cyber-dark/40 to-transparent z-10"></div>
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="w-full object-cover max-h-[500px]"
                      />
                    </div>
                  </div>
                )}
                
                <Card className="cyber-panel border-cyber/30 backdrop-blur-sm bg-cyber-dark/60">
                  <CardContent className="pt-8 px-8 pb-8">
                    <div className="prose prose-invert max-w-none">
                      <p className="whitespace-pre-line text-lg">{project.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    {project.youtube_url && (
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold font-mono flex items-center gap-2">
                          <Youtube className="text-cyber-red" size={24} />
                          <span>Video Demonstration</span>
                        </h2>
                        {renderYouTubeEmbed(project.youtube_url)}
                      </div>
                    )}

                    {/* Security Status Box */}
                    <Card className="cyber-panel border-cyber-red/30 bg-gradient-to-br from-cyber-dark to-cyber-red/10">
                      <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-4">
                        <div className="p-3 bg-cyber-dark rounded-full border border-cyber-red/30 shadow-[0_0_10px_rgba(255,0,0,0.1)]">
                          <AlertTriangle className="h-8 w-8 text-cyber-red" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-mono mb-1 text-cyber-red">Security Advisory</h3>
                          <p className="text-muted-foreground">
                            This project demonstrates security concepts that should be implemented with caution in production environments.
                            Always follow proper security protocols and best practices.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="cyber-panel border-cyber/20 h-full bg-cyber-dark/60 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-bold font-mono mb-6">Project Resources</h2>
                        
                        <div className="space-y-6">
                          {project.tutorial_url && (
                            <div className="group">
                              <h3 className="text-lg font-mono mb-2 flex items-center gap-2">
                                <FileText className="text-cyber" />
                                Technical Documentation
                              </h3>
                              <p className="text-muted-foreground text-sm mb-3">Detailed technical guide with step-by-step instructions</p>
                              <Button 
                                className="w-full bg-gradient-to-r from-cyber/70 to-cyber text-cyber-dark hover:bg-cyber/90 font-mono group-hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all" 
                                asChild
                              >
                                <a href={project.tutorial_url} target="_blank" rel="noreferrer">
                                  <Download className="mr-2" /> Download Documentation
                                </a>
                              </Button>
                            </div>
                          )}
                          
                          {project.tutorial_url && project.config_file_url && (
                            <Separator className="bg-cyber/10" />
                          )}
                          
                          {project.config_file_url && (
                            <div className="group">
                              <h3 className="text-lg font-mono mb-2 flex items-center gap-2">
                                <Terminal className="text-cyber-blue" />
                                Configuration Files
                              </h3>
                              <p className="text-muted-foreground text-sm mb-3">Complete configuration package for implementation</p>
                              <Button 
                                variant="outline" 
                                className="w-full border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 font-mono group-hover:shadow-[0_0_15px_rgba(15,160,206,0.2)] transition-all" 
                                asChild
                              >
                                <a href={project.config_file_url} target="_blank" rel="noreferrer">
                                  <Download className="mr-2" /> Download Config Files
                                </a>
                              </Button>
                            </div>
                          )}
                          
                          {project.config_file_url && project.demo_video_url && (
                            <Separator className="bg-cyber/10" />
                          )}
                          
                          {project.demo_video_url && (
                            <div className="group">
                              <h3 className="text-lg font-mono mb-2 flex items-center gap-2">
                                <Youtube className="text-cyber-red" />
                                Full Demo Video
                              </h3>
                              <p className="text-muted-foreground text-sm mb-3">Complete walkthrough of the project implementation</p>
                              <Button 
                                variant="outline" 
                                className="w-full border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10 font-mono group-hover:shadow-[0_0_15px_rgba(255,62,62,0.2)] transition-all" 
                                asChild
                              >
                                <a href={project.demo_video_url} target="_blank" rel="noreferrer">
                                  <ExternalLink className="mr-2" /> View Full Demo
                                </a>
                              </Button>
                            </div>
                          )}
                          
                          {(!project.tutorial_url && !project.config_file_url && !project.demo_video_url) && (
                            <p className="text-center text-muted-foreground py-6">
                              No additional resources available for this project.
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-20 text-center cyber-panel border-cyber/30 backdrop-blur-sm bg-cyber-dark/70">
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
