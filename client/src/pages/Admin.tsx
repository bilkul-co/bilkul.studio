import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useToast } from "@/hooks/use-toast";
import { MotionButton } from "@/components/ui/motion-button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Loader2, Search, Filter, Download, User, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden">
        <BackgroundBeams />
        <GlassCard className="w-full max-w-md p-10 border-white/10 bg-black/40 backdrop-blur-2xl" spotlight>
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary border border-primary/20">
                    <User size={24} />
                </div>
                <h2 className="text-2xl font-bold font-display">Studio Access</h2>
                <p className="text-muted-foreground text-sm">Restricted area for Bilkul staff only.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <input 
                    type="password" 
                    placeholder="Enter Passkey"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all text-center tracking-widest"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <MotionButton type="submit" className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 font-semibold shadow-lg shadow-white/10">
                Enter System
            </MotionButton>
            </form>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 relative">
      <BackgroundBeams className="opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Lead Intelligence</h1>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    System Online • 3 New Inquiries
                </div>
            </div>
            <div className="flex gap-4">
                <MotionButton variant="outline" size="sm" className="border-white/10 hover:bg-white/5 gap-2">
                    <Download size={14} /> Export CSV
                </MotionButton>
                <MotionButton variant="ghost" size="sm" onClick={() => setIsAuthenticated(false)} className="text-muted-foreground hover:text-white">
                    Log Out
                </MotionButton>
            </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
                { label: "Total Leads", value: "124", change: "+12%" },
                { label: "New Inquiries", value: "12", change: "+4" },
                { label: "Conversion Rate", value: "8.4%", change: "+1.2%" },
                { label: "Avg. Deal Size", value: "$45k", change: "+$5k" }
            ].map((stat, i) => (
                <GlassCard key={i} className="p-6 border-white/5 bg-white/[0.02]" noPadding>
                    <div className="p-6">
                        <p className="text-sm text-muted-foreground mb-1 font-mono uppercase tracking-wider">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-bold font-display">{stat.value}</h3>
                            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">{stat.change}</span>
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search by company or name..." 
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm focus:outline-none focus:border-white/20 transition-colors"
                />
            </div>
            <div className="flex gap-2">
                <button className="px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm font-medium hover:bg-white/[0.05] transition-colors flex items-center gap-2">
                    <Filter size={14} /> Filter
                </button>
            </div>
        </div>

        <GlassCard className="overflow-hidden p-0 border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                <tr className="border-b border-white/10 text-muted-foreground text-xs uppercase tracking-wider bg-white/[0.02]">
                    <th className="p-6 font-medium">Status</th>
                    <th className="p-6 font-medium">Company</th>
                    <th className="p-6 font-medium">Contact</th>
                    <th className="p-6 font-medium">Interest</th>
                    <th className="p-6 font-medium">Timeline</th>
                    <th className="p-6 font-medium text-right">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                {[1, 2, 3, 4, 5].map((i) => (
                    <motion.tr 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    >
                    <td className="p-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            i === 1 ? "bg-primary/10 text-primary border-primary/20" : 
                            i === 2 ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                            "bg-white/5 text-muted-foreground border-white/10"
                        }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                                i === 1 ? "bg-primary animate-pulse" : 
                                i === 2 ? "bg-orange-400" : 
                                "bg-gray-500"
                            }`} />
                            {i === 1 ? "New Lead" : i === 2 ? "In Progress" : "Contacted"}
                        </span>
                    </td>
                    <td className="p-6">
                        <div className="font-bold text-white">TechCorp {i}</div>
                        <div className="text-xs text-muted-foreground mt-1">Real Estate</div>
                    </td>
                    <td className="p-6">
                        <div className="text-sm font-medium">Sarah Johnson</div>
                        <div className="text-xs text-muted-foreground mt-0.5">sarah@techcorp.com</div>
                    </td>
                    <td className="p-6 text-sm">
                        <span className="inline-flex items-center px-2 py-1 rounded bg-white/[0.03] border border-white/10 text-xs text-white/80">
                            Web Experience
                        </span>
                    </td>
                    <td className="p-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} /> 1-3 Months
                        </div>
                    </td>
                    <td className="p-6 text-right">
                        <MotionButton size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white">
                            <ArrowUpRight size={16} />
                        </MotionButton>
                    </td>
                    </motion.tr>
                ))}
                </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}