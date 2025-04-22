
import { ProjectCard } from "./ProjectCard";

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

type ProjectsListProps = {
  projects: Project[];
  isLoading: boolean;
  filter: string | null;
};

export const ProjectsList = ({ projects, isLoading, filter }: ProjectsListProps) => {
  const filteredProjects = filter
    ? projects?.filter(project => project.category === filter)
    : projects;

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  if (!filteredProjects || filteredProjects.length === 0) {
    return (
      <div className="py-20 text-center cyber-panel border-cyber/30 bg-cyber-dark-blue/50 backdrop-blur-sm">
        <p className="text-muted-foreground">
          No projects found{filter ? ` in ${filter}` : ""}. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
