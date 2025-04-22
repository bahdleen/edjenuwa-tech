
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProjectFormHeader = ({ isEditMode }: { isEditMode: boolean }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight">
        <span className="text-cyber">&gt;</span> {isEditMode ? "Edit" : "Create"} Project
      </h1>
      <p className="text-muted-foreground">
        {isEditMode ? "Update your project details" : "Add a new project to your portfolio"}
      </p>
    </div>
  );
};
