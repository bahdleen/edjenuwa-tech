
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectHeaderProps {
  title: string;
}

export const ProjectHeader = ({ title }: ProjectHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => navigate('/projects')}
        className="border-cyber/50 text-cyber hover:bg-cyber/10"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to Projects
      </Button>
      <h1 className="text-5xl font-bold tracking-tight mt-4 font-mono">
        <span className="text-cyber">&gt;</span> {title}
      </h1>
    </div>
  );
};
