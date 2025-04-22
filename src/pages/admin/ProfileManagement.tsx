
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

type ProfileFormValues = {
  full_name: string;
  bio: string;
};

const ProfileManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      full_name: "",
      bio: "",
    },
  });

  // Fetch profile data
  const { data: profile, isLoading: profileLoading, refetch } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    },
    enabled: !!user,
  });

  // Set form values when profile data is loaded
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

  // Preview avatar image when selected
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

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    setLoading(true);
    try {
      let avatarUrl = profile?.avatar_url;
      let resumeUrl = profile?.resume_url;

      // Upload avatar if selected
      if (avatarFile) {
        const uploadedAvatarUrl = await uploadFile(avatarFile, 'profiles', 'avatars');
        if (uploadedAvatarUrl) avatarUrl = uploadedAvatarUrl;
      }

      // Upload resume if selected
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
      };

      if (profile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new profile
        const { error } = await supabase
          .from('profiles')
          .insert([profileData]);

        if (error) throw error;
      }

      toast.success("Profile updated successfully");
      refetch();
    } catch (error: any) {
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
            <p className="text-muted-foreground">Update your personal information</p>
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
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                        {avatarPreview ? (
                          <img 
                            src={avatarPreview} 
                            alt="Profile" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300">
                            No Photo
                          </div>
                        )}
                      </div>
                      <div>
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleAvatarChange}
                          className="max-w-xs"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Recommended: 400x400 square image
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Your name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="A short bio about yourself..." 
                              className="min-h-[150px]" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <FormLabel htmlFor="resume">Resume (PDF)</FormLabel>
                      <Input 
                        id="resume" 
                        type="file" 
                        accept=".pdf"
                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)} 
                      />
                      {profile?.resume_url && (
                        <p className="text-sm mt-1">
                          Current resume: <a href={profile.resume_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View</a>
                        </p>
                      )}
                    </div>

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
