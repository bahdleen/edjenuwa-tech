
import React from 'react';
import { toast } from "sonner";

interface ProjectVideoProps {
  url: string;
}

export const ProjectVideo = ({ url }: ProjectVideoProps) => {
  const getVideoId = (url: string) => {
    const regexPatterns = [
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      /(?:youtube\.com\/(?:live\/|watch\?v=))([^"&?\/\s]{11})/,
      /(?:youtube\.com\/(?:live))\/([^"&?\/\s]{11})/,
      /(?:youtu\.be\/)([^"&?\/\s]{11})/
    ];

    for (const regex of regexPatterns) {
      const match = url.match(regex);
      if (match && match[1]) {
        return match[1];
      }
    }

    // Extract video ID from YouTube live URL format
    if (url.includes('youtube.com/live/')) {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const videoIdIndex = pathParts.findIndex(part => part === 'live') + 1;
      if (videoIdIndex < pathParts.length) {
        const possibleId = pathParts[videoIdIndex].split('?')[0];
        if (possibleId && possibleId.length >= 11) {
          return possibleId;
        }
      }
    }

    console.log("Could not extract video ID from URL:", url);
    return '';
  };

  const handleVideoError = () => {
    toast.error("Failed to load video. Please try again later.");
  };

  const videoId = getVideoId(url);
  
  if (!videoId) {
    console.error("Invalid YouTube URL or could not extract video ID:", url);
    return (
      <div 
        onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
        className="aspect-video w-full cyber-border p-1 bg-cyber-dark flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
      >
        <p className="text-muted-foreground">Click to watch video on YouTube</p>
      </div>
    );
  }
  
  return (
    <div className="aspect-video w-full cyber-border p-1 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-sm"
        onError={handleVideoError}
      ></iframe>
    </div>
  );
};
