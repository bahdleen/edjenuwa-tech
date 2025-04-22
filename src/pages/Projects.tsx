
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectsList } from "@/components/projects/ProjectsList";

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

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-cyber-dark to-cyber-dark-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-10">
            <ProjectsHeader />
            <ProjectFilters currentFilter={filter} onFilterChange={setFilter} />
            <ProjectsList projects={projects || []} isLoading={isLoading} filter={filter} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Projects;
