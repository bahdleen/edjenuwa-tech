
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
  const { user } = useAuth();
  const form = useForm<EducationFormValues>();

  const { data: educations, refetch } = useQuery({
    queryKey: ['educations', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (data: EducationFormValues) => {
    try {
      const { error } = await supabase
        .from('education')
        .insert([
          {
            ...data,
            user_id: user?.id,
          },
        ]);

      if (error) throw error;

      toast.success("Education added successfully");
      form.reset();
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
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
            <Button type="submit">Add Education</Button>
          </form>
        </Form>

        {educations && educations.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="font-semibold">Current Education</h3>
            {educations.map((edu) => (
              <div key={edu.id} className="p-4 border rounded-lg">
                <h4 className="font-medium">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                <p className="text-sm">
                  {new Date(edu.start_date).toLocaleDateString()} - 
                  {edu.end_date ? new Date(edu.end_date).toLocaleDateString() : 'Present'}
                </p>
                {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
