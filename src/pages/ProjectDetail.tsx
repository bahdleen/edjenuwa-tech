
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectVideo } from "@/components/projects/ProjectVideo";
import { ProjectResources } from "@/components/projects/ProjectResources";
import { ProjectImage } from "@/components/projects/ProjectImage";
import { ProjectDescription } from "@/components/projects/ProjectDescription";

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
      console.log("Fetched project data:", data);
      return data;
    },
    enabled: !!id,
  });

  if (error) {
    console.error("Error loading project:", error);
    toast.error("Failed to load project details");
  }

  // Check if URL is valid
  const isValidUrl = (url: string | null | undefined): boolean => {
    if (!url || url.trim() === '') return false;
    try {
      new URL(url);
      return true;
    } catch (e) {
      console.error("Invalid URL:", url, e);
      return false;
    }
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-cyber-dark to-cyber-dark-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-10">
            {isLoading ? (
              <div className="py-20 text-center cyber-panel border-cyber/30">
                <Loader2 className="h-8 w-8 animate-spin text-cyber mx-auto mb-4" />
                <p className="text-muted-foreground">Loading project details...</p>
              </div>
            ) : project ? (
              <>
                <ProjectHeader title={project.title} />
                <ProjectImage imageUrl={project.image_url} title={project.title} />
                <ProjectDescription description={project.description} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isValidUrl(project.youtube_url) && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold font-mono flex items-center gap-2">
                        Watch
                      </h2>
                      <div className="text-sm text-muted-foreground mb-4 bg-cyber-dark/30 p-3 rounded-md">
                        <strong className="text-cyber">Complete walkthrough</strong> of the project implementation
                      </div>
                      <ProjectVideo url={project.youtube_url || ''} />
                    </div>
                  )}

                  <div className="space-y-6">
                    <ProjectResources 
                      tutorialUrl={project.tutorial_url}
                      demoVideoUrl={project.demo_video_url}
                      configFileUrl={project.config_file_url}
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/projects')}
                    className="border-cyber/50 text-cyber hover:bg-cyber/10"
                  >
                    <ArrowLeft size={16} className="mr-1" /> Back to Projects
                  </Button>
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
