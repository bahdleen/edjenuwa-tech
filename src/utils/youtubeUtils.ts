
export const extractYoutubeVideoId = (url: string | null): string | null => {
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

export const isYouTubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

export const isDirectVideoUrl = (url: string): boolean => {
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
