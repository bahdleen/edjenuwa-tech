
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Github, Linkedin, Shield, Lock, Terminal, Server } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Here you would typically send this data to your backend
    // For now we'll just simulate a successful submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-cyber-dark-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight font-mono">
                <span className="text-cyber">//</span> Contact
              </h1>
              <p className="text-muted-foreground text-lg">
                Secure communication channel established
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="cyber-panel border-cyber/30">
                  <CardHeader>
                    <CardTitle className="font-mono flex items-center gap-2">
                      <Terminal className="h-5 w-5 text-cyber" />
                      Initialize Connection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1 font-mono">
                          Identifier
                        </label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                          className="bg-cyber-dark border-cyber/30 focus:border-cyber focus:ring-1 focus:ring-cyber placeholder:text-muted-foreground/50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1 font-mono">
                          Communication Channel
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address"
                          required
                          className="bg-cyber-dark border-cyber/30 focus:border-cyber focus:ring-1 focus:ring-cyber placeholder:text-muted-foreground/50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1 font-mono">
                          Data Payload
                        </label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Your message"
                          className="min-h-[120px] bg-cyber-dark border-cyber/30 focus:border-cyber focus:ring-1 focus:ring-cyber placeholder:text-muted-foreground/50"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-cyber text-cyber-dark hover:bg-cyber/90 font-mono" 
                        disabled={loading}
                      >
                        {loading ? (
                          "Transmitting..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> TRANSMIT MESSAGE
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <Card className="cyber-panel border-cyber/30 mb-6">
                  <CardHeader>
                    <CardTitle className="font-mono flex items-center gap-2">
                      <Lock className="h-5 w-5 text-cyber" />
                      Secure Channels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="h-4 w-4 text-cyber" />
                        <span className="font-medium font-mono">Email</span>
                      </div>
                      <a 
                        href="mailto:contact@edjenuwa.tech" 
                        className="text-muted-foreground hover:text-cyber transition-colors"
                      >
                        contact@edjenuwa.tech
                      </a>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Github className="h-4 w-4 text-cyber" />
                        <span className="font-medium font-mono">GitHub</span>
                      </div>
                      <a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-cyber transition-colors"
                      >
                        github.com/anthonyedjenuwa
                      </a>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Linkedin className="h-4 w-4 text-cyber" />
                        <span className="font-medium font-mono">LinkedIn</span>
                      </div>
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-cyber transition-colors"
                      >
                        linkedin.com/in/anthonyedjenuwa
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cyber-panel border-cyber-red/30">
                  <CardContent className="pt-6 pb-6">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 rounded-full bg-cyber-dark border border-cyber-red/30">
                        <Shield className="h-8 w-8 text-cyber-red" />
                      </div>
                    </div>
                    <h3 className="text-center font-mono font-bold mb-2">Security Notice</h3>
                    <p className="text-muted-foreground text-sm text-center">
                      All communication is encrypted and securely stored. For sensitive information, 
                      please use the PGP key available on request.
                    </p>
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

export default Contact;
