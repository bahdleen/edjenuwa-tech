
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type ProfileListItemProps = {
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description?: string;
  onEdit: () => void;
  onDelete: () => void;
};

export const ProfileListItem = ({
  title,
  organization,
  startDate,
  endDate,
  description,
  onEdit,
  onDelete,
}: ProfileListItemProps) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{organization}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm">
        {new Date(startDate).toLocaleDateString()} - 
        {endDate ? new Date(endDate).toLocaleDateString() : 'Present'}
      </p>
      {description && <p className="mt-2 text-sm">{description}</p>}
    </div>
  );
};
