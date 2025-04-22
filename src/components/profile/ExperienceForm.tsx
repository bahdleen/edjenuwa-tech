
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useProfileForm } from "@/hooks/useProfileForm";
import { ProfileFormFields } from "./shared/ProfileFormFields";
import { ProfileListItem } from "./shared/ProfileListItem";

type WorkExperience = {
  id: string;
  title: string;
  organization: string;
  start_date: string;
  end_date?: string;
  description?: string;
};

type ExperienceFormValues = Omit<WorkExperience, 'id'>;

export const ExperienceForm = () => {
  const {
    form,
    items: experiences,
    editingId,
    onSubmit,
    handleEdit,
    handleDelete,
    handleCancel,
  } = useProfileForm<WorkExperience>({
    tableName: 'work_experiences',
    queryKey: 'work-experiences',
  });

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{editingId ? 'Edit Experience' : 'Add Experience'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ProfileFormFields
              form={form}
              config={{
                titleField: "title",
                organizationField: "organization",
                startDateField: "start_date",
                endDateField: "end_date",
                descriptionField: "description",
              }}
            />

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? 'Update Experience' : 'Add Experience'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>

        {experiences && experiences.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="font-semibold">Current Experiences</h3>
            {experiences.map((exp) => (
              <ProfileListItem
                key={exp.id}
                title={exp.title}
                organization={exp.organization}
                startDate={exp.start_date}
                endDate={exp.end_date}
                description={exp.description}
                onEdit={() => handleEdit(exp)}
                onDelete={() => handleDelete(exp.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
