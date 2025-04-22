
import React from 'react';
import { toast } from "sonner";

interface ProjectVideoProps {
  url: string;
}

export const ProjectVideo = ({ url }: ProjectVideoProps) => {
  const getVideoId = (url: string) => {
    if (!url) return '';
    
    try {
      // Create URL object for easy parsing
      const urlObj = new URL(url);
      
      // Standard YouTube URL patterns
      if (urlObj.hostname.includes('youtube.com')) {
        // Handle youtube.com/watch?v=VIDEO_ID
        const searchParams = new URLSearchParams(urlObj.search);
        const videoId = searchParams.get('v');
        if (videoId) return videoId;
        
        // Handle youtube.com/live/VIDEO_ID format
        if (urlObj.pathname.includes('/live/')) {
          const pathSegments = urlObj.pathname.split('/');
          const liveIndex = pathSegments.findIndex(seg => seg === 'live');
          if (liveIndex >= 0 && liveIndex < pathSegments.length - 1) {
            return pathSegments[liveIndex + 1];
          }
        }
        
        // Handle youtube.com/embed/VIDEO_ID
        if (urlObj.pathname.includes('/embed/')) {
          const pathSegments = urlObj.pathname.split('/');
          const embedIndex = pathSegments.findIndex(seg => seg === 'embed');
          if (embedIndex >= 0 && embedIndex < pathSegments.length - 1) {
            return pathSegments[embedIndex + 1];
          }
        }
      }
      
      // Handle youtu.be/VIDEO_ID format
      if (urlObj.hostname === 'youtu.be') {
        const pathSegments = urlObj.pathname.split('/');
        if (pathSegments.length > 1) {
          return pathSegments[1]; // The ID is after the first slash
        }
      }
      
      // If we couldn't extract the ID using parsed URL, try regex as fallback
      const regexPatterns = [
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
        /(?:youtube\.com\/(?:live\/|watch\?v=))([^"&?\/\s]{11})/,
        /(?:youtu\.be\/)([^"&?\/\s]{11})/
      ];

      for (const regex of regexPatterns) {
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
      }
      
      // Everything failed, log an error
      console.error("Could not extract video ID from URL:", url);
      return '';
    } catch (error) {
      console.error("Error parsing YouTube URL:", error);
      return '';
    }
  };

  const handleVideoError = () => {
    toast.error("Failed to load video. Please try again later.");
  };

  const videoId = getVideoId(url);
  
  if (!videoId) {
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block w-full"
      >
        <div className="aspect-video w-full cyber-border p-1 bg-cyber-dark flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer">
          <p className="text-muted-foreground">Click to watch video on YouTube</p>
        </div>
      </a>
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
