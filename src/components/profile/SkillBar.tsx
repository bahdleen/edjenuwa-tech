
import { LucideIcon } from "lucide-react";

interface SkillBarProps {
  label: string;
  percentage: number;
  icon?: React.ReactNode;
  color?: string;
}

export const SkillBar = ({ label, percentage, icon, color = "cyber" }: SkillBarProps) => {
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
