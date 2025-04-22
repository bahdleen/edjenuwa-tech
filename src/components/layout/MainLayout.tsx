
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground",
      "flex flex-col dark",
      className
    )}>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
