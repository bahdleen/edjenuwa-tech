
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
  const handleDirectClick = () => {
    try {
      console.log("Opening direct video link:", url);
      
      // Direct navigation approach
      window.location.href = url;
      
      toast.success("Opening video");
    } catch (error) {
      console.error("Failed to open direct video link:", error);
      toast.error("Failed to open video link");
      onDirectClick();
    }
  };

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-cyber-dark">
        <Button 
          variant="outline"
          className="mt-4 border-cyber-red hover:bg-cyber-red/10"
          onClick={handleDirectClick}
        >
          <Play className="mr-2 h-6 w-6 text-cyber-red" />
          Download/View Video
        </Button>
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
        <Button 
          variant="outline" 
          size="sm" 
          className="border-cyber-red hover:bg-cyber-red/10 hover:text-cyber-red"
          onClick={handleDirectClick}
        >
          <Play className="mr-2 h-4 w-4" /> 
          Open Video in New Tab
        </Button>
      </div>
    </div>
  );
};
