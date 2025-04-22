
import React, { useState, useEffect } from 'react';
import { ExternalLink, Play } from "lucide-react";

interface ProjectVideoProps {
  url: string;
}

export const ProjectVideo = ({ url }: ProjectVideoProps) => {
  const [videoError, setVideoError] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  
  useEffect(() => {
    if (url) {
      const id = extractYoutubeVideoId(url);
      console.log("Extracted YouTube ID:", id, "from URL:", url);
      setVideoId(id);
    }
  }, [url]);

  // Extract YouTube video ID from various URL formats
  const extractYoutubeVideoId = (url: string): string | null => {
    if (!url) return null;
    
    try {
      // Handle youtu.be URLs
      if (url.includes('youtu.be')) {
        const segments = new URL(url).pathname.split('/');
        return segments[segments.length - 1];
      }
      
      // Handle youtube.com/watch?v= format
      if (url.includes('youtube.com/watch')) {
        return new URL(url).searchParams.get('v');
      }
      
      // Handle youtube.com/live/ format
      if (url.includes('youtube.com/live/')) {
        const match = url.match(/youtube\.com\/live\/([^?&]+)/);
        return match?.[1] || null;
      }
      
      // Handle youtube.com/embed/ format
      if (url.includes('youtube.com/embed/')) {
        const match = url.match(/youtube\.com\/embed\/([^?&]+)/);
        return match?.[1] || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error parsing YouTube URL:", error);
      return null;
    }
  };

  const isYouTubeUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const isDirectVideoUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname.toLowerCase();
      return path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.mov') || 
             path.endsWith('.avi') || path.endsWith('.mkv') || 
             urlObj.hostname.includes('storage.googleapis.com') || 
             urlObj.hostname.includes('supabase');
    } catch (error) {
      console.error("Error checking if direct video URL:", error);
      return false;
    }
  };

  if (!url) {
    return <div className="aspect-video w-full bg-cyber-dark flex items-center justify-center">No video available</div>;
  }

  // For YouTube videos with valid ID
  if (videoId && isYouTubeUrl(url)) {
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
        ></iframe>
      </div>
    );
  }
  
  // For YouTube URLs without extractable ID (fallback)
  if (isYouTubeUrl(url) && !videoId) {
    return (
      <div className="aspect-video w-full cyber-border p-1 bg-cyber-dark">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full h-full flex flex-col items-center justify-center space-y-4 hover:bg-cyber-dark/80 p-8 block"
        >
          <ExternalLink className="text-cyber h-16 w-16" />
          <span className="text-lg text-muted-foreground">Click to watch video on YouTube</span>
        </a>
      </div>
    );
  }
  
  // For direct video files
  if (isDirectVideoUrl(url)) {
    return (
      <div className="aspect-video w-full cyber-border p-1 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
        {!videoError ? (
          <video
            src={url}
            controls
            className="w-full h-full rounded-sm"
            controlsList="nodownload"
            onError={() => {
              console.error("Video failed to load:", url);
              setVideoError(true);
            }}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-cyber-dark">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center space-y-4"
            >
              <Play className="text-cyber-red h-16 w-16" />
              <span className="text-lg text-muted-foreground hover:text-cyber underline">
                Click to download video
              </span>
            </a>
          </div>
        )}
      </div>
    );
  }
  
  // Fallback for any other URL type
  return (
    <div className="aspect-video w-full cyber-border p-1 bg-cyber-dark">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full h-full flex flex-col items-center justify-center space-y-4 hover:bg-cyber-dark/80 p-8 block"
      >
        <Play className="text-cyber-red h-16 w-16" />
        <span className="text-lg text-muted-foreground">Click to watch video</span>
      </a>
    </div>
  );
};
