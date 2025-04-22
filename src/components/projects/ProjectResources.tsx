
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Video, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProjectResourcesProps {
  tutorialUrl?: string | null;
  demoVideoUrl?: string | null;
  configFileUrl?: string | null;
}

export const ProjectResources = ({ tutorialUrl, demoVideoUrl, configFileUrl }: ProjectResourcesProps) => {
  // Don't render if no resources are available
  if (!tutorialUrl && !demoVideoUrl && !configFileUrl) {
    console.log("No resources available, not rendering ProjectResources");
    return null;
  }

  const isValidUrl = (url: string | null | undefined): boolean => {
    if (!url || url.trim() === '') {
      console.log(`URL is empty or null: ${url}`);
      return false;
    }
    try {
      new URL(url);
      console.log(`Valid URL: ${url}`);
      return true;
    } catch (e) {
      console.error(`Invalid URL: ${url}`, e);
      return false;
    }
  };

  const handleResourceClick = (url: string | null | undefined, type: string) => {
    if (!url) {
      console.error(`No URL provided for ${type}`);
      toast.error(`Could not open ${type.toLowerCase()}`);
      return;
    }
    
    try {
      // Validate URL before opening
      new URL(url);
      console.log(`Opening ${type} URL: ${url}`);
      
      // Force open in a new tab with all safeguards disabled
      const newWindow = window.open();
      if (newWindow) {
        newWindow.opener = null;
        newWindow.location.href = url;
      } else {
        // Fallback if popup is blocked
        window.location.href = url;
        console.log(`Redirecting to ${url} in current window (popup may be blocked)`);
      }
      
      // Track click for analytics if needed
      console.log(`Resource clicked: ${type}`);
    } catch (e) {
      console.error(`Error opening ${type} URL: ${url}`, e);
      toast.error(`Could not open ${type.toLowerCase()}: Invalid URL`);
    }
  };

  const hasValidTutorial = isValidUrl(tutorialUrl);
  const hasValidDemo = isValidUrl(demoVideoUrl);
  const hasValidConfig = isValidUrl(configFileUrl);

  console.log("Resource validation results:", {
    tutorialUrl,
    demoVideoUrl,
    configFileUrl,
    hasValidTutorial,
    hasValidDemo,
    hasValidConfig
  });

  // If no valid resources, don't render anything
  if (!hasValidTutorial && !hasValidDemo && !hasValidConfig) {
    console.log("No valid resources, not rendering ProjectResources");
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
