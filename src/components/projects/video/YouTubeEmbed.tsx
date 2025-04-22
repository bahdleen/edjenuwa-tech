
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  url: string;
  onError: () => void;
  onDirectClick: () => void;
}

export const YouTubeEmbed = ({ videoId, url, onError, onDirectClick }: YouTubeEmbedProps) => {
  return (
    <div className="aspect-video w-full cyber-border p-1 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-sm"
        onError={onError}
      ></iframe>
      
      <div className="mt-2 text-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDirectClick}
          className="border-cyber-red hover:bg-cyber-red/10 hover:text-cyber-red"
        >
          <ExternalLink className="mr-2 h-4 w-4" /> 
          Open directly in YouTube
        </Button>
      </div>
    </div>
  );
};
