
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ProjectDescriptionProps {
  description: string;
}

export const ProjectDescription = ({ description }: ProjectDescriptionProps) => {
  return (
    <Card className="cyber-panel border-cyber/30 backdrop-blur-sm bg-cyber-dark/60">
      <CardContent className="pt-8 px-8 pb-8">
        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-line text-lg">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
