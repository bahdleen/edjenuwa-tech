
import React, { useState, useEffect } from 'react';
import { ExternalLink, Play } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
      
      // Direct navigation approach
      window.location.href = youtubeUrl;
    } catch (error) {
      console.error("Error opening YouTube link:", error);
      toast.error("Failed to open YouTube video");
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
        
        {/* Added dedicated button to directly open YouTube */}
        <div className="mt-2 text-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDirectYouTubeLink}
            className="border-cyber-red hover:bg-cyber-red/10 hover:text-cyber-red"
          >
            <ExternalLink className="mr-2 h-4 w-4" /> 
            Open directly in YouTube
          </Button>
        </div>
      </div>
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
              // Direct navigation
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
            <Button 
              variant="outline"
              onClick={() => {
                // Direct navigation
                window.location.href = url;
              }}
              className="mt-4 border-cyber-red hover:bg-cyber-red/10"
            >
              <Play className="mr-2 h-6 w-6 text-cyber-red" />
              Download/View Video
            </Button>
          </div>
        )}
      </div>
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
            // Direct navigation
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
