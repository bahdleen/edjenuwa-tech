
import React, { useState, useEffect } from 'react';
import { ExternalLink, Play } from "lucide-react";

interface ProjectVideoProps {
  url: string;
}

export const ProjectVideo = ({ url }: ProjectVideoProps) => {
  const [videoError, setVideoError] = useState(false);
  const [videoId, setVideoId] = useState<string>('');
  
  useEffect(() => {
    if (url) {
      const id = getVideoId(url);
      setVideoId(id);
      console.log("YouTube video ID extracted:", id, "from URL:", url);
    }
  }, [url]);

  const getVideoId = (url: string) => {
    if (!url) return '';
    
    try {
      // Check if it's a YouTube URL
      const urlObj = new URL(url);
      
      // Standard YouTube URL patterns
      if (urlObj.hostname.includes('youtube.com')) {
        // Handle youtube.com/watch?v=VIDEO_ID
        const searchParams = new URLSearchParams(urlObj.search);
        const id = searchParams.get('v');
        if (id) return id;
        
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
      console.error("Invalid YouTube URL:", url, error);
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
      console.error("Invalid direct video URL:", url, error);
      return false;
    }
  };

  // Handle empty URL case
  if (!url || url.trim() === '') {
    console.log("No video URL provided");
    return (
      <div className="aspect-video w-full cyber-border p-1 bg-cyber-dark flex items-center justify-center">
        <span className="text-muted-foreground">No video available</span>
      </div>
    );
  }

  console.log("Rendering video component with URL:", url);
  
  // If it's a YouTube video with valid ID, embed it
  if (videoId && isYouTubeUrl(url)) {
    console.log("Embedding YouTube video with ID:", videoId);
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
  
  // For direct video files
  if (isDirectVideoUrl(url)) {
    console.log("Rendering direct video file:", url);
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
            <Play className="text-cyber-red h-16 w-16 mb-4" />
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg text-muted-foreground hover:text-cyber underline"
              onClick={(e) => {
                console.log("Fallback video link clicked");
              }}
            >
              Click to download video
            </a>
          </div>
        )}
      </div>
    );
  }
  
  // For other types of links (fallback)
  console.log("Rendering fallback video link UI for:", url);
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block w-full h-full cursor-pointer"
      onClick={(e) => {
        console.log("External video link clicked:", url);
        e.preventDefault();
        window.open(url, '_blank', 'noopener,noreferrer');
      }}
    >
      <div className="aspect-video w-full cyber-border p-1 bg-cyber-dark">
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4 hover:bg-cyber-dark/80 p-8">
          {isYouTubeUrl(url) ? (
            <>
              <ExternalLink className="text-cyber h-16 w-16" />
              <span className="text-lg text-muted-foreground">Click to watch video on YouTube</span>
            </>
          ) : (
            <>
              <Play className="text-cyber-red h-16 w-16" />
              <span className="text-lg text-muted-foreground">Click to watch demo video</span>
            </>
          )}
        </div>
      </div>
    </a>
  );
};
