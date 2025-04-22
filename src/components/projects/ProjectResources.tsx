
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Youtube, ExternalLink, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ProjectResourcesProps {
  tutorialUrl?: string | null;
  demoVideoUrl?: string | null;
  configFileUrl?: string | null;
}

export const ProjectResources = ({ tutorialUrl, demoVideoUrl, configFileUrl }: ProjectResourcesProps) => {
  if (!tutorialUrl && !demoVideoUrl && !configFileUrl) return null;

  // Validate URLs to ensure they're usable
  const isValidUrl = (url: string | null | undefined): boolean => {
    if (!url || url.trim() === '') return false;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleExternalLink = (url: string | null | undefined, actionName: string) => {
    if (isValidUrl(url)) {
      // Open in new tab
      window.open(url as string, '_blank', 'noopener,noreferrer');
    } else {
      toast.error(`Invalid ${actionName} URL`);
    }
  };

  return (
    <Card className="cyber-panel border-cyber/20 h-full bg-cyber-dark/60 backdrop-blur-sm">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold font-mono mb-6">Project Resources</h2>
        
        <div className="space-y-6">
          {tutorialUrl && (
            <div className="group">
              <h3 className="text-lg font-mono mb-2 flex items-center gap-2">
                <FileText className="text-cyber" />
                Technical Documentation
              </h3>
              <p className="text-muted-foreground text-sm mb-3">Detailed technical guide with step-by-step instructions</p>
              <Button 
                className="w-full bg-gradient-to-r from-cyber/70 to-cyber text-cyber-dark hover:bg-cyber/90 font-mono group-hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all"
                onClick={() => handleExternalLink(tutorialUrl, 'documentation')}
              >
                <FileText className="mr-2" /> View Documentation
              </Button>
            </div>
          )}
          
          {((tutorialUrl && demoVideoUrl) || (tutorialUrl && configFileUrl) || (demoVideoUrl && configFileUrl)) && (
            <Separator className="bg-cyber/10" />
          )}
          
          {demoVideoUrl && (
            <div className="group">
              <h3 className="text-lg font-mono mb-2 flex items-center gap-2">
                <Youtube className="text-cyber-red" />
                Demo Video
              </h3>
              <p className="text-muted-foreground text-sm mb-3 font-medium">Short demonstration of project capabilities</p>
              <Button 
                className="w-full border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10 font-mono group-hover:shadow-[0_0_15px_rgba(255,62,62,0.2)] transition-all border"
                variant="outline"
                onClick={() => handleExternalLink(demoVideoUrl, 'demo video')}
              >
                <ExternalLink className="mr-2" /> Watch Demo
              </Button>
            </div>
          )}

          {((demoVideoUrl && configFileUrl) || (tutorialUrl && configFileUrl && !demoVideoUrl)) && (
            <Separator className="bg-cyber/10" />
          )}
          
          {configFileUrl && (
            <div className="group">
              <h3 className="text-lg font-mono mb-2 flex items-center gap-2">
                <Download className="text-cyber-blue" />
                Configuration Files
              </h3>
              <p className="text-muted-foreground text-sm mb-3">Project configuration templates and setup files</p>
              <Button 
                className="w-full border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 font-mono group-hover:shadow-[0_0_15px_rgba(62,142,255,0.2)] transition-all border"
                variant="outline"
                onClick={() => handleExternalLink(configFileUrl, 'configuration file')}
              >
                <Download className="mr-2" /> Download ZIP
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
