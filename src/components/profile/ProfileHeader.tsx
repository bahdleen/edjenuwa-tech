
interface ProfileHeaderProps {
  title: string;
  subtitle: string;
}

export const ProfileHeader = ({ title, subtitle }: ProfileHeaderProps) => (
  <div className="space-y-2 text-center">
    <h1 className="text-5xl font-bold tracking-tight font-mono">
      <span className="text-cyber">&gt;</span> {title}
    </h1>
    <p className="text-muted-foreground text-xl">
      {subtitle}
    </p>
  </div>
);
