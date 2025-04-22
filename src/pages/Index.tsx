
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-green-500">{">"}</span> Welcome to my Portfolio
            </h1>
            <p className="text-muted-foreground text-lg">
              Cybersecurity | Networking | AI
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Explore my projects and experiences in cybersecurity, networking, and artificial intelligence.
            </p>
            
            <div className="flex gap-4">
              <Button asChild>
                <Link to="/projects">View Projects</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/about">About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
