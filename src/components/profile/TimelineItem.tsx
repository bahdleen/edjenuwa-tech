
interface TimelineItemProps {
  title: string;
  organization: string;
  date: string;
  description?: string;
  icon?: React.ReactNode;
}

export const TimelineItem = ({ title, organization, date, description, icon }: TimelineItemProps) => (
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
