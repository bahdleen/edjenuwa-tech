
import { Button } from "@/components/ui/button";
import { Shield, Network, Terminal } from "lucide-react";

type ProjectFiltersProps = {
  currentFilter: string | null;
  onFilterChange: (filter: string | null) => void;
};

export const ProjectFilters = ({ currentFilter, onFilterChange }: ProjectFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button 
        variant={currentFilter === null ? "default" : "outline"} 
        onClick={() => onFilterChange(null)}
        className={currentFilter === null ? "bg-cyber text-cyber-dark" : "border-cyber text-cyber hover:bg-cyber/10"}
        size="lg"
      >
        All Projects
      </Button>
      <Button 
        variant={currentFilter === "Cybersecurity" ? "default" : "outline"} 
        onClick={() => onFilterChange("Cybersecurity")}
        className={currentFilter === "Cybersecurity" ? "bg-cyber-red text-white" : "border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10"}
        size="lg"
      >
        <Shield size={18} className="mr-2" /> Cybersecurity
      </Button>
      <Button 
        variant={currentFilter === "Networking" ? "default" : "outline"} 
        onClick={() => onFilterChange("Networking")}
        className={currentFilter === "Networking" ? "bg-cyber-blue text-white" : "border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"}
        size="lg"
      >
        <Network size={18} className="mr-2" /> Networking
      </Button>
      <Button 
        variant={currentFilter === "AI" ? "default" : "outline"} 
        onClick={() => onFilterChange("AI")}
        className={currentFilter === "AI" ? "bg-cyber text-cyber-dark" : "border-cyber/50 text-cyber hover:bg-cyber/10"}
        size="lg"
      >
        <Terminal size={18} className="mr-2" /> AI
      </Button>
    </div>
  );
};
