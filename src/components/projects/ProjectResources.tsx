
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

  // Validate URL
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

  // Handle resource access with validation
  const handleResourceClick = (url: string | null | undefined, resourceType: string) => {
    if (!url) {
      toast.error(`No ${resourceType} URL provided`);
      return;
    }

    try {
      // Open URL in new tab to view/download the resource
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error(`Error opening ${resourceType}:`, error);
      toast.error(`Failed to open ${resourceType}`);
    }
  };

  return (
    <Card className="cyber-panel border-cyber/20 h-full bg-cyber-dark/60 backdrop-blur-sm">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold font-mono mb-6">Project Resources</h2>
        
        <div className="space-y-6">
          {isValidUrl(tutorialUrl) && (
            <div className="group">
              <h3 className="text-lg font-mono mb-2 flex items-center gap-2">
                <FileText className="text-cyber" />
                Technical Documentation
              </h3>
              <p className="text-muted-foreground text-sm mb-3">Detailed technical guide with step-by-step instructions</p>
              <button 
                onClick={() => handleResourceClick(tutorialUrl, 'documentation')}
                className="block w-full py-2 text-center rounded-md bg-gradient-to-r from-cyber/70 to-cyber text-cyber-dark hover:bg-cyber/90 font-mono group-hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all"
              >
                <span className="flex items-center justify-center">
                  <FileText className="mr-2" /> View Documentation
                </span>
              </button>
            </div>
          )}
          
          {((isValidUrl(tutorialUrl) && isValidUrl(demoVideoUrl)) || (isValidUrl(tutorialUrl) && isValidUrl(configFileUrl)) || (isValidUrl(demoVideoUrl) && isValidUrl(configFileUrl))) && (
            <Separator className="bg-cyber/10" />
          )}
          
          {isValidUrl(demoVideoUrl) && (
            <div className="group">
              <h3 className="text-lg font-mono mb-2 flex items-center gap-2">
                <Video className="text-cyber-red" />
                Demo Video
              </h3>
              <p className="text-muted-foreground text-sm mb-3 font-medium">Short demonstration of project capabilities</p>
              <button 
                onClick={() => handleResourceClick(demoVideoUrl, 'demo video')}
                className="block w-full py-2 text-center rounded-md border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10 font-mono group-hover:shadow-[0_0_15px_rgba(255,62,62,0.2)] transition-all border"
              >
                <span className="flex items-center justify-center">
                  <Video className="mr-2" /> Watch Demo
                </span>
              </button>
            </div>
          )}

          {((isValidUrl(demoVideoUrl) && isValidUrl(configFileUrl)) || (isValidUrl(tutorialUrl) && isValidUrl(configFileUrl) && !isValidUrl(demoVideoUrl))) && (
            <Separator className="bg-cyber/10" />
          )}
          
          {isValidUrl(configFileUrl) && (
            <div className="group">
              <h3 className="text-lg font-mono mb-2 flex items-center gap-2">
                <Download className="text-cyber-blue" />
                Configuration Files
              </h3>
              <p className="text-muted-foreground text-sm mb-3">Project configuration templates and setup files</p>
              <button 
                onClick={() => handleResourceClick(configFileUrl, 'configuration file')}
                className="block w-full py-2 text-center rounded-md border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 font-mono group-hover:shadow-[0_0_15px_rgba(62,142,255,0.2)] transition-all border"
              >
                <span className="flex items-center justify-center">
                  <Download className="mr-2" /> Download Files
                </span>
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
