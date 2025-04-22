
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
  const { user } = useAuth();
  const form = useForm<CertificationFormValues>();
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const { data: certifications, refetch } = useQuery({
    queryKey: ['certifications', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('issue_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (data: CertificationFormValues) => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('certifications')
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
        toast.success("Certification updated successfully");
        setEditingId(null);
      } else {
        const { error } = await supabase
          .from('certifications')
          .insert([
            {
              ...data,
              user_id: user?.id,
            },
          ]);

        if (error) throw error;
        toast.success("Certification added successfully");
      }

      form.reset();
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (certification: Certification) => {
    setEditingId(certification.id);
    form.reset({
      title: certification.title,
      organization: certification.organization,
      issue_date: certification.issue_date,
      expiry_date: certification.expiry_date,
      description: certification.description,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Certification deleted successfully");
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
        <CardTitle>{editingId ? 'Edit Certification' : 'Add Certification'}</CardTitle>
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
                name="issue_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
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
              <Button type="submit">{editingId ? 'Update Certification' : 'Add Certification'}</Button>
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
              <div key={cert.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">{cert.organization}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(cert)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(cert.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm">
                  Issued: {new Date(cert.issue_date).toLocaleDateString()}
                  {cert.expiry_date && ` - Expires: ${new Date(cert.expiry_date).toLocaleDateString()}`}
                </p>
                {cert.description && <p className="mt-2 text-sm">{cert.description}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
