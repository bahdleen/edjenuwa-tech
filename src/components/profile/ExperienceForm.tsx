
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
      form.reset();
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
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
            <Button type="submit">Add Experience</Button>
          </form>
        </Form>

        {experiences && experiences.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="font-semibold">Current Experiences</h3>
            {experiences.map((exp) => (
              <div key={exp.id} className="p-4 border rounded-lg">
                <h4 className="font-medium">{exp.title}</h4>
                <p className="text-sm text-muted-foreground">{exp.organization}</p>
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
