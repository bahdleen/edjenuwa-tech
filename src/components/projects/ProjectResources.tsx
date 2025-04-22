
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Video, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface ProjectResourcesProps {
  tutorialUrl?: string | null;
  demoVideoUrl?: string | null;
  configFileUrl?: string | null;
}

export const ProjectResources = ({ tutorialUrl, demoVideoUrl, configFileUrl }: ProjectResourcesProps) => {
  // Don't render if no resources are available
  if (!tutorialUrl && !demoVideoUrl && !configFileUrl) {
    return null;
  }

  const isValidUrl = (url: string | null | undefined): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleResourceClick = (url: string | null | undefined, type: string) => {
    if (!url) return;
    
    // Open the URL in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const hasValidTutorial = isValidUrl(tutorialUrl);
  const hasValidDemo = isValidUrl(demoVideoUrl);
  const hasValidConfig = isValidUrl(configFileUrl);

  // If no valid resources, don't render anything
  if (!hasValidTutorial && !hasValidDemo && !hasValidConfig) {
    return null;
  }

  return (
    <Card className="cyber-panel border-cyber/20 h-full bg-cyber-dark/60 backdrop-blur-sm">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 tracking-tight text-foreground">Project Resources</h2>
        
        <div className="space-y-6">
          {hasValidTutorial && (
            <div className="group">
              <h3 className="text-lg mb-2 flex items-center gap-2 text-foreground tracking-wide">
                <FileText className="text-cyber" />
                Documentation
              </h3>
              <p className="text-muted-foreground text-sm mb-3">Detailed technical guide with step-by-step instructions</p>
              <Button 
                variant="outline" 
                className="w-full py-8 h-auto text-lg font-medium border-cyber hover:bg-cyber/10 hover:text-cyber transition-all duration-200"
                onClick={() => handleResourceClick(tutorialUrl, 'Documentation')}
              >
                <FileText className="mr-2 h-6 w-6" /> View Documentation
              </Button>
            </div>
          )}
          
          {((hasValidTutorial && hasValidDemo) || 
            (hasValidTutorial && hasValidConfig) || 
            (hasValidDemo && hasValidConfig)) && (
            <Separator className="bg-cyber/10" />
          )}
          
          {hasValidDemo && (
            <div className="group">
              <h3 className="text-lg mb-2 flex items-center gap-2 text-foreground tracking-wide">
                <Video className="text-cyber-red" />
                Demo Video
              </h3>
              <p className="text-muted-foreground text-sm mb-3">Short demonstration of project capabilities</p>
              <Button 
                variant="outline" 
                className="w-full py-8 h-auto text-lg font-medium border-cyber-red hover:bg-cyber-red/10 hover:text-cyber-red transition-all duration-200"
                onClick={() => handleResourceClick(demoVideoUrl, 'Demo Video')}
              >
                <Video className="mr-2 h-6 w-6" /> Watch Demo
              </Button>
            </div>
          )}

          {((hasValidDemo && hasValidConfig) || 
            (hasValidTutorial && hasValidConfig && !hasValidDemo)) && (
            <Separator className="bg-cyber/10" />
          )}
          
          {hasValidConfig && (
            <div className="group">
              <h3 className="text-lg mb-2 flex items-center gap-2 text-foreground tracking-wide">
                <Download className="text-cyber-blue" />
                Configuration Files
              </h3>
              <p className="text-muted-foreground text-sm mb-3">Project configuration templates and setup files</p>
              <Button 
                variant="outline" 
                className="w-full py-8 h-auto text-lg font-medium border-cyber-blue hover:bg-cyber-blue/10 hover:text-cyber-blue transition-all duration-200"
                onClick={() => handleResourceClick(configFileUrl, 'Configuration Files')}
              >
                <Download className="mr-2 h-6 w-6" /> Download Files
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
