
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface DirectVideoProps {
  url: string;
  onError: () => void;
  hasError: boolean;
  onDirectClick: () => void;
}

export const DirectVideo = ({ url, onError, hasError, onDirectClick }: DirectVideoProps) => {
  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-cyber-dark">
        <Button 
          variant="outline"
          onClick={onDirectClick}
          className="mt-4 border-cyber-red hover:bg-cyber-red/10"
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
    </div>
  );
};
