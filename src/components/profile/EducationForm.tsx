
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useProfileForm } from "@/hooks/useProfileForm";
import { ProfileFormFields } from "./shared/ProfileFormFields";
import { ProfileListItem } from "./shared/ProfileListItem";

type Education = {
  id: string;
  degree: string;
  institution: string;
  start_date: string;
  end_date?: string;
  description?: string;
};

type EducationFormValues = Omit<Education, 'id'>;

export const EducationForm = () => {
  const {
    form,
    items: educations,
    editingId,
    onSubmit,
    handleEdit,
    handleDelete,
    handleCancel,
  } = useProfileForm<Education>({
    tableName: 'education',
    queryKey: 'educations',
  });

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{editingId ? 'Edit Education' : 'Add Education'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ProfileFormFields
              form={form}
              config={{
                titleField: "degree",
                organizationField: "institution",
                startDateField: "start_date",
                endDateField: "end_date",
                descriptionField: "description",
                labels: {
                  title: "Degree",
                  organization: "Institution",
                },
              }}
            />

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? 'Update Education' : 'Add Education'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>

        {educations && educations.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="font-semibold">Current Education</h3>
            {educations.map((edu) => (
              <ProfileListItem
                key={edu.id}
                title={edu.degree}
                organization={edu.institution}
                startDate={edu.start_date}
                endDate={edu.end_date}
                description={edu.description}
                onEdit={() => handleEdit(edu)}
                onDelete={() => handleDelete(edu.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
