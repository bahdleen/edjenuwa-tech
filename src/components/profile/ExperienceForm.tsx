import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";

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
  const { user } = useAuth();
  const form = useForm<ExperienceFormValues>();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: experiences, refetch } = useQuery({
    queryKey: ['work-experiences', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('work_experiences')
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (data: ExperienceFormValues) => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('work_experiences')
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
        toast.success("Work experience updated successfully");
        setEditingId(null);
      } else {
        const { error } = await supabase
          .from('work_experiences')
          .insert([
            {
              ...data,
              user_id: user?.id,
            },
          ]);

        if (error) throw error;
        toast.success("Work experience added successfully");
      }

      form.reset();
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (experience: WorkExperience) => {
    setEditingId(experience.id);
    form.reset({
      title: experience.title,
      organization: experience.organization,
      start_date: experience.start_date,
      end_date: experience.end_date,
      description: experience.description,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('work_experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Work experience deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset();
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{editingId ? 'Edit Work Experience' : 'Add Work Experience'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
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
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Update Experience' : 'Add Experience'}</Button>
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
              <div key={exp.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{exp.title}</h4>
                    <p className="text-sm text-muted-foreground">{exp.organization}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(exp)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm">
                  {new Date(exp.start_date).toLocaleDateString()} - 
                  {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
                </p>
                {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
