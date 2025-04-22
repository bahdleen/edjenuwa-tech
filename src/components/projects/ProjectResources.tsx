
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Video, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface ProjectResourcesProps {
  tutorialUrl?: string | null;
  demoVideoUrl?: string | null;
  configFileUrl?: string | null;
}

export const ProjectResources = ({ tutorialUrl, demoVideoUrl, configFileUrl }: ProjectResourcesProps) => {
  if (!tutorialUrl && !demoVideoUrl && !configFileUrl) return null;

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
    <Card className="cyber-panel border-cyber/20 h-full bg-cyber-dark/60 backdrop-blur-sm">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 tracking-tight text-foreground">Project Resources</h2>
        
        <div className="space-y-6">
          {isValidUrl(tutorialUrl) && (
            <div className="group">
              <h3 className="text-lg mb-2 flex items-center gap-2 text-foreground tracking-wide">
                <FileText className="text-cyber" />
                Documentation
              </h3>
              <p className="text-muted-foreground text-sm mb-3">Detailed technical guide with step-by-step instructions</p>
              <a 
                href={tutorialUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-6 font-medium border border-cyber rounded-md text-center hover:bg-cyber/10 hover:text-cyber transition-all duration-200 cursor-pointer flex items-center justify-center"
                onClick={(e) => {
                  if (!tutorialUrl) {
                    e.preventDefault();
                    toast.error("No documentation URL provided");
                  }
                }}
              >
                <FileText className="mr-2" /> View Documentation
              </a>
            </div>
          )}
          
          {((isValidUrl(tutorialUrl) && isValidUrl(demoVideoUrl)) || (isValidUrl(tutorialUrl) && isValidUrl(configFileUrl)) || (isValidUrl(demoVideoUrl) && isValidUrl(configFileUrl))) && (
            <Separator className="bg-cyber/10" />
          )}
          
          {isValidUrl(demoVideoUrl) && (
            <div className="group">
              <h3 className="text-lg mb-2 flex items-center gap-2 text-foreground tracking-wide">
                <Video className="text-cyber-red" />
                Demo Video
              </h3>
              <p className="text-muted-foreground text-sm mb-3">Short demonstration of project capabilities</p>
              <a 
                href={demoVideoUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-6 font-medium border border-cyber-red rounded-md text-center hover:bg-cyber-red/10 hover:text-cyber-red transition-all duration-200 cursor-pointer flex items-center justify-center"
                onClick={(e) => {
                  if (!demoVideoUrl) {
                    e.preventDefault();
                    toast.error("No demo video URL provided");
                  }
                }}
              >
                <Video className="mr-2" /> Watch Demo
              </a>
            </div>
          )}

          {((isValidUrl(demoVideoUrl) && isValidUrl(configFileUrl)) || (isValidUrl(tutorialUrl) && isValidUrl(configFileUrl) && !isValidUrl(demoVideoUrl))) && (
            <Separator className="bg-cyber/10" />
          )}
          
          {isValidUrl(configFileUrl) && (
            <div className="group">
              <h3 className="text-lg mb-2 flex items-center gap-2 text-foreground tracking-wide">
                <Download className="text-cyber-blue" />
                Configuration Files
              </h3>
              <p className="text-muted-foreground text-sm mb-3">Project configuration templates and setup files</p>
              <a 
                href={configFileUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-6 font-medium border border-cyber-blue rounded-md text-center hover:bg-cyber-blue/10 hover:text-cyber-blue transition-all duration-200 cursor-pointer flex items-center justify-center"
                onClick={(e) => {
                  if (!configFileUrl) {
                    e.preventDefault();
                    toast.error("No configuration file URL provided");
                  }
                }}
              >
                <Download className="mr-2" /> Download Files
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
