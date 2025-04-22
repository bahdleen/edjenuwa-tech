
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectVideo } from "@/components/projects/ProjectVideo";
import { ProjectResources } from "@/components/projects/ProjectResources";

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
                <ProjectHeader title={project.title} />

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
                  {project.youtube_url && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold font-mono flex items-center gap-2">
                        Video Demonstration
                      </h2>
                      <a 
                        href={project.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:opacity-90 transition-opacity"
                      >
                        <ProjectVideo url={project.youtube_url} />
                      </a>
                    </div>
                  )}

                  <div className="space-y-6">
                    <ProjectResources 
                      tutorialUrl={project.tutorial_url}
                      demoVideoUrl={project.demo_video_url}
                    />
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
