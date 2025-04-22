
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { ProfileAvatarUpload } from "@/components/profile/ProfileAvatarUpload";
import { ProfileFormFields } from "@/components/profile/ProfileFormFields";
import { ProfileResumeUpload } from "@/components/profile/ProfileResumeUpload";
import { useFileUpload } from "@/hooks/useFileUpload";

type ProfileFormValues = {
  full_name: string;
  bio: string;
};

const ProfileManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { uploadFile } = useFileUpload();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      full_name: "",
      bio: "",
    },
  });

  const { data: profile, isLoading: profileLoading, refetch } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
      });
      
      if (profile.avatar_url) {
        setAvatarPreview(profile.avatar_url);
      }
    }
  }, [profile, form]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    setLoading(true);
    try {
      let avatarUrl = profile?.avatar_url;
      let resumeUrl = profile?.resume_url;

      if (avatarFile) {
        const uploadedAvatarUrl = await uploadFile(avatarFile, 'profiles', 'avatars');
        if (uploadedAvatarUrl) avatarUrl = uploadedAvatarUrl;
      }

      if (resumeFile) {
        const uploadedResumeUrl = await uploadFile(resumeFile, 'profiles', 'resumes');
        if (uploadedResumeUrl) resumeUrl = uploadedResumeUrl;
      }

      const profileData = {
        user_id: user.id,
        full_name: data.full_name,
        bio: data.bio,
        avatar_url: avatarUrl,
        resume_url: resumeUrl,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
      refetch();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-green-500">{">"}</span> Profile Management
            </h1>
            <p className="text-muted-foreground">Update your personal information displayed on the About page</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {profileLoading ? (
                <div className="text-center py-4">Loading profile data...</div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <ProfileAvatarUpload 
                      avatarPreview={avatarPreview} 
                      onAvatarChange={handleAvatarChange}
                    />
                    
                    <ProfileFormFields form={form} />
                    
                    <ProfileResumeUpload
                      onResumeChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      currentResumeUrl={profile?.resume_url}
                    />

                    <div className="flex gap-4 justify-end">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => navigate("/admin")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Profile"}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileManagement;
