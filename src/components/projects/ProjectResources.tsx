
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Video, Download, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface ProjectResourcesProps {
  tutorialUrl?: string | null;
  demoVideoUrl?: string | null;
  configFileUrl?: string | null;
}

export const ProjectResources = ({ tutorialUrl, demoVideoUrl, configFileUrl }: ProjectResourcesProps) => {
  // Don't render if no resources are available
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

  const handleTutorialClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log("Documentation link clicked", tutorialUrl);
    // For PDF or MD files, let browser handle download
    if (tutorialUrl?.includes('.pdf') || tutorialUrl?.includes('.md')) {
      // Don't prevent default to allow download
      console.log("Downloading documentation");
    } else {
      // For other types, open in new tab
      e.preventDefault();
      console.log("Opening documentation in new tab");
      window.open(tutorialUrl, '_blank');
    }
  };

  const handleDemoVideoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log("Demo video link clicked", demoVideoUrl);
    e.preventDefault();
    window.open(demoVideoUrl, '_blank');
  };

  const handleConfigFileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log("Config file link clicked", configFileUrl);
    // Let browser handle download behavior
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
                download={tutorialUrl?.includes('.pdf') || tutorialUrl?.includes('.md')}
                onClick={handleTutorialClick}
              >
                <Button 
                  variant="outline" 
                  className="w-full py-8 h-auto text-lg font-medium border-cyber hover:bg-cyber/10 hover:text-cyber transition-all duration-200"
                  type="button"
                >
                  <FileText className="mr-2 h-6 w-6" /> View Documentation
                </Button>
              </a>
            </div>
          )}
          
          {((isValidUrl(tutorialUrl) && isValidUrl(demoVideoUrl)) || 
            (isValidUrl(tutorialUrl) && isValidUrl(configFileUrl)) || 
            (isValidUrl(demoVideoUrl) && isValidUrl(configFileUrl))) && (
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
                onClick={handleDemoVideoClick}
              >
                <Button 
                  variant="outline" 
                  className="w-full py-8 h-auto text-lg font-medium border-cyber-red hover:bg-cyber-red/10 hover:text-cyber-red transition-all duration-200"
                  type="button"
                >
                  <Video className="mr-2 h-6 w-6" /> Watch Demo
                </Button>
              </a>
            </div>
          )}

          {((isValidUrl(demoVideoUrl) && isValidUrl(configFileUrl)) || 
            (isValidUrl(tutorialUrl) && isValidUrl(configFileUrl) && !isValidUrl(demoVideoUrl))) && (
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
                download
                onClick={handleConfigFileClick}
              >
                <Button 
                  variant="outline" 
                  className="w-full py-8 h-auto text-lg font-medium border-cyber-blue hover:bg-cyber-blue/10 hover:text-cyber-blue transition-all duration-200"
                  type="button"
                >
                  <Download className="mr-2 h-6 w-6" /> Download Files
                </Button>
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
