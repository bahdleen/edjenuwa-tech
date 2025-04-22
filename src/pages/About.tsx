
import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Download, BookOpen, Briefcase, Award, Shield, Database, Code, Cpu, Network, UserRound } from "lucide-react";
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
      <div className="bg-gradient-to-b from-cyber-dark to-cyber-dark-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="space-y-2 text-center">
              <h1 className="text-5xl font-bold tracking-tight font-mono">
                <span className="text-cyber">&gt;</span> About Me
              </h1>
              <p className="text-muted-foreground text-xl">
                Cybersecurity Professional | Network Engineer | AI Specialist
              </p>
            </div>

            {isLoading ? (
              <div className="py-10 text-center cyber-panel border-cyber/30">
                <p className="text-muted-foreground">Loading profile information...</p>
              </div>
            ) : profile ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-1">
                  <div className="sticky top-10">
                    <div className="mx-auto mb-8 flex justify-center">
                      <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-cyber shadow-[0_0_15px_rgba(0,255,0,0.3)]">
                        <Avatar className="w-full h-full">
                          <AvatarImage 
                            src={profile.avatar_url || "/placeholder.svg"} 
                            alt={profile.full_name || "Profile"}
                            className="object-cover w-full h-full"
                          />
                          <AvatarFallback className="bg-cyber-dark border border-cyber/30 flex items-center justify-center">
                            <UserRound className="w-1/3 h-1/3 text-cyber/50" />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    
                    {profile.resume_url && (
                      <Button className="w-full bg-cyber text-cyber-dark hover:bg-cyber/90 my-4" asChild>
                        <a href={profile.resume_url} target="_blank" rel="noreferrer">
                          <Download className="mr-2" /> Download Resume
                        </a>
                      </Button>
                    )}

                    <div className="mt-6 cyber-panel border-cyber/30 p-6 backdrop-blur-sm bg-cyber-dark/70">
                      <h3 className="font-mono text-xl font-bold mb-5 text-white border-b border-cyber/30 pb-2">Technical Skills</h3>
                      <div className="space-y-5">
                        <SkillBar label="Network Security" percentage={95} icon={<Network size={18} className="text-cyber-blue" />} color="cyber-blue" />
                        <SkillBar label="Penetration Testing" percentage={90} icon={<Shield size={18} className="text-cyber-red" />} color="cyber-red" />
                        <SkillBar label="System Architecture" percentage={85} icon={<Database size={18} className="text-cyber" />} color="cyber" />
                        <SkillBar label="Security Protocols" percentage={92} icon={<Shield size={18} className="text-cyber" />} color="cyber" />
                        <SkillBar label="AI Integration" percentage={80} icon={<Cpu size={18} className="text-cyber-red" />} color="cyber-red" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Card className="cyber-panel border-cyber/30 mb-10 backdrop-blur-sm bg-cyber-dark/70 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber/20 via-cyber to-cyber/20"></div>
                    <CardContent className="pt-8 px-8 pb-6">
                      <h2 className="text-3xl font-bold mb-6 font-mono">{profile.full_name || "About Me"}</h2>
                      <div className="prose prose-invert max-w-none">
                        {profile.bio ? (
                          <p className="whitespace-pre-line text-lg">{profile.bio}</p>
                        ) : (
                          <p className="text-lg">
                            Cybersecurity expert with over 8 years of experience in securing network infrastructure and implementing 
                            AI-driven security solutions. Specializing in vulnerability assessment, penetration testing, and developing 
                            secure architectural designs for enterprise environments.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-10">
                    <section>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-full bg-cyber-dark/70 border border-cyber/20">
                          <Briefcase className="text-cyber" size={22} />
                        </div>
                        <h2 className="text-2xl font-bold font-mono">Work Experience</h2>
                      </div>
                      <div className="space-y-6 backdrop-blur-sm bg-cyber-dark/30 p-6 rounded-md border border-cyber/10">
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
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-full bg-cyber-dark/70 border border-cyber/20">
                          <BookOpen className="text-cyber" size={22} />
                        </div>
                        <h2 className="text-2xl font-bold font-mono">Education</h2>
                      </div>
                      <div className="space-y-6 backdrop-blur-sm bg-cyber-dark/30 p-6 rounded-md border border-cyber/10">
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
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-full bg-cyber-dark/70 border border-cyber/20">
                          <Award className="text-cyber" size={22} />
                        </div>
                        <h2 className="text-2xl font-bold font-mono">Certifications</h2>
                      </div>
                      <div className="space-y-6 backdrop-blur-sm bg-cyber-dark/30 p-6 rounded-md border border-cyber/10">
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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-mono">{label}</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">{percentage}%</span>
      </div>
      <div className="h-[4px] w-full bg-cyber-dark-blue rounded-full overflow-hidden border border-white/5">
        <div 
          className={`h-full bg-${color} rounded-full shadow-[0_0_5px_rgba(0,255,0,0.5)]`}
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
  <div className="border-l-2 border-cyber/20 pl-6 pb-2 relative hover:border-cyber transition-colors duration-300">
    <div className="absolute left-[-9px] top-1 rounded-full bg-cyber-dark p-[2px] border border-cyber/30 shadow-[0_0_5px_rgba(0,255,0,0.3)]">
      {icon || <div className="w-3 h-3 rounded-full bg-cyber"></div>}
    </div>
    <h3 className="font-bold text-xl font-mono">{title}</h3>
    <p className="text-cyber">{organization}</p>
    <p className="text-sm text-muted-foreground mb-3 font-mono">{date}</p>
    {description && <p className="text-muted-foreground">{description}</p>}
  </div>
);

export default About;
