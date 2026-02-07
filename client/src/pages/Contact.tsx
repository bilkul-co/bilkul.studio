import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionButton } from "@/components/ui/motion-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/ui/glass-card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert([
        {
          service_type: "Contact",
          business_name: company.trim() || name.trim(),
          industry: company.trim() ? "Unknown" : null,
          goals: ["general-inquiry"],
          timeline: "flexible",
          email: email.trim(),
          phone: phone.trim() || null,
          details: message.trim(),
        },
      ]);
      if (error) throw error;

      toast({
        title: "Message sent",
        description: "We received your message and will respond soon.",
      });
      setName("");
      setEmail("");
      setCompany("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <div className="relative z-10 container mx-auto px-6 py-20 grid lg:grid-cols-[1fr_480px] gap-12 items-start">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white">
              Let’s Talk
            </h1>
            <p className="text-xl text-white/60 mb-12 font-light leading-relaxed">
              Tell us what you need and we’ll respond with next steps and a tailored plan.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-white font-mono text-sm uppercase tracking-wider opacity-50 mb-2">Call Us</h3>
                <p className="text-2xl text-white font-medium hover:text-[var(--aquamarine)] transition-colors cursor-pointer">+971 55 563 9160</p>
              </div>
              <div>
                <h3 className="text-white font-mono text-sm uppercase tracking-wider opacity-50 mb-2">Visit Us</h3>
                <p className="text-2xl text-white font-medium">Bilkul Technologies</p>
                <p className="text-lg text-white/60">Jumeirah Garden City, Dubai, UAE</p>
              </div>
              <div>
                <h3 className="text-white font-mono text-sm uppercase tracking-wider opacity-50 mb-2">Email</h3>
                <p className="text-2xl text-white font-medium hover:text-[var(--aquamarine)] transition-colors cursor-pointer">bilkul.ae@gmail.com</p>
              </div>
            </div>
          </div>

          <GlassCard className="p-8 border-white/10 bg-white/[0.02]" spotlight>
            <h2 className="text-2xl font-display font-bold text-white mb-6">Contact Form</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-mono uppercase tracking-widest">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-12 rounded-xl bg-white/[0.03] border-white/10 focus:border-white/30 text-white placeholder:text-white/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-mono uppercase tracking-widest">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@company.com"
                  className="h-12 rounded-xl bg-white/[0.03] border-white/10 focus:border-white/30 text-white placeholder:text-white/20"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/60 font-mono uppercase tracking-widest">Company</label>
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company (optional)"
                    className="h-12 rounded-xl bg-white/[0.03] border-white/10 focus:border-white/30 text-white placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/60 font-mono uppercase tracking-widest">Phone</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50..."
                    className="h-12 rounded-xl bg-white/[0.03] border-white/10 focus:border-white/30 text-white placeholder:text-white/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-mono uppercase tracking-widest">Message</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project or request"
                  className="min-h-[140px] rounded-xl bg-white/[0.03] border-white/10 focus:border-white/30 text-white placeholder:text-white/20"
                  required
                />
              </div>
              <MotionButton
                type="submit"
                disabled={isSubmitting}
                className="h-12 rounded-full font-bold bg-white text-black hover:bg-white/90"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </MotionButton>
            </form>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
