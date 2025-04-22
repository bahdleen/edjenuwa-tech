
import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileContent } from '@/components/profile/ProfileContent';
import { toast } from "sonner";

const About = () => {
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ['profile', 'public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      // Return first profile or default fallback data
      return data?.length > 0 ? data[0] : {
        full_name: "Anthony E. Edjenuwa",
        avatar_url: null,
        bio: "Cybersecurity expert with over 8 years of experience in securing network infrastructure and implementing AI-driven security solutions. Specializing in vulnerability assessment, penetration testing, and developing secure architectural designs for enterprise environments.",
      };
    }
  });

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-cyber-dark to-cyber-dark-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-10">
            <ProfileHeader 
              title="About Me" 
              subtitle="Cybersecurity Professional | Network Engineer | AI Specialist" 
            />

            {isLoading ? (
              <div className="py-10 text-center cyber-panel border-cyber/30">
                <p className="text-muted-foreground">Loading profile information...</p>
              </div>
            ) : isError ? (
              <Card className="cyber-panel border-cyber/30">
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">Error loading profile information. Please try again later.</p>
                </CardContent>
              </Card>
            ) : profile ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-1">
                  <ProfileSidebar profile={profile} />
                </div>
                <ProfileContent profile={profile} />
              </div>
            ) : (
              <Card className="cyber-panel border-cyber/30">
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">Profile information is being updated. Check back soon!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
