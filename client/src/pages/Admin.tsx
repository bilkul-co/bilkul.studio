import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useToast } from "@/hooks/use-toast";
import { MotionButton } from "@/components/ui/motion-button";
import { Loader2 } from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "bilkul2026") {
      setIsAuthenticated(true);
      toast({ title: "Welcome back", description: "Admin access granted." });
    } else {
      toast({ title: "Access Denied", description: "Invalid credentials.", variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <GlassCard className="w-full max-w-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Studio Access</h2>
            <form onSubmit={handleLogin} className="space-y-4">
            <input 
                type="password" 
                placeholder="Enter Passkey"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <MotionButton type="submit" className="w-full">
                Enter System
            </MotionButton>
            </form>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-display font-bold">Lead Intelligence</h1>
            <MotionButton variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>Log Out</MotionButton>
        </div>
        
        <GlassCard className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                <tr className="border-b border-white/10 text-muted-foreground text-sm bg-white/5">
                    <th className="p-4 font-medium">Date received</th>
                    <th className="p-4 font-medium">Company</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Interest</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                {[1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-sm text-muted-foreground">Jan 18, 2026</td>
                    <td className="p-4 font-medium">Example Corp {i}</td>
                    <td className="p-4 text-sm">
                        <div className="text-foreground">john@example.com</div>
                        <div className="text-xs text-muted-foreground">+971 50 123 4567</div>
                    </td>
                    <td className="p-4 text-sm">
                        <span className="inline-flex items-center px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">
                            Web Experience
                        </span>
                    </td>
                    <td className="p-4">
                        <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs border border-primary/20">
                            New Lead
                        </span>
                    </td>
                    <td className="p-4">
                        <button className="text-xs text-muted-foreground hover:text-primary underline opacity-0 group-hover:opacity-100 transition-opacity">
                            View Details
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}