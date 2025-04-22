import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Briefcase, Award, Shield, Network, Code, Cpu } from "lucide-react";
import { TimelineItem } from "./TimelineItem";

interface ProfileContentProps {
  profile: any;
}

export const ProfileContent = ({ profile }: ProfileContentProps) => (
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
            title="Network Security Engineer"
            organization="MSV Sport"
            date="2023 – Present"
            icon={<Shield className="text-cyber-red" />}
            description="Implemented advanced network security protocols and led security audits for enterprise clients."
          />
          <TimelineItem 
            title="Network Engineer"
            organization="EEW Technology"
            date="2019 – 2022"
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
            title="B.Sc. in Cybersecurity"
            organization="Teesside University, Middlesbrough"
            date="2022 – 2026"
            icon={<Code className="text-cyber" />}
            description="Specialized in network security and penetration testing."
          />
          <TimelineItem 
            title="National Diploma in Computer Science"
            organization="Biacom Ventures"
            date="2017 – 2019"
            icon={<Cpu className="text-cyber" />}
            description="Focused on computer networks and systems programming."
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
            title="Teesside University Summer Program (Ethical Hacking)"
            organization=""
            date=""
            icon={<Shield className="text-cyber-red" />}
          />
          <TimelineItem 
            title="Azure Fundamentals (AZ-900)"
            organization=""
            date=""
            icon={<Network className="text-cyber-blue" />}
          />
          <TimelineItem 
            title="Azure Fundamentals (SC-900)"
            organization=""
            date=""
            icon={<Code className="text-cyber" />}
          />
        </div>
      </section>
    </div>
  </div>
);
