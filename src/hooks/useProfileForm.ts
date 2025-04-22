
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define valid table names that match the Supabase schema
type ValidTableName = 'work_experiences' | 'education' | 'certifications' | 'profiles' | 'projects';

type FormConfig = {
  tableName: ValidTableName;
  queryKey: string;
};

export function useProfileForm<T extends { id?: string }>(config: FormConfig) {
  const { user } = useAuth();
  const form = useForm<Omit<T, "id">>();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: items = [], refetch } = useQuery({
    queryKey: [config.queryKey, user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(config.tableName)
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) throw error;
      return (data || []) as T[];
    },
  });

  const onSubmit = async (data: Omit<T, "id">) => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from(config.tableName)
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
        toast.success(`${config.tableName} updated successfully`);
        setEditingId(null);
      } else {
        const { error } = await supabase
          .from(config.tableName)
          .insert([
            {
              ...data,
              user_id: user?.id,
            },
          ]);

        if (error) throw error;
        toast.success(`${config.tableName} added successfully`);
      }

      form.reset();
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (item: T) => {
    setEditingId(item.id);
    form.reset(item);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from(config.tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success(`${config.tableName} deleted successfully`);
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset();
  };

  return {
    form,
    items,
    editingId,
    onSubmit,
    handleEdit,
    handleDelete,
    handleCancel,
  };
}
