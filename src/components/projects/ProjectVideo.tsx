
import React, { useState, useEffect } from 'react';
import { ExternalLink, Play } from "lucide-react";
import { toast } from "sonner";

interface ProjectVideoProps {
  url: string;
}

export const ProjectVideo = ({ url }: ProjectVideoProps) => {
  const [videoError, setVideoError] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  
  useEffect(() => {
    if (url) {
      try {
        console.log("Processing video URL:", url);
        const id = extractYoutubeVideoId(url);
        console.log("Extracted YouTube video ID:", id);
        setVideoId(id);
      } catch (error) {
        console.error("Error processing video URL:", error);
        setVideoId(null);
      }
    }
  }, [url]);

  // Extract YouTube video ID from various URL formats
  const extractYoutubeVideoId = (url: string): string | null => {
    if (!url) {
      console.log("No URL provided to extract YouTube ID");
      return null;
    }
    
    try {
      console.log("Attempting to extract YouTube ID from:", url);
      
      // Handle youtu.be URLs
      if (url.includes('youtu.be')) {
        const segments = new URL(url).pathname.split('/');
        const id = segments[segments.length - 1].split('?')[0];
        console.log("Extracted ID from youtu.be URL:", id);
        return id;
      }
      
      // Handle youtube.com/watch?v= format
      if (url.includes('youtube.com/watch')) {
        const id = new URL(url).searchParams.get('v');
        console.log("Extracted ID from youtube.com/watch URL:", id);
        return id;
      }
      
      // Handle youtube.com/live/ format
      if (url.includes('youtube.com/live/')) {
        const match = url.match(/youtube\.com\/live\/([^?&]+)/);
        const id = match?.[1] || null;
        console.log("Extracted ID from youtube.com/live URL:", id);
        return id;
      }
      
      // Handle youtube.com/embed/ format
      if (url.includes('youtube.com/embed/')) {
        const match = url.match(/youtube\.com\/embed\/([^?&]+)/);
        const id = match?.[1] || null;
        console.log("Extracted ID from youtube.com/embed URL:", id);
        return id;
      }
      
      console.log("No YouTube ID extraction pattern matched");
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
      const isVideoFile = path.endsWith('.mp4') || path.endsWith('.webm') || 
                         path.endsWith('.mov') || path.endsWith('.avi') || 
                         path.endsWith('.mkv');
      const isStorageUrl = urlObj.hostname.includes('storage.googleapis.com') || 
                          urlObj.hostname.includes('supabase');
      
      console.log("Direct video URL check:", { 
        url, 
        isVideoFile, 
        isStorageUrl, 
        result: isVideoFile || isStorageUrl 
      });
      
      return isVideoFile || isStorageUrl;
    } catch (error) {
      console.error("Error checking if direct video URL:", error);
      return false;
    }
  };

  if (!url) {
    console.log("No video URL provided");
    return <div className="aspect-video w-full bg-cyber-dark flex items-center justify-center">No video available</div>;
  }

  // For YouTube videos with valid ID
  if (videoId && isYouTubeUrl(url)) {
    console.log("Rendering YouTube iframe with ID:", videoId);
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
          onError={() => {
            console.error("YouTube iframe error");
            setVideoError(true);
            toast.error("Failed to load YouTube video");
          }}
        ></iframe>
      </div>
    );
  }
  
  // For YouTube URLs without extractable ID (fallback)
  if (isYouTubeUrl(url) && !videoId) {
    console.log("Rendering YouTube fallback link");
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
    console.log("Rendering direct video player");
    return (
      <div className="aspect-video w-full cyber-border p-1 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
        {!videoError ? (
          <video
            src={url}
            controls
            className="w-full h-full rounded-sm"
            controlsList="nodownload"
            onError={() => {
              console.error("Direct video error");
              setVideoError(true);
              toast.error("Failed to load video");
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
  console.log("Rendering generic video link fallback");
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
