
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface YouTubeEmbedProps {
  videoId: string;
  url: string;
  onError: () => void;
  onDirectClick: () => void;
}

export const YouTubeEmbed = ({ videoId, url, onError, onDirectClick }: YouTubeEmbedProps) => {
  const handleDirectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      console.log("Opening YouTube link directly:", url);
      // Force browser to open the link directly
      const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
      
      // Try window.open first with fallbacks
      const newWindow = window.open(youtubeUrl, '_blank');
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        console.log("Popup blocked, trying location.href as fallback");
        // Fallback if popup is blocked
        window.location.href = youtubeUrl;
        return;
      }
      
      // Ensure opener is null for security
      if (newWindow) {
        newWindow.opener = null;
      }
      
      toast.success("Opening YouTube in new tab");
    } catch (error) {
      console.error("Failed to open YouTube link:", error);
      toast.error("Failed to open YouTube link");
      // Fallback to the parent component's handler
      onDirectClick();
    }
  };

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
        <a 
          href={`https://www.youtube.com/watch?v=${videoId}`}
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
            <ExternalLink className="mr-2 h-4 w-4" /> 
            Open directly in YouTube
          </Button>
        </a>
      </div>
    </div>
  );
};
