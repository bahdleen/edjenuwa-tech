
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";

const About = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', 'public'],
    queryFn: async () => {
      // Fetch the first profile (since this is a personal portfolio)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    }
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-green-500">{">"}</span> About Me
            </h1>
            <p className="text-muted-foreground text-lg">
              Cybersecurity & Networking Engineer | AI Enthusiast
            </p>
          </div>

          {isLoading ? (
            <div className="py-10 text-center">
              <p className="text-muted-foreground">Loading profile information...</p>
            </div>
          ) : profile ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-10">
                  {profile.avatar_url ? (
                    <div className="rounded-lg overflow-hidden mb-6">
                      <img 
                        src={profile.avatar_url} 
                        alt={profile.full_name || "Profile"} 
                        className="w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square rounded-lg bg-gray-800 flex items-center justify-center mb-6">
                      <span className="text-gray-400 text-lg">No image available</span>
                    </div>
                  )}
                  
                  {profile.resume_url && (
                    <Button className="w-full" asChild>
                      <a href={profile.resume_url} target="_blank" rel="noreferrer">
                        <Download className="mr-2" /> Download Resume
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">{profile.full_name || "About Me"}</h2>
                    <div className="prose prose-invert max-w-none">
                      {profile.bio ? (
                        <p className="whitespace-pre-line">{profile.bio}</p>
                      ) : (
                        <p>Bio information will be added soon.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">Profile information is being updated. Check back soon!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
