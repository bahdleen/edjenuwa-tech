
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectFormActionsProps {
  loading: boolean;
  isEditMode: boolean;
}

export const ProjectFormActions = ({ loading, isEditMode }: ProjectFormActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 justify-end pt-4 border-t border-cyber/10">
      <Button 
        type="button" 
        variant="outline"
        onClick={() => navigate("/admin/projects")}
        className="border-cyber/50 text-cyber hover:bg-cyber/10"
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={loading}
        className="bg-cyber text-cyber-dark hover:bg-cyber/90"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isEditMode ? "Updating..." : "Creating..."}
          </>
        ) : (
          isEditMode ? "Update Project" : "Create Project"
        )}
      </Button>
    </div>
  );
};
