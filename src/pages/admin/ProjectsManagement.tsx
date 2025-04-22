
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

const ProjectsManagement = () => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState<string | null>(null);

  const { data: projects, isLoading, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    setDeleting(id);
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("Project deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(null);
    }
  };

  if (error) {
    toast.error("Failed to load projects");
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
                <span className="text-green-500">{">"}</span> Projects
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">Manage your project portfolio</p>
            </div>
            <Button onClick={() => navigate("/admin/projects/new")} className="self-start md:self-auto">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">All Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-8 text-center">Loading projects...</div>
              ) : projects && projects.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Category</TableHead>
                        <TableHead className="hidden md:table-cell">Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium text-sm">
                            <div className="md:hidden text-xs text-muted-foreground mb-1">{project.category}</div>
                            {project.title}
                            <div className="md:hidden text-xs text-muted-foreground mt-1">
                              {new Date(project.created_at).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{project.category}</TableCell>
                          <TableCell className="hidden md:table-cell">{new Date(project.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right space-x-1 md:space-x-2">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/projects/${project.id}`)} className="h-7 w-7 md:h-8 md:w-8 p-0">
                              <Eye className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => navigate(`/admin/projects/edit/${project.id}`)} className="h-7 w-7 md:h-8 md:w-8 p-0">
                              <Edit className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              disabled={deleting === project.id}
                              onClick={() => handleDelete(project.id)}
                              className="h-7 w-7 md:h-8 md:w-8 p-0"
                            >
                              <Trash className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No projects found. Create your first project!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-4">
            <Button variant="outline" onClick={() => navigate('/admin')} className="text-sm">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectsManagement;
