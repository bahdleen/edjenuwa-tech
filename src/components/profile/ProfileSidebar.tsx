import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Download, Network, Shield, Database, Cpu, UserRound } from "lucide-react";
import { SkillBar } from "./SkillBar";

interface ProfileSidebarProps {
  profile: any;
}

export const ProfileSidebar = ({ profile }: ProfileSidebarProps) => (
  <div className="sticky top-10">
    <div className="mx-auto mb-8 flex justify-center">
      <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-cyber shadow-[0_0_15px_rgba(0,255,0,0.3)]">
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
);
