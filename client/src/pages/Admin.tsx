import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useToast } from "@/hooks/use-toast";
import { MotionButton } from "@/components/ui/motion-button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Loader2, Search, Filter, Download, User, ArrowUpRight, CheckCircle2, Clock, ShieldAlert, FileText, Settings, Database, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { transitions } from "@/lib/motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Lead {
  id: string;
  serviceType: string;
  businessName: string;
  industry: string | null;
  goals: string[];
  timeline: string;
  email: string;
  phone: string | null;
  details: string | null;
  status: string;
  createdAt: string;
}

interface DemoBlueprint {
  id: string;
  prompt: string | null;
  meta?: {
    industry?: string | null;
    audience?: string | null;
    primaryGoal?: string | null;
    primaryCta?: string | null;
  } | null;
  brandName: string;
  tagline: string;
  tone: string;
  primaryColor: string;
  sections: any;
  promptAnchors: string[] | null;
  coverageScore: string | null;
  createdAt: string;
}

const STATUS_OPTIONS = ["new", "contacted", "reviewing", "closed"];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<DemoBlueprint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("leads");
  const queryClient = useQueryClient();

  useEffect(() => {
    let mounted = true;
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/me", { credentials: "include" });
        if (response.ok && mounted) {
          setIsAuthenticated(true);
        }
      } catch {
        // ignore auth check failures
      }
    };
    checkAuth();
    return () => {
      mounted = false;
    };
  }, []);
  
  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: async () => {
      const response = await fetch("/api/leads", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch leads");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const { data: demos = [], isLoading: isLoadingDemos } = useQuery<DemoBlueprint[]>({
    queryKey: ["demo-blueprints"],
    queryFn: async () => {
      const response = await fetch("/api/demo-blueprints", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch demos");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`/api/leads/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast({ title: "Status Updated", description: "Lead status has been changed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    },
  });

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map(row => 
        headers.map(h => {
          const val = row[h];
          if (val === null || val === undefined) return "";
          if (Array.isArray(val)) return `"${val.join("; ")}"`;
          if (typeof val === "object") return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
          if (typeof val === "string" && (val.includes(",") || val.includes('"') || val.includes("\n"))) {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        }).join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const filteredLeads = leads.filter((lead) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesTerm =
      !term ||
      lead.businessName.toLowerCase().includes(term) ||
      lead.email.toLowerCase().includes(term) ||
      (lead.industry || "").toLowerCase().includes(term) ||
      lead.serviceType.toLowerCase().includes(term);
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesTerm && matchesStatus;
  });

  const inquiries = leads.filter(
    (lead) =>
      lead.serviceType.toLowerCase() === "contact" ||
      lead.goals.includes("general-inquiry")
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error("Invalid credentials");
      setIsAuthenticated(true);
      setPassword("");
      toast({ title: "System Unlocked", description: "Welcome to Command Center." });
    } catch {
      toast({ title: "Access Denied", description: "Invalid credentials.", variant: "destructive" });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    } finally {
      setIsAuthenticated(false);
      setSelectedLead(null);
      setSelectedDemo(null);
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
                    type="text" 
                    placeholder="USERNAME"
                    className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[var(--rare-blue)]/50 focus:bg-white/[0.05] transition-all text-center tracking-[0.2em] font-mono text-base placeholder:text-white/20"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                />
                <input 
                    type="password" 
                    placeholder="PASSWORD"
                    className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[var(--rare-blue)]/50 focus:bg-white/[0.05] transition-all text-center tracking-[0.3em] font-mono text-lg placeholder:text-white/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
            </div>
            <MotionButton type="submit" disabled={isLoggingIn} className="w-full h-14 rounded-xl bg-white text-black hover:bg-white/90 font-bold shadow-lg shadow-white/10 tracking-wider">
                {isLoggingIn ? "VERIFYING..." : "AUTHENTICATE"}
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
                <MotionButton 
                    variant="outline" 
                    size="sm" 
                    className="border-white/10 hover:bg-white/5 gap-2 text-white/80"
                    onClick={() => exportToCSV(activeTab === "leads" ? leads : demos, activeTab)}
                >
                    <Download size={14} /> Export CSV
                </MotionButton>
                <MotionButton variant="ghost" size="sm" onClick={handleLogout} className="text-white/60 hover:text-white hover:bg-white/5">
                    Log Out
                </MotionButton>
            </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-6 border-b border-white/10 mb-8 overflow-x-auto">
            {["leads", "inquiries", "demos", "settings"].map((tab) => (
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
                            { label: "Total Leads", value: leads.length.toString(), change: "", color: "text-white" },
                            { label: "New Inquiries", value: leads.filter(l => l.status === "new").length.toString(), change: "", color: "text-[var(--aquamarine)]" },
                            { label: "Contacted", value: leads.filter(l => l.status === "contacted").length.toString(), change: "", color: "text-white" },
                            { label: "Reviewing", value: leads.filter(l => l.status === "reviewing").length.toString(), change: "", color: "text-white" }
                        ].map((stat, i) => (
                            <GlassCard key={i} className="p-6 border-white/5 bg-white/[0.02]" noPadding>
                                <div className="p-6">
                                    <p className="text-xs text-white/40 mb-2 font-mono uppercase tracking-wider">{stat.label}</p>
                                    <div className="flex items-end justify-between">
                                        <h3 className={`text-3xl font-bold font-display ${stat.color}`}>{stat.value}</h3>
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 items-center">
                            <Filter size={14} className="text-white/40" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm font-medium text-white focus:outline-none focus:border-white/20 transition-colors"
                            >
                                <option value="all" className="bg-[#0a0a0a]">All Statuses</option>
                                {STATUS_OPTIONS.map((status) => (
                                    <option key={status} value={status} className="bg-[#0a0a0a]">
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <GlassCard className="overflow-hidden p-0 border-white/10 bg-black/40 backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center p-20">
                                <Loader2 className="animate-spin text-[var(--aquamarine)]" size={32} />
                            </div>
                        ) : leads.length === 0 ? (
                            <div className="text-center py-20 text-white/40">
                                No leads yet. They'll appear here once someone submits the contact form.
                            </div>
                        ) : filteredLeads.length === 0 ? (
                            <div className="text-center py-20 text-white/40">
                                No leads match your search.
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider bg-white/[0.02]">
                                    <th className="p-6 font-medium">Status</th>
                                    <th className="p-6 font-medium">Company</th>
                                    <th className="p-6 font-medium">Contact</th>
                                    <th className="p-6 font-medium">Service</th>
                                    <th className="p-6 font-medium">Timeline</th>
                                    <th className="p-6 font-medium">Date</th>
                                    <th className="p-6 font-medium">Details</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                {filteredLeads.map((lead, i) => (
                                    <motion.tr 
                                        key={lead.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                                    >
                                    <td className="p-6">
                                        <div className="relative inline-block">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateStatusMutation.mutate({ id: lead.id, status: e.target.value })}
                                                className={`appearance-none cursor-pointer pr-8 pl-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border bg-transparent focus:outline-none ${
                                                    lead.status === "new" ? "bg-[var(--rare-blue)]/10 text-[var(--rare-blue)] border-[var(--rare-blue)]/20" : 
                                                    lead.status === "contacted" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                    lead.status === "reviewing" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                                                    lead.status === "closed" ? "bg-white/5 text-white/40 border-white/10" :
                                                    "bg-white/5 text-white/40 border-white/10"
                                                }`}
                                            >
                                                {STATUS_OPTIONS.map(s => (
                                                    <option key={s} value={s} className="bg-[#0a0a0a] text-white">{s}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" />
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="font-bold text-white text-lg">{lead.businessName}</div>
                                        {lead.industry && <div className="text-xs text-white/40 mt-1">{lead.industry}</div>}
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm font-medium text-white/90">{lead.email}</div>
                                        {lead.phone && <div className="text-xs text-white/40 mt-0.5">{lead.phone}</div>}
                                    </td>
                                    <td className="p-6 text-sm">
                                        <span className="inline-flex items-center px-2 py-1 rounded bg-white/[0.03] border border-white/10 text-xs text-white/60">
                                            {lead.serviceType}
                                        </span>
                                    </td>
                                    <td className="p-6 text-sm text-white/60">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-[var(--aquamarine)]" /> {lead.timeline}
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm text-white/60">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-6 text-sm">
                                        <button
                                            onClick={() => setSelectedLead(lead)}
                                            className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-white/70 hover:bg-white/[0.08] hover:text-white transition-colors"
                                        >
                                            View
                                        </button>
                                    </td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    </GlassCard>
                </motion.div>
            )}

            {activeTab === "inquiries" && (
                <motion.div
                    key="inquiries"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <GlassCard className="overflow-hidden p-0 border-white/10 bg-black/40 backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center p-20">
                                <Loader2 className="animate-spin text-[var(--aquamarine)]" size={32} />
                            </div>
                        ) : inquiries.length === 0 ? (
                            <div className="text-center py-20 text-white/40">
                                No inquiries yet. Contact form submissions will appear here.
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider bg-white/[0.02]">
                                    <th className="p-6 font-medium">Name/Company</th>
                                    <th className="p-6 font-medium">Email</th>
                                    <th className="p-6 font-medium">Phone</th>
                                    <th className="p-6 font-medium">Date</th>
                                    <th className="p-6 font-medium">Details</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                {inquiries.map((lead, i) => (
                                    <motion.tr 
                                        key={lead.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                                    >
                                    <td className="p-6">
                                        <div className="font-bold text-white text-lg">{lead.businessName}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm font-medium text-white/90">{lead.email}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm text-white/60">{lead.phone || "—"}</div>
                                    </td>
                                    <td className="p-6 text-sm text-white/60">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-6 text-sm">
                                        <button
                                            onClick={() => setSelectedLead(lead)}
                                            className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-white/70 hover:bg-white/[0.08] hover:text-white transition-colors"
                                        >
                                            View
                                        </button>
                                    </td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    </GlassCard>
                </motion.div>
            )}

            {activeTab === "demos" && (
                <motion.div
                    key="demos"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                        {[
                            { label: "Total Demos", value: demos.length.toString(), color: "text-white" },
                            { label: "Modern Minimal", value: demos.filter(d => d.tone === "modern-minimal").length.toString(), color: "text-[var(--aquamarine)]" },
                            { label: "Calm Luxury", value: demos.filter(d => d.tone === "calm-luxury").length.toString(), color: "text-white" },
                            { label: "Bold Premium", value: demos.filter(d => d.tone === "bold-premium").length.toString(), color: "text-white" }
                        ].map((stat, i) => (
                            <GlassCard key={i} className="p-6 border-white/5 bg-white/[0.02]" noPadding>
                                <div className="p-6">
                                    <p className="text-xs text-white/40 mb-2 font-mono uppercase tracking-wider">{stat.label}</p>
                                    <div className="flex items-end justify-between">
                                        <h3 className={`text-3xl font-bold font-display ${stat.color}`}>{stat.value}</h3>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>

                    <GlassCard className="overflow-hidden p-0 border-white/10 bg-black/40 backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        {isLoadingDemos ? (
                            <div className="flex items-center justify-center p-20">
                                <Loader2 className="animate-spin text-[var(--aquamarine)]" size={32} />
                            </div>
                        ) : demos.length === 0 ? (
                            <div className="text-center py-20 text-white/40">
                                No demo prompts yet. They'll appear here once someone uses the AI demo generator.
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider bg-white/[0.02]">
                                    <th className="p-6 font-medium">Brand Name</th>
                                    <th className="p-6 font-medium">Tagline</th>
                                    <th className="p-6 font-medium">Style</th>
                                    <th className="p-6 font-medium">Keywords</th>
                                    <th className="p-6 font-medium">Date</th>
                                    <th className="p-6 font-medium">Details</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                {demos.map((demo, i) => (
                                    <motion.tr 
                                        key={demo.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                                    >
                                    <td className="p-6">
                                        <div className="font-bold text-white text-lg">{demo.brandName}</div>
                                        <div className="text-xs text-white/40 mt-1">{demo.primaryColor}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm text-white/90 max-w-xs">{demo.tagline}</div>
                                    </td>
                                    <td className="p-6 text-sm">
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                                            demo.tone === "modern-minimal" ? "bg-[var(--aquamarine)]/10 text-[var(--aquamarine)] border-[var(--aquamarine)]/20" :
                                            demo.tone === "calm-luxury" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                                            demo.tone === "bold-premium" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                                            "bg-[var(--rare-blue)]/10 text-[var(--rare-blue)] border-[var(--rare-blue)]/20"
                                        }`}>
                                            {demo.tone.replace("-", " ")}
                                        </span>
                                    </td>
                                    <td className="p-6 text-sm">
                                        <div className="flex flex-wrap gap-1 max-w-xs">
                                            {demo.promptAnchors?.slice(0, 4).map((anchor, idx) => (
                                                <span key={idx} className="inline-flex items-center px-2 py-1 rounded bg-white/[0.03] border border-white/10 text-xs text-white/60">
                                                    {anchor}
                                                </span>
                                            ))}
                                            {demo.promptAnchors && demo.promptAnchors.length > 4 && (
                                                <span className="text-xs text-white/40">+{demo.promptAnchors.length - 4}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm text-white/60">
                                        {new Date(demo.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-6 text-sm">
                                        <button
                                            onClick={() => setSelectedDemo(demo)}
                                            className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-white/70 hover:bg-white/[0.08] hover:text-white transition-colors"
                                        >
                                            View
                                        </button>
                                    </td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    </GlassCard>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="max-w-2xl bg-[#0b0d14] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-display">Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Company</div>
                <div className="text-white/90 font-medium">{selectedLead.businessName}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Industry</div>
                <div className="text-white/90 font-medium">{selectedLead.industry || "—"}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Service Type</div>
                <div className="text-white/90 font-medium">{selectedLead.serviceType}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Timeline</div>
                <div className="text-white/90 font-medium">{selectedLead.timeline}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Email</div>
                <div className="text-white/90 font-medium">{selectedLead.email}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Phone</div>
                <div className="text-white/90 font-medium">{selectedLead.phone || "—"}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-white/40 uppercase text-xs mb-1">Goals</div>
                <div className="text-white/90 font-medium">{selectedLead.goals.join(", ")}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-white/40 uppercase text-xs mb-1">Details</div>
                <div className="text-white/80 whitespace-pre-wrap">{selectedLead.details || "—"}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedDemo} onOpenChange={(open) => !open && setSelectedDemo(null)}>
        <DialogContent className="max-w-2xl bg-[#0b0d14] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-display">Demo Details</DialogTitle>
          </DialogHeader>
          {selectedDemo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="md:col-span-2">
                <div className="text-white/40 uppercase text-xs mb-1">Prompt</div>
                <div className="text-white/90 font-medium">{selectedDemo.prompt || "—"}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Industry</div>
                <div className="text-white/90 font-medium">{selectedDemo.meta?.industry || "—"}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Audience</div>
                <div className="text-white/90 font-medium">{selectedDemo.meta?.audience || "—"}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Primary Goal</div>
                <div className="text-white/90 font-medium">{selectedDemo.meta?.primaryGoal || "—"}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Primary CTA</div>
                <div className="text-white/90 font-medium">{selectedDemo.meta?.primaryCta || "—"}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Brand</div>
                <div className="text-white/90 font-medium">{selectedDemo.brandName}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Tagline</div>
                <div className="text-white/90 font-medium">{selectedDemo.tagline}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Tone</div>
                <div className="text-white/90 font-medium">{selectedDemo.tone}</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-xs mb-1">Primary Color</div>
                <div className="text-white/90 font-medium">{selectedDemo.primaryColor}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-white/40 uppercase text-xs mb-1">Keywords</div>
                <div className="text-white/90 font-medium">
                  {selectedDemo.promptAnchors && selectedDemo.promptAnchors.length > 0
                    ? selectedDemo.promptAnchors.join(", ")
                    : "—"}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
