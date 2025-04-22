
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Youtube, Shield, Network, Terminal, Eye } from "lucide-react";

type ProjectCardProps = {
  project: {
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
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Cybersecurity": <Shield size={18} className="text-cyber-red" />,
  "Networking": <Network size={18} className="text-cyber-blue" />,
  "AI": <Terminal size={18} className="text-cyber" />
};

const categoryColors: Record<string, string> = {
  "Cybersecurity": "from-cyber-dark-blue to-cyber-red/30 border-cyber-red/40 hover:border-cyber-red",
  "Networking": "from-cyber-dark-blue to-cyber-blue/30 border-cyber-blue/40 hover:border-cyber-blue",
  "AI": "from-cyber-dark-blue to-cyber/30 border-cyber/40 hover:border-cyber"
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    console.log("Navigating to project:", projectId);
    navigate(`/projects/${projectId}`);
  };

  return (
    <Card 
      key={project.id} 
      className={`cyber-panel group transition-all duration-300 h-full flex flex-col bg-gradient-to-br ${categoryColors[project.category] || "from-cyber-dark-blue to-cyber/20 border-cyber/30 hover:border-cyber"} cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,0,0.15)]`}
      onClick={() => handleProjectClick(project.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleProjectClick(project.id);
        }
      }}
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
            e.stopPropagation();
            navigate(`/projects/${project.id}`);
          }}
          className="border-cyber/50 text-cyber hover:bg-cyber/10 font-mono"
        >
          <Eye size={14} className="mr-1" /> Details
        </Button>
      </CardFooter>
    </Card>
  );
};
