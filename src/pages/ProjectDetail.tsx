
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Download, ExternalLink, FileText, Youtube } from "lucide-react";
import { toast } from "sonner";

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

  const renderYouTubeEmbed = (url: string) => {
    let videoId = "";
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    
    if (match && match[1]) {
      videoId = match[1];
    }
    
    if (!videoId) return null;
    
    return (
      <div className="aspect-video w-full">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-md"
        ></iframe>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {isLoading ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">Loading project details...</p>
            </div>
          ) : project ? (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate('/projects')}>
                    Back to Projects
                  </Button>
                  <span className="text-muted-foreground">/ {project.category}</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mt-4">
                  <span className="text-green-500">{">"}</span> {project.title}
                </h1>
              </div>

              {project.image_url && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full object-cover max-h-[400px]"
                  />
                </div>
              )}
              
              <Card>
                <CardContent className="pt-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="whitespace-pre-line">{project.description}</p>
                  </div>
                </CardContent>
              </Card>

              {project.youtube_url && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Video Demonstration</h2>
                  {renderYouTubeEmbed(project.youtube_url)}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.tutorial_url && (
                  <Button className="w-full" asChild>
                    <a href={project.tutorial_url} target="_blank" rel="noreferrer">
                      <FileText className="mr-2" /> Download Tutorial
                    </a>
                  </Button>
                )}
                
                {project.config_file_url && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={project.config_file_url} target="_blank" rel="noreferrer">
                      <Download className="mr-2" /> Download Config Files
                    </a>
                  </Button>
                )}
                
                {project.demo_video_url && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={project.demo_video_url} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2" /> View Demo Video
                    </a>
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">Project not found</p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/projects')}
                className="mt-4"
              >
                Back to Projects
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetail;
