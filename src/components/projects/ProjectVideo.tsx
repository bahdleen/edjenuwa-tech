
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { extractYoutubeVideoId, isYouTubeUrl, isDirectVideoUrl } from '@/utils/youtubeUtils';
import { YouTubeEmbed } from './video/YouTubeEmbed';
import { DirectVideo } from './video/DirectVideo';
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";

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

  const handleExternalClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      // Make sure to use a properly formed URL
      const safeUrl = isYouTubeUrl(url) 
        ? url 
        : `https://www.youtube.com/watch?v=${videoId}`;
      
      console.log("Opening external link:", safeUrl);
      
      // Force open in a new window with no opener relationship
      const newWindow = window.open();
      if (newWindow) {
        newWindow.opener = null;
        newWindow.location.href = safeUrl;
        console.log("Opened in new window:", safeUrl);
      } else {
        // Fallback to direct navigation if popup is blocked
        window.location.href = safeUrl;
        console.log("Redirecting to URL in current window (popup may be blocked):", safeUrl);
      }
    } catch (error) {
      console.error("Error opening external link:", error);
      toast.error("Failed to open video link");
    }
  };

  const handleDirectYouTubeLink = () => {
    if (!videoId) {
      toast.error("Invalid YouTube video");
      return;
    }
    
    try {
      const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
      console.log("Opening direct YouTube link:", youtubeUrl);
      window.location.href = youtubeUrl;
    } catch (error) {
      console.error("Error opening YouTube link:", error);
      toast.error("Failed to open YouTube video");
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
      <YouTubeEmbed
        videoId={videoId}
        url={url}
        onError={() => {
          console.error("YouTube iframe error");
          setVideoError(true);
          toast.error("Failed to load YouTube video");
        }}
        onDirectClick={handleDirectYouTubeLink}
      />
    );
  }
  
  // For YouTube URLs without extractable ID (fallback)
  if (isYouTubeUrl(url) && !videoId) {
    console.log("Rendering YouTube fallback link");
    return (
      <div className="aspect-video w-full cyber-border p-1 bg-cyber-dark">
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-8">
          <ExternalLink className="text-cyber h-16 w-16" />
          <span className="text-lg text-muted-foreground">Click to watch video on YouTube</span>
          <Button 
            variant="outline"
            onClick={() => {
              window.location.href = url;
            }}
            className="mt-4 border-cyber hover:bg-cyber/10"
          >
            Open YouTube Video
          </Button>
        </div>
      </div>
    );
  }
  
  // For direct video files
  if (isDirectVideoUrl(url)) {
    console.log("Rendering direct video player");
    return (
      <DirectVideo
        url={url}
        hasError={videoError}
        onError={() => {
          console.error("Direct video error");
          setVideoError(true);
          toast.error("Failed to load video");
        }}
        onDirectClick={() => {
          window.location.href = url;
        }}
      />
    );
  }
  
  // Fallback for any other URL type
  console.log("Rendering generic video link fallback");
  return (
    <div className="aspect-video w-full cyber-border p-1 bg-cyber-dark">
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-8">
        <Play className="text-cyber-red h-16 w-16" />
        <span className="text-lg text-muted-foreground">Click to watch video</span>
        <Button 
          variant="outline"
          onClick={() => {
            window.location.href = url;
          }}
          className="mt-4 border-cyber-red hover:bg-cyber-red/10"
        >
          Open Video
        </Button>
      </div>
    </div>
  );
};
