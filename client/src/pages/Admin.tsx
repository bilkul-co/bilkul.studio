import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useToast } from "@/hooks/use-toast";
import { MotionButton } from "@/components/ui/motion-button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Loader2, Search, Filter, Download, User, ArrowUpRight, CheckCircle2, Clock, ShieldAlert, FileText, Settings, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { transitions } from "@/lib/motion";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("leads"); // leads, content, settings

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "bilkul2026") {
      setIsAuthenticated(true);
      toast({ title: "System Unlocked", description: "Welcome to Command Center." });
    } else {
      toast({ title: "Access Denied", description: "Invalid credentials.", variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-30 pointer-events-none" />
        <BackgroundBeams />
        <GlassCard className="w-full max-w-md p-10 border-white/10 bg-black/40 backdrop-blur-2xl" spotlight>
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[var(--rare-blue)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[var(--rare-blue)] border border-[var(--rare-blue)]/20 shadow-[0_0_30px_-10px_rgba(45,107,255,0.3)]">
                    <ShieldAlert size={32} />
                </div>
                <h2 className="text-3xl font-bold font-display text-white mb-2">Command Center</h2>
                <p className="text-white/50 text-sm tracking-wide uppercase">Restricted Access</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <input 
                    type="password" 
                    placeholder="ENTER PASSKEY"
                    className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[var(--rare-blue)]/50 focus:bg-white/[0.05] transition-all text-center tracking-[0.3em] font-mono text-lg placeholder:text-white/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <MotionButton type="submit" className="w-full h-14 rounded-xl bg-white text-black hover:bg-white/90 font-bold shadow-lg shadow-white/10 tracking-wider">
                AUTHENTICATE
            </MotionButton>
            </form>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 relative">
      <BackgroundBeams className="opacity-20" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <span className="text-[var(--aquamarine)] font-mono text-xs tracking-widest uppercase">System Online</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white">Dashboard</h1>
            </div>
            <div className="flex gap-3">
                <MotionButton variant="outline" size="sm" className="border-white/10 hover:bg-white/5 gap-2 text-white/80">
                    <Download size={14} /> Export CSV
                </MotionButton>
                <MotionButton variant="ghost" size="sm" onClick={() => setIsAuthenticated(false)} className="text-white/60 hover:text-white hover:bg-white/5">
                    Log Out
                </MotionButton>
            </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-6 border-b border-white/10 mb-8 overflow-x-auto">
            {["leads", "content", "settings"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === tab ? "text-white" : "text-white/40 hover:text-white/70"}`}
                >
                    {tab}
                    {activeTab === tab && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--rare-blue)] shadow-[0_0_10px_var(--rare-blue)]" />
                    )}
                </button>
            ))}
        </div>

        <AnimatePresence mode="wait">
            {activeTab === "leads" && (
                <motion.div
                    key="leads"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                        {[
                            { label: "Total Leads", value: "124", change: "+12%", color: "text-white" },
                            { label: "New Inquiries", value: "12", change: "+4", color: "text-[var(--aquamarine)]" },
                            { label: "Pipeline Value", value: "$450k", change: "+8%", color: "text-white" },
                            { label: "Conversion", value: "8.4%", change: "+1.2%", color: "text-white" }
                        ].map((stat, i) => (
                            <GlassCard key={i} className="p-6 border-white/5 bg-white/[0.02]" noPadding>
                                <div className="p-6">
                                    <p className="text-xs text-white/40 mb-2 font-mono uppercase tracking-wider">{stat.label}</p>
                                    <div className="flex items-end justify-between">
                                        <h3 className={`text-3xl font-bold font-display ${stat.color}`}>{stat.value}</h3>
                                        <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">{stat.change}</span>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                    
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-grow max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Search leads..." 
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-white/20"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm font-medium text-white hover:bg-white/[0.05] transition-colors flex items-center gap-2">
                                <Filter size={14} /> Filter
                            </button>
                        </div>
                    </div>

                    <GlassCard className="overflow-hidden p-0 border-white/10 bg-black/40 backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                            <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider bg-white/[0.02]">
                                <th className="p-6 font-medium">Status</th>
                                <th className="p-6 font-medium">Company</th>
                                <th className="p-6 font-medium">Contact</th>
                                <th className="p-6 font-medium">Source</th>
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
                                    className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                                >
                                <td className="p-6">
                                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                                        i === 1 ? "bg-[var(--rare-blue)]/10 text-[var(--rare-blue)] border-[var(--rare-blue)]/20 shadow-[0_0_15px_-5px_var(--rare-blue)]" : 
                                        i === 2 ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                                        "bg-white/5 text-white/40 border-white/10"
                                    }`}>
                                        {i === 1 && <span className="w-1.5 h-1.5 rounded-full bg-[var(--rare-blue)] animate-pulse" />}
                                        {i === 1 ? "New Lead" : i === 2 ? "Reviewing" : "Contacted"}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <div className="font-bold text-white text-lg">TechCorp {i}</div>
                                    <div className="text-xs text-white/40 mt-1">Real Estate • 50-100 Emp</div>
                                </td>
                                <td className="p-6">
                                    <div className="text-sm font-medium text-white/90">Sarah Johnson</div>
                                    <div className="text-xs text-white/40 mt-0.5">sarah@techcorp.com</div>
                                </td>
                                <td className="p-6 text-sm">
                                    <span className="inline-flex items-center px-2 py-1 rounded bg-white/[0.03] border border-white/10 text-xs text-white/60">
                                        Website
                                    </span>
                                </td>
                                <td className="p-6 text-sm text-white/60">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-[var(--aquamarine)]" /> 1-3 Months
                                    </div>
                                </td>
                                <td className="p-6 text-right">
                                    <MotionButton size="sm" variant="ghost" className="h-10 w-10 p-0 rounded-full hover:bg-white/10 text-white/40 hover:text-white">
                                        <ArrowUpRight size={18} />
                                    </MotionButton>
                                </td>
                                </motion.tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    </GlassCard>
                </motion.div>
            )}

            {activeTab === "content" && (
                <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <GlassCard className="p-8 flex items-center gap-6 cursor-pointer hover:border-[var(--rare-blue)]/50 transition-colors" noPadding>
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                                <FileText size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Case Studies</h3>
                                <p className="text-white/40">Manage portfolio items</p>
                            </div>
                        </GlassCard>
                        <GlassCard className="p-8 flex items-center gap-6 cursor-pointer hover:border-[var(--rare-blue)]/50 transition-colors" noPadding>
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                                <Database size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Testimonials</h3>
                                <p className="text-white/40">Manage client reviews</p>
                            </div>
                        </GlassCard>
                    </div>
                    
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                        <p className="text-white/40">Select a content type to manage</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}