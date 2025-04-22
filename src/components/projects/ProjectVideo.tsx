
import React from 'react';
import { toast } from "sonner";
import { ExternalLink, Play } from "lucide-react";

interface ProjectVideoProps {
  url: string;
}

export const ProjectVideo = ({ url }: ProjectVideoProps) => {
  const getVideoId = (url: string) => {
    if (!url) return '';
    
    try {
      // Check if it's a YouTube URL first
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
      
      return '';
    } catch (error) {
      console.error("Error parsing YouTube URL:", error);
      return '';
    }
  };

  const isYouTubeUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be';
    } catch (error) {
      return false;
    }
  };

  const isDirectVideoUrl = (url: string) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname.toLowerCase();
      return path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.mov') || 
             path.endsWith('.avi') || path.endsWith('.mkv') || 
             urlObj.hostname.includes('storage.googleapis.com') || 
             urlObj.hostname.includes('supabase');
    } catch (error) {
      return false;
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error("No video URL provided");
      return;
    }

    try {
      // Open the video in a new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error("Error opening video:", error);
      toast.error("Failed to open video");
    }
  };

  const videoId = getVideoId(url);
  
  // If it's a YouTube video with valid ID, embed it
  if (videoId && isYouTubeUrl(url)) {
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
        ></iframe>
      </div>
    );
  }
  
  // For direct video files, provide a clickable link
  if (isDirectVideoUrl(url)) {
    return (
      <div 
        onClick={handleVideoClick}
        className="aspect-video w-full cyber-border p-1 bg-cyber-dark flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Play className="text-cyber-red h-8 w-8" />
          <p className="text-muted-foreground">Click to watch demo video</p>
        </div>
      </div>
    );
  }
  
  // For non-YouTube videos or invalid YouTube URLs
  return (
    <div 
      onClick={handleVideoClick}
      className="aspect-video w-full cyber-border p-1 bg-cyber-dark flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        {isYouTubeUrl(url) ? (
          <>
            <ExternalLink className="text-cyber h-6 w-6" />
            <p className="text-muted-foreground">Click to watch video on YouTube</p>
          </>
        ) : (
          <>
            <Play className="text-cyber-red h-6 w-6" />
            <p className="text-muted-foreground">Click to watch demo video</p>
          </>
        )}
      </div>
    </div>
  );
};
