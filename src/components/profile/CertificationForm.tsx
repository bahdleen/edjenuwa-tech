
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useProfileForm } from "@/hooks/useProfileForm";
import { ProfileFormFields } from "./shared/ProfileFormFields";
import { ProfileListItem } from "./shared/ProfileListItem";

type Certification = {
  id: string;
  title: string;
  organization: string;
  issue_date: string;
  expiry_date?: string;
  description?: string;
};

type CertificationFormValues = Omit<Certification, 'id'>;

export const CertificationForm = () => {
  const {
    form,
    items: certifications,
    editingId,
    onSubmit,
    handleEdit,
    handleDelete,
    handleCancel,
  } = useProfileForm<Certification>({
    tableName: 'certifications',
    queryKey: 'certifications',
  });

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{editingId ? 'Edit Certification' : 'Add Certification'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ProfileFormFields
              form={form}
              config={{
                titleField: "title",
                organizationField: "organization",
                startDateField: "issue_date",
                endDateField: "expiry_date",
                descriptionField: "description",
                labels: {
                  startDate: "Issue Date",
                  endDate: "Expiry Date",
                },
              }}
            />

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? 'Update Certification' : 'Add Certification'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>

        {certifications && certifications.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="font-semibold">Current Certifications</h3>
            {certifications.map((cert) => (
              <ProfileListItem
                key={cert.id}
                title={cert.title}
                organization={cert.organization}
                startDate={cert.issue_date}
                endDate={cert.expiry_date}
                description={cert.description}
                onEdit={() => handleEdit(cert)}
                onDelete={() => handleDelete(cert.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
