
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ProfileFormFieldsProps = {
  form: UseFormReturn<any>;
  config: {
    titleField: string;
    organizationField: string;
    startDateField: string;
    endDateField: string;
    descriptionField?: string;
    labels?: {
      title?: string;
      organization?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
    };
  };
};

export const ProfileFormFields = ({ form, config }: ProfileFormFieldsProps) => {
  const labels = {
    title: config.labels?.title || "Title",
    organization: config.labels?.organization || "Organization",
    startDate: config.labels?.startDate || "Start Date",
    endDate: config.labels?.endDate || "End Date",
    description: config.labels?.description || "Description",
  };

  return (
    <>
      <FormField
        control={form.control}
        name={config.titleField}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{labels.title}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name={config.organizationField}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{labels.organization}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={config.startDateField}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labels.startDate}</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={config.endDateField}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labels.endDate}</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {config.descriptionField && (
        <FormField
          control={form.control}
          name={config.descriptionField}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labels.description}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};
