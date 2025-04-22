
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { toast } from "sonner";

interface DirectVideoProps {
  url: string;
  onError: () => void;
  hasError: boolean;
  onDirectClick: () => void;
}

export const DirectVideo = ({ url, onError, hasError, onDirectClick }: DirectVideoProps) => {
  const handleDirectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      console.log("Opening direct video link:", url);
      
      // Try window.open first with fallbacks
      const newWindow = window.open(url, '_blank');
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        console.log("Popup blocked, trying location.href as fallback");
        // Fallback if popup is blocked
        window.location.href = url;
        return;
      }
      
      // Ensure opener is null for security
      if (newWindow) {
        newWindow.opener = null;
      }
      
      toast.success("Opening video in new tab");
    } catch (error) {
      console.error("Failed to open direct video link:", error);
      toast.error("Failed to open video link");
      // Fallback to the parent component's handler
      onDirectClick();
    }
  };

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-cyber-dark">
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDirectClick}
          className="inline-block"
        >
          <Button 
            variant="outline"
            className="mt-4 border-cyber-red hover:bg-cyber-red/10"
          >
            <Play className="mr-2 h-6 w-6 text-cyber-red" />
            Download/View Video
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full cyber-border p-1 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
      <video
        src={url}
        controls
        className="w-full h-full rounded-sm"
        controlsList="nodownload"
        onError={onError}
      >
        Your browser does not support the video tag.
      </video>
      <div className="mt-2 text-center">
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDirectClick}
          className="inline-block"
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="border-cyber-red hover:bg-cyber-red/10 hover:text-cyber-red"
          >
            <Play className="mr-2 h-4 w-4" /> 
            Open Video in New Tab
          </Button>
        </a>
      </div>
    </div>
  );
};
