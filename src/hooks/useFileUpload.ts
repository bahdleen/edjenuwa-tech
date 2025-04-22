
import { supabase } from "@/integrations/supabase/client";

export const useFileUpload = () => {
  const uploadFile = async (file: File, bucket: string, path: string) => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${path}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  return { uploadFile };
};
