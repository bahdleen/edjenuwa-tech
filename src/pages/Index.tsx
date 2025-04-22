import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Lock, Server, Database, Network, Terminal, UserRound, Youtube, FileText, ExternalLink, Eye } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Index = () => {
  const { user } = useAuth();
  
  const { data: profile } = useQuery({
    queryKey: ['profile', 'home'],
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

  const { data: featuredProjects } = useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  const categoryIcons: Record<string, React.ReactNode> = {
    "Cybersecurity": <Shield size={16} className="text-cyber-red" />,
    "Networking": <Network size={16} className="text-cyber-blue" />,
    "AI": <Terminal size={16} className="text-cyber" />
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="relative py-24 bg-cyber-dark overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className="absolute h-px bg-cyber/30 w-full" 
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `-100%`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              >
                <div className="animate-data-flow w-20 h-full bg-cyber/60"></div>
              </div>
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyber/30 shadow-lg">
                  <Avatar className="w-full h-full">
                    <AvatarImage 
                      src={profile?.avatar_url || "/placeholder.svg"} 
                      alt={profile?.full_name || "Profile Picture"}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="bg-cyber-dark border border-cyber/30">
                      <UserRound className="w-1/2 h-1/2 text-cyber/50" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="space-y-4 text-center md:text-left">
                  <div className="inline-block px-3 py-1 text-xs font-mono bg-cyber-dark border border-cyber rounded-sm text-cyber mb-2">
                    SECURITY SPECIALIST
                  </div>
                  <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight">
                    <span className="text-cyber animate-pulse-glow">ANTHONY E.</span> <br />
                    <span className="text-white">EDJENUWA</span>
                  </h1>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="outline" className="border-cyber bg-cyber-dark/50 text-cyber font-mono">
                      <Lock size={12} className="mr-1" /> CYBERSECURITY
                    </Badge>
                    <Badge variant="outline" className="border-cyber-accent bg-cyber-dark/50 text-cyber-accent font-mono">
                      <Network size={12} className="mr-1" /> NETWORKING
                    </Badge>
                    <Badge variant="outline" className="border-cyber-red bg-cyber-dark/50 text-cyber-red font-mono">
                      <Terminal size={12} className="mr-1" /> AI
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg">
                  {profile?.bio || "Cybersecurity professional specializing in network infrastructure protection and AI-driven security analytics. Focused on developing defensive systems against emerging threats."}
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button asChild size="lg" className="bg-cyber text-cyber-dark hover:bg-cyber/90 border-cyber">
                    <Link to="/projects">
                      View Projects <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="lg" className="border-cyber text-cyber hover:bg-cyber/10">
                    <Link to="/about">About Me</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      {featuredProjects && featuredProjects.length > 0 && (
        <div className="py-24 bg-cyber-dark relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="absolute h-px bg-cyber/20 w-full" 
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `-100%`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              >
                <div className="animate-data-flow w-20 h-full bg-cyber/40"></div>
              </div>
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight font-mono text-center">
                  <span className="text-cyber">//</span> Featured Projects
                </h2>
                <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto">
                  Recent security solutions and network implementations
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                  <Link 
                    key={project.id} 
                    to={`/projects/${project.id}`}
                    className="group transition-all duration-300"
                  >
                    <Card className="cyber-panel h-full bg-gradient-to-br from-cyber-dark-blue to-cyber-dark border-cyber/30 hover:border-cyber group-hover:shadow-[0_0_30px_rgba(0,255,0,0.1)] transition-all duration-500">
                      {project.image_url && (
                        <div className="aspect-video w-full overflow-hidden border-b border-cyber/20 relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/60 to-transparent opacity-90 z-10 transition-opacity group-hover:opacity-70"></div>
                          <img 
                            src={project.image_url} 
                            alt={project.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute bottom-4 left-4 z-20">
                            <Badge variant="outline" className={`
                              ${project.category === "Cybersecurity" ? "border-cyber-red bg-cyber-dark/50 text-cyber-red" : ""}
                              ${project.category === "Networking" ? "border-cyber-blue bg-cyber-dark/50 text-cyber-blue" : ""}
                              ${project.category === "AI" ? "border-cyber bg-cyber-dark/50 text-cyber" : ""}
                              font-mono text-xs px-2 py-1
                            `}>
                              {categoryIcons[project.category]}
                              <span className="ml-1">{project.category}</span>
                            </Badge>
                          </div>
                        </div>
                      )}
                      <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-bold font-mono group-hover:text-cyber transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 text-sm">
                          {project.description}
                        </p>
                        <div className="pt-2 flex items-center justify-between">
                          <div className="flex gap-2">
                            {project.youtube_url && (
                              <div className="p-1.5 rounded-full bg-cyber-dark/70 border border-cyber-red/40">
                                <Youtube size={14} className="text-cyber-red" />
                              </div>
                            )}
                            {project.config_file_url && (
                              <div className="p-1.5 rounded-full bg-cyber-dark/70 border border-cyber/40">
                                <FileText size={14} className="text-cyber" />
                              </div>
                            )}
                            {project.demo_video_url && (
                              <div className="p-1.5 rounded-full bg-cyber-dark/70 border border-cyber-blue/40">
                                <ExternalLink size={14} className="text-cyber-blue" />
                              </div>
                            )}
                          </div>
                          <Eye size={16} className="text-cyber opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              <div className="text-center">
                <Button asChild size="lg" className="bg-cyber text-cyber-dark hover:bg-cyber/90 font-mono">
                  <Link to="/projects">
                    View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

        <div className="py-16 bg-cyber-dark-blue">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-mono text-white">
                  <span className="text-cyber">//</span> Security Specializations
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Expert services in cybersecurity, network infrastructure, and AI implementation
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="cyber-panel border-cyber/30 hover:border-cyber transition-all duration-300">
                  <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                    <Shield className="h-12 w-12 mb-4 text-cyber" />
                    <h3 className="text-xl font-bold mb-2 font-mono">Security Analysis</h3>
                    <p className="text-muted-foreground">Comprehensive vulnerability scanning and penetration testing to identify security weaknesses</p>
                  </CardContent>
                </Card>
                
                <Card className="cyber-panel border-cyber-blue/30 hover:border-cyber-blue transition-all duration-300">
                  <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                    <Network className="h-12 w-12 mb-4 text-cyber-blue" />
                    <h3 className="text-xl font-bold mb-2 font-mono">Network Architecture</h3>
                    <p className="text-muted-foreground">Design and implementation of secure, scalable networking infrastructure</p>
                  </CardContent>
                </Card>
                
                <Card className="cyber-panel border-cyber-red/30 hover:border-cyber-red transition-all duration-300">
                  <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                    <Terminal className="h-12 w-12 mb-4 text-cyber-red" />
                    <h3 className="text-xl font-bold mb-2 font-mono">AI Security</h3>
                    <p className="text-muted-foreground">Implementation of AI-driven security monitoring and threat detection systems</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
