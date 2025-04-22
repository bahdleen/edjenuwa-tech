
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import MainLayout from "@/components/layout/MainLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

type ProjectFormValues = {
  title: string;
  category: string;
  description: string;
  youtube_url: string;
  tutorial_url: string;
  config_file_url: string;
  demo_video_url: string;
  image_url: string;
};

const categories = ["Cybersecurity", "Networking", "AI"];

const ProjectEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== undefined && id !== "new";
  
  const [loading, setLoading] = useState(false);
  const [tutorialFile, setTutorialFile] = useState<File | null>(null);
  const [configFile, setConfigFile] = useState<File | null>(null);
  const [demoVideo, setDemoVideo] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Initialize the form
  const form = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      youtube_url: "",
      tutorial_url: "",
      config_file_url: "",
      demo_video_url: "",
      image_url: "",
    },
  });

  // Fetch project if in edit mode
  const { data: project } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!isEditMode) return null;

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditMode,
  });

  // Set form values when project data is loaded
  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title || "",
        category: project.category || "",
        description: project.description || "",
        youtube_url: project.youtube_url || "",
        tutorial_url: project.tutorial_url || "",
        config_file_url: project.config_file_url || "",
        demo_video_url: project.demo_video_url || "",
        image_url: project.image_url || "",
      });
    }
  }, [project, form]);

  const uploadFile = async (file: File, bucket: string, path: string) => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${path}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    try {
      let updatedData = { ...data };

      // Upload tutorial file if selected
      if (tutorialFile) {
        const tutorialUrl = await uploadFile(tutorialFile, 'project-files', 'tutorials');
        if (tutorialUrl) updatedData.tutorial_url = tutorialUrl;
      }

      // Upload config file if selected
      if (configFile) {
        const configUrl = await uploadFile(configFile, 'project-files', 'configs');
        if (configUrl) updatedData.config_file_url = configUrl;
      }

      // Upload demo video if selected
      if (demoVideo) {
        const demoUrl = await uploadFile(demoVideo, 'project-files', 'demos');
        if (demoUrl) updatedData.demo_video_url = demoUrl;
      }

      // Upload image if selected
      if (imageFile) {
        const imageUrl = await uploadFile(imageFile, 'project-files', 'images');
        if (imageUrl) updatedData.image_url = imageUrl;
      }

      if (isEditMode) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(updatedData)
          .eq('id', id);

        if (error) throw error;
        toast.success("Project updated successfully");
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert([updatedData]);

        if (error) throw error;
        toast.success("Project created successfully");
      }

      navigate("/admin/projects");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-green-500">{">"}</span> {isEditMode ? "Edit" : "Create"} Project
            </h1>
            <p className="text-muted-foreground">
              {isEditMode ? "Update your project details" : "Add a new project to your portfolio"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Project Title" required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Project description..." 
                            className="min-h-[150px]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="youtube_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube Video URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://youtube.com/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormLabel htmlFor="tutorialFile">Tutorial File (PDF)</FormLabel>
                      <Input 
                        id="tutorialFile" 
                        type="file" 
                        accept=".pdf,.md"
                        onChange={(e) => setTutorialFile(e.target.files?.[0] || null)} 
                      />
                      {project?.tutorial_url && (
                        <p className="text-sm mt-1">
                          Current: <a href={project.tutorial_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View file</a>
                        </p>
                      )}
                    </div>

                    <div>
                      <FormLabel htmlFor="configFile">Config File (ZIP/TAR)</FormLabel>
                      <Input 
                        id="configFile" 
                        type="file" 
                        accept=".zip,.tar,.gz"
                        onChange={(e) => setConfigFile(e.target.files?.[0] || null)} 
                      />
                      {project?.config_file_url && (
                        <p className="text-sm mt-1">
                          Current: <a href={project.config_file_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View file</a>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormLabel htmlFor="demoVideo">Demo Video</FormLabel>
                      <Input 
                        id="demoVideo" 
                        type="file" 
                        accept="video/*"
                        onChange={(e) => setDemoVideo(e.target.files?.[0] || null)} 
                      />
                      {project?.demo_video_url && (
                        <p className="text-sm mt-1">
                          Current: <a href={project.demo_video_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View video</a>
                        </p>
                      )}
                    </div>

                    <div>
                      <FormLabel htmlFor="imageFile">Project Image</FormLabel>
                      <Input 
                        id="imageFile" 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
                      />
                      {project?.image_url && (
                        <p className="text-sm mt-1">
                          Current: <a href={project.image_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View image</a>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate("/admin/projects")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Project" : "Create Project")}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectEditor;
