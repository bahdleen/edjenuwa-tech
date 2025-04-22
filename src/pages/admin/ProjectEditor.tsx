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
import { Loader2 } from "lucide-react";

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
  const [uploadProgress, setUploadProgress] = useState(0);

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
  const { data: project, isLoading: projectLoading } = useQuery({
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

  const uploadFile = async (file: File, bucket: string, path: string): Promise<string | null> => {
    if (!file) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${path}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      setUploadProgress(25);
      
      // Check if the bucket exists and create it if it doesn't
      const { data: buckets } = await supabase.storage.listBuckets();
      if (!buckets?.find(b => b.name === bucket)) {
        await supabase.storage.createBucket(bucket, {
          public: true,
          fileSizeLimit: 100 * 1024 * 1024, // 100MB limit
        });
      }

      setUploadProgress(50);
      
      // Upload the file
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Important: Ensure file overwriting is enabled
        });

      if (error) throw error;

      setUploadProgress(75);
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setUploadProgress(100);
      
      return urlData.publicUrl;
    } catch (error: any) {
      console.error("File upload error:", error);
      toast.error(`File upload failed: ${error.message}`);
      return null;
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    setUploadProgress(0);
    
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
      
      console.log("Saving project with data:", updatedData);

      if (isEditMode) {
        // Update existing project - preserve existing values if not changed
        const dataToUpdate = { ...updatedData };
        
        // Only keep non-empty fields when updating
        Object.keys(dataToUpdate).forEach(key => {
          // Keep existing values if not changed (for file URLs)
          if (
            (key === 'tutorial_url' || key === 'config_file_url' || 
             key === 'demo_video_url' || key === 'image_url') && 
            !dataToUpdate[key as keyof ProjectFormValues] && 
            project?.[key as keyof ProjectFormValues]
          ) {
            dataToUpdate[key as keyof ProjectFormValues] = project[key as keyof ProjectFormValues];
          }
          
          // Remove empty fields to prevent overwriting with nulls
          if (dataToUpdate[key as keyof ProjectFormValues] === '') {
            delete dataToUpdate[key as keyof ProjectFormValues];
          }
        });

        const { error } = await supabase
          .from('projects')
          .update(dataToUpdate)
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
      console.error("Project save error:", error);
      toast.error(`Failed to save project: ${error.message}`);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (projectLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-cyber" />
          <span className="ml-2">Loading project...</span>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-cyber">{">"}</span> {isEditMode ? "Edit" : "Create"} Project
            </h1>
            <p className="text-muted-foreground">
              {isEditMode ? "Update your project details" : "Add a new project to your portfolio"}
            </p>
          </div>

          <Card className="border-cyber/20 bg-cyber-dark-blue/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mb-4">
                  <div className="w-full bg-cyber-dark rounded-full h-2.5 mb-1">
                    <div 
                      className="bg-cyber h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Uploading files... {uploadProgress}%</p>
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Title</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Project Title" 
                            required 
                            className="bg-cyber-dark border-cyber/20 focus:border-cyber/50" 
                          />
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
                        <FormLabel className="text-foreground">Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-cyber-dark border-cyber/20">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-cyber-dark border-cyber/20">
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
                        <FormLabel className="text-foreground">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Project description..." 
                            className="min-h-[150px] bg-cyber-dark border-cyber/20 focus:border-cyber/50" 
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
                        <FormLabel className="text-foreground">YouTube Video URL</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="https://youtube.com/..." 
                            className="bg-cyber-dark border-cyber/20 focus:border-cyber/50" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormLabel htmlFor="tutorialFile" className="text-foreground">Tutorial File (PDF)</FormLabel>
                      <Input 
                        id="tutorialFile" 
                        type="file" 
                        accept=".pdf,.md"
                        onChange={(e) => setTutorialFile(e.target.files?.[0] || null)} 
                        className="bg-cyber-dark border-cyber/20"
                      />
                      {project?.tutorial_url && (
                        <p className="text-sm mt-1">
                          Current: <a href={project.tutorial_url} target="_blank" rel="noreferrer" className="text-cyber hover:underline">View file</a>
                        </p>
                      )}
                    </div>

                    <div>
                      <FormLabel htmlFor="configFile" className="text-foreground">Config File (ZIP/TAR)</FormLabel>
                      <Input 
                        id="configFile" 
                        type="file" 
                        accept=".zip,.tar,.gz"
                        onChange={(e) => setConfigFile(e.target.files?.[0] || null)} 
                        className="bg-cyber-dark border-cyber/20"
                      />
                      {project?.config_file_url && (
                        <p className="text-sm mt-1">
                          Current: <a href={project.config_file_url} target="_blank" rel="noreferrer" className="text-cyber hover:underline">View file</a>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormLabel htmlFor="demoVideo" className="text-foreground">Demo Video</FormLabel>
                      <Input 
                        id="demoVideo" 
                        type="file" 
                        accept="video/*"
                        onChange={(e) => setDemoVideo(e.target.files?.[0] || null)} 
                        className="bg-cyber-dark border-cyber/20"
                      />
                      {project?.demo_video_url && (
                        <p className="text-sm mt-1">
                          Current: <a href={project.demo_video_url} target="_blank" rel="noreferrer" className="text-cyber hover:underline">View video</a>
                        </p>
                      )}
                    </div>

                    <div>
                      <FormLabel htmlFor="imageFile" className="text-foreground">Project Image</FormLabel>
                      <Input 
                        id="imageFile" 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
                        className="bg-cyber-dark border-cyber/20"
                      />
                      {project?.image_url && (
                        <p className="text-sm mt-1">
                          Current: <a href={project.image_url} target="_blank" rel="noreferrer" className="text-cyber hover:underline">View image</a>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end pt-4 border-t border-cyber/10">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate("/admin/projects")}
                      className="border-cyber/50 text-cyber hover:bg-cyber/10"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="bg-cyber text-cyber-dark hover:bg-cyber/90"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isEditMode ? "Updating..." : "Creating..."}
                        </>
                      ) : (
                        isEditMode ? "Update Project" : "Create Project"
                      )}
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
