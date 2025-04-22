
import React from 'react';
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

interface ProjectResourcesProps {
  tutorialFile: File | null;
  configFile: File | null;
  demoVideo: File | null;
  imageFile: File | null;
  setTutorialFile: (file: File | null) => void;
  setConfigFile: (file: File | null) => void;
  setDemoVideo: (file: File | null) => void;
  setImageFile: (file: File | null) => void;
  project?: {
    tutorial_url?: string;
    config_file_url?: string;
    demo_video_url?: string;
    image_url?: string;
  };
}

export const ProjectResources = ({
  tutorialFile,
  configFile,
  demoVideo,
  imageFile,
  setTutorialFile,
  setConfigFile,
  setDemoVideo,
  setImageFile,
  project
}: ProjectResourcesProps) => {
  return (
    <>
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
    </>
  );
};
