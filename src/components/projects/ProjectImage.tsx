
import React from 'react';

interface ProjectImageProps {
  imageUrl: string | null;
  title: string;
}

export const ProjectImage = ({ imageUrl, title }: ProjectImageProps) => {
  if (!imageUrl) return null;
  
  return (
    <div className="cyber-border p-1 rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,255,0,0.1)]">
      <div className="rounded-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 via-cyber-dark/40 to-transparent z-10"></div>
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full object-cover max-h-[500px]"
        />
      </div>
    </div>
  );
};
