import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Download, BookOpen, Briefcase, Award, Shield, Database, Code, Cpu, Network } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const About = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', 'public'],
    queryFn: async () => {
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
      <div className="bg-cyber-dark-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight font-mono">
                <span className="text-cyber">//</span> About Me
              </h1>
              <p className="text-muted-foreground text-lg">
                Cybersecurity Professional | Network Engineer | AI Specialist
              </p>
            </div>

            {isLoading ? (
              <div className="py-10 text-center cyber-panel border-cyber/30">
                <p className="text-muted-foreground">Loading profile information...</p>
              </div>
            ) : profile ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="sticky top-10">
                    <div className="w-full max-w-xs mx-auto mb-6">
                      <div className="rounded-full overflow-hidden border-4 border-cyber/30 shadow-lg">
                        <Avatar className="w-full h-full">
                          <AvatarImage 
                            src={profile.avatar_url || "/placeholder.svg"} 
                            alt={profile.full_name || "Profile"}
                            className="object-cover w-full h-full"
                          />
                          <AvatarFallback className="bg-cyber-dark border border-cyber/30 flex items-center justify-center">
                            <UserRound className="w-1/2 h-1/2 text-cyber/50" />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    
                    {profile.resume_url && (
                      <Button className="w-full bg-cyber text-cyber-dark hover:bg-cyber/90" asChild>
                        <a href={profile.resume_url} target="_blank" rel="noreferrer">
                          <Download className="mr-2" /> Download Resume
                        </a>
                      </Button>
                    )}

                    <div className="mt-6 cyber-panel border-cyber/30 p-4">
                      <h3 className="font-mono text-lg font-bold mb-3 text-white">Skills</h3>
                      <div className="space-y-3">
                        <SkillBar label="Network Security" percentage={95} icon={<Network size={16} className="text-cyber-blue" />} color="cyber-blue" />
                        <SkillBar label="Penetration Testing" percentage={90} icon={<Shield size={16} className="text-cyber-red" />} color="cyber-red" />
                        <SkillBar label="System Architecture" percentage={85} icon={<Database size={16} className="text-cyber" />} color="cyber" />
                        <SkillBar label="Security Protocols" percentage={92} icon={<Shield size={16} className="text-cyber" />} color="cyber" />
                        <SkillBar label="AI Integration" percentage={80} icon={<Cpu size={16} className="text-cyber-red" />} color="cyber-red" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Card className="cyber-panel border-cyber/30 mb-8">
                    <CardContent className="pt-6">
                      <h2 className="text-2xl font-bold mb-4 font-mono">{profile.full_name || "About Me"}</h2>
                      <div className="prose prose-invert max-w-none">
                        {profile.bio ? (
                          <p className="whitespace-pre-line">{profile.bio}</p>
                        ) : (
                          <p>
                            Cybersecurity expert with over 8 years of experience in securing network infrastructure and implementing 
                            AI-driven security solutions. Specializing in vulnerability assessment, penetration testing, and developing 
                            secure architectural designs for enterprise environments.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-6">
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="text-cyber" />
                        <h2 className="text-2xl font-bold font-mono">Work Experience</h2>
                      </div>
                      <div className="space-y-4">
                        <TimelineItem 
                          title="Senior Network Security Engineer"
                          organization="Tech Security Solutions"
                          date="2020 - Present"
                          icon={<Shield className="text-cyber-red" />}
                          description="Implemented advanced network security protocols and led security audits for enterprise clients."
                        />
                        <TimelineItem 
                          title="Network Engineer"
                          organization="Global Networks Inc."
                          date="2018 - 2020"
                          icon={<Network className="text-cyber-blue" />}
                          description="Designed and managed network infrastructure for mid-sized businesses."
                        />
                      </div>
                    </section>
                    
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="text-cyber" />
                        <h2 className="text-2xl font-bold font-mono">Education</h2>
                      </div>
                      <div className="space-y-4">
                        <TimelineItem 
                          title="M.S. in Cybersecurity"
                          organization="Tech University"
                          date="2016 - 2018"
                          icon={<Code className="text-cyber" />}
                          description="Specialized in network security and penetration testing."
                        />
                        <TimelineItem 
                          title="B.S. in Computer Science"
                          organization="State University"
                          date="2012 - 2016"
                          icon={<Cpu className="text-cyber" />}
                          description="Focus on computer networks and systems programming."
                        />
                      </div>
                    </section>
                    
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="text-cyber" />
                        <h2 className="text-2xl font-bold font-mono">Certifications</h2>
                      </div>
                      <div className="space-y-4">
                        <TimelineItem 
                          title="Certified Information Systems Security Professional (CISSP)"
                          organization="ISC²"
                          date="2019"
                          icon={<Shield className="text-cyber-red" />}
                        />
                        <TimelineItem 
                          title="Cisco Certified Network Professional (CCNP)"
                          organization="Cisco"
                          date="2018"
                          icon={<Network className="text-cyber-blue" />}
                        />
                        <TimelineItem 
                          title="Certified Ethical Hacker (CEH)"
                          organization="EC-Council"
                          date="2017"
                          icon={<Code className="text-cyber" />}
                        />
                      </div>
                    </section>
                  </div>
                </div>
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

const SkillBar = ({ 
  label, 
  percentage, 
  icon,
  color = "cyber"
}: { 
  label: string; 
  percentage: number;
  icon?: React.ReactNode;
  color?: string;
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {icon}
          <span className="text-sm font-mono">{label}</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">{percentage}%</span>
      </div>
      <div className={`h-[3px] w-full bg-cyber-dark rounded-full overflow-hidden`}>
        <div 
          className={`h-full bg-${color} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const TimelineItem = ({ 
  title, 
  organization, 
  date, 
  description,
  icon
}: { 
  title: string; 
  organization: string; 
  date: string; 
  description?: string;
  icon?: React.ReactNode;
}) => (
  <div className="border-l-2 border-cyber/20 pl-4 pb-2 relative">
    <div className="absolute left-[-9px] top-0 rounded-full bg-cyber-dark p-[2px] border border-cyber/30">
      {icon || <div className="w-3 h-3 rounded-full bg-cyber"></div>}
    </div>
    <h3 className="font-bold text-lg font-mono">{title}</h3>
    <p className="text-cyber">{organization}</p>
    <p className="text-sm text-muted-foreground mb-2 font-mono">{date}</p>
    {description && <p className="text-muted-foreground">{description}</p>}
  </div>
);

export default About;
