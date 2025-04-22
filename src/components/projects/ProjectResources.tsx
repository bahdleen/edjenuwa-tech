
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Youtube, ExternalLink, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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
      new URL(url); // This will throw an error if the URL is invalid
      return true;
    } catch (e) {
      return false;
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
              {isValidUrl(tutorialUrl) ? (
                <a 
                  href={tutorialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button 
                    className="w-full bg-gradient-to-r from-cyber/70 to-cyber text-cyber-dark hover:bg-cyber/90 font-mono group-hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all p-2 rounded flex items-center justify-center"
                  >
                    <FileText className="mr-2" /> View Documentation
                  </button>
                </a>
              ) : (
                <button 
                  className="w-full bg-gradient-to-r from-cyber/70 to-cyber text-cyber-dark hover:bg-cyber/90 font-mono group-hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all p-2 rounded flex items-center justify-center opacity-50 cursor-not-allowed"
                  onClick={() => toast.error("Documentation URL is invalid")}
                >
                  <FileText className="mr-2" /> View Documentation
                </button>
              )}
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
              {isValidUrl(demoVideoUrl) ? (
                <a 
                  href={demoVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button 
                    className="w-full border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10 font-mono group-hover:shadow-[0_0_15px_rgba(255,62,62,0.2)] transition-all p-2 rounded flex items-center justify-center border"
                  >
                    <ExternalLink className="mr-2" /> Watch Demo
                  </button>
                </a>
              ) : (
                <button 
                  className="w-full border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10 font-mono group-hover:shadow-[0_0_15px_rgba(255,62,62,0.2)] transition-all p-2 rounded flex items-center justify-center border opacity-50 cursor-not-allowed"
                  onClick={() => toast.error("Demo video URL is invalid")}
                >
                  <ExternalLink className="mr-2" /> Watch Demo
                </button>
              )}
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
              {isValidUrl(configFileUrl) ? (
                <a 
                  href={configFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button 
                    className="w-full border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 font-mono group-hover:shadow-[0_0_15px_rgba(62,142,255,0.2)] transition-all p-2 rounded flex items-center justify-center border"
                  >
                    <Download className="mr-2" /> Download ZIP
                  </button>
                </a>
              ) : (
                <button 
                  className="w-full border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 font-mono group-hover:shadow-[0_0_15px_rgba(62,142,255,0.2)] transition-all p-2 rounded flex items-center justify-center border opacity-50 cursor-not-allowed"
                  onClick={() => toast.error("Configuration file URL is invalid")}
                >
                  <Download className="mr-2" /> Download ZIP
                </button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
