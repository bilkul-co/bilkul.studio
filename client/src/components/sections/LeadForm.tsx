import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  serviceType: z.string().min(1, "Please select a service type"),
  businessName: z.string().min(2, "Business name is required"),
  industry: z.string().optional(),
  goals: z.array(z.string()).min(1, "Select at least one goal"),
  timeline: z.string().min(1, "Timeline is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  details: z.string().optional(),
});

const steps = [
  { id: "type", title: "Scope", subtitle: "What are we building?" },
  { id: "details", title: "Context", subtitle: "Tell us about you" },
  { id: "goals", title: "Vision", subtitle: "Goals & Timeline" },
  { id: "contact", title: "Connect", subtitle: "How to reach you" },
];

interface LeadFormProps {
  embedded?: boolean;
}

export function LeadForm({ embedded = false }: LeadFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: "",
      businessName: "",
      industry: "",
      goals: [],
      timeline: "",
      email: "",
      phone: "",
      details: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      toast({
        title: "Inquiry Received",
        description: "We've started a file for your project. A summary has been sent to your email.",
      });
      
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 0) fieldsToValidate = ["serviceType"];
    if (currentStep === 1) fieldsToValidate = ["businessName"];
    if (currentStep === 2) fieldsToValidate = ["goals", "timeline"];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        embedded ? "py-0" : "py-32"
      )}
      id="contact"
    >
      {/* Aurora Background for Section */}
      <div className="absolute inset-0 aurora-bg opacity-20 pointer-events-none" />
      
      <div
        className={cn(
          "relative z-10",
          embedded ? "px-0" : "container mx-auto px-6"
        )}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={transitions.section.viewport}
            variants={transitions.section}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">Start Your Project</h2>
            <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">Tell us about your vision. We'll engineer the rest.</p>
          </motion.div>

          <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
            {/* Steps Sidebar (Desktop) */}
            <div className="hidden md:flex flex-col gap-8 pt-8 sticky top-32">
                {steps.map((step, index) => (
                    <div key={index} className="relative pl-10 group cursor-default">
                        <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 ${
                            index <= currentStep 
                                ? "bg-[var(--rare-blue)] border-[var(--rare-blue)] shadow-[0_0_10px_var(--rare-blue)]" 
                                : "bg-transparent border-white/20"
                        }`} />
                        {index < steps.length - 1 && (
                            <div className={`absolute left-[7px] top-6 w-0.5 h-16 bg-white/5 transition-all duration-500 ${index < currentStep ? "bg-[var(--rare-blue)]/50" : ""}`} />
                        )}
                        <h4 className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${index === currentStep ? "text-white" : "text-white/40"}`}>{step.title}</h4>
                        <p className="text-xs text-white/40 mt-1 font-light">{step.subtitle}</p>
                    </div>
                ))}
            </div>

            <GlassCard className="p-8 md:p-12 border-white/10 bg-white/[0.02]" spotlight>
                {/* Mobile Progress */}
                <div className="flex md:hidden justify-between mb-8 relative px-2">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 -z-10" />
                    <div 
                        className="absolute top-1/2 left-0 h-0.5 bg-[var(--rare-blue)] -translate-y-1/2 -z-10 transition-all duration-300" 
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    />
                    {steps.map((step, index) => (
                        <div 
                        key={index}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                            index <= currentStep ? "bg-[var(--rare-blue)] text-white scale-110 shadow-[0_0_10px_var(--rare-blue)]" : "bg-[#060A12] border border-white/10 text-white/40"
                        }`}
                        >
                        {index + 1}
                        </div>
                    ))}
                </div>

                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-h-[400px] flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div
                        key="step1"
                        variants={transitions.page}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="space-y-8"
                        >
                        <div>
                            <h3 className="text-3xl font-bold mb-3 text-white">What are we building?</h3>
                            <p className="text-white/60 text-lg font-light">Select the core service you need.</p>
                        </div>
                        <FormField
                            control={form.control}
                            name="serviceType"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {["Web Experience", "Client Portal", "AI Integration", "Digital Product", "Strategy", "Other"].map((type) => (
                                    <div
                                        key={type}
                                        className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                                        field.value === type 
                                            ? "border-[var(--rare-blue)] bg-[var(--rare-blue)]/10 text-white shadow-[0_0_20px_-5px_rgba(45,107,255,0.2)]" 
                                            : "border-white/10 hover:border-white/20 hover:bg-white/5 bg-white/[0.02]"
                                        }`}
                                        onClick={() => field.onChange(type)}
                                    >
                                        <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center transition-colors ${field.value === type ? "bg-[var(--rare-blue)] border-[var(--rare-blue)]" : ""}`}>
                                            {field.value === type && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                        <span className="font-medium text-lg text-white/90">{type}</span>
                                    </div>
                                    ))}
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div
                        key="step2"
                        variants={transitions.page}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="space-y-8"
                        >
                        <div>
                            <h3 className="text-3xl font-bold mb-3 text-white">Business Context</h3>
                            <p className="text-white/60 text-lg font-light">Help us understand who we're designing for.</p>
                        </div>
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="businessName"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base text-white/80">Company Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Acme Corp" className="h-16 rounded-xl bg-white/[0.03] border-white/10 focus:border-[var(--rare-blue)] focus:bg-white/[0.05] transition-all text-lg text-white placeholder:text-white/20" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="industry"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base text-white/80">Industry</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g. Real Estate, Fintech" className="h-16 rounded-xl bg-white/[0.03] border-white/10 focus:border-[var(--rare-blue)] focus:bg-white/[0.05] transition-all text-lg text-white placeholder:text-white/20" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                        key="step3"
                        variants={transitions.page}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="space-y-8"
                        >
                        <div>
                            <h3 className="text-3xl font-bold mb-3 text-white">Vision & Constraints</h3>
                            <p className="text-white/60 text-lg font-light">What does success look like?</p>
                        </div>
                        <FormField
                            control={form.control}
                            name="goals"
                            render={() => (
                            <FormItem>
                                <FormLabel className="text-base mb-4 block text-white/80">Primary Goals</FormLabel>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {["Generate Leads", "Automate Operations", "Modernize Brand", "Launch New Product", "Improve UX", "Reduce Costs"].map((goal) => (
                                    <FormField
                                    key={goal}
                                    control={form.control}
                                    name="goals"
                                    render={({ field }) => {
                                        return (
                                        <FormItem
                                            key={goal}
                                            className={`flex flex-row items-center space-x-3 space-y-0 rounded-xl border p-4 transition-all cursor-pointer ${
                                                field.value?.includes(goal) 
                                                ? "border-[var(--rare-blue)] bg-[var(--rare-blue)]/10 shadow-sm" 
                                                : "border-white/10 hover:bg-white/5 hover:border-white/20 bg-white/[0.02]"
                                            }`}
                                        >
                                            <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(goal)}
                                                onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...field.value, goal])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== goal
                                                        )
                                                    )
                                                }}
                                                className="border-white/30 data-[state=checked]:bg-[var(--rare-blue)] data-[state=checked]:border-[var(--rare-blue)]"
                                            />
                                            </FormControl>
                                            <FormLabel className="font-medium cursor-pointer w-full text-base m-0 text-white/90">
                                            {goal}
                                            </FormLabel>
                                        </FormItem>
                                        )
                                    }}
                                    />
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="timeline"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base text-white/80">Ideal Timeline</FormLabel>
                                <FormControl>
                                <select 
                                    className="w-full h-16 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-base text-white focus:outline-none focus:ring-1 focus:ring-[var(--rare-blue)] focus:bg-white/[0.05] transition-all appearance-none"
                                    {...field}
                                >
                                    <option value="" disabled className="bg-[#060A12] text-white/50">Select a timeline</option>
                                    <option value="asap" className="bg-[#060A12]">ASAP (&lt; 1 month)</option>
                                    <option value="1-3months" className="bg-[#060A12]">1-3 Months</option>
                                    <option value="3-6months" className="bg-[#060A12]">3-6 Months</option>
                                    <option value="flexible" className="bg-[#060A12]">Flexible</option>
                                </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                        key="step4"
                        variants={transitions.page}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="space-y-8"
                        >
                        <div>
                            <h3 className="text-3xl font-bold mb-3 text-white">Final Step</h3>
                            <p className="text-white/60 text-lg font-light">Where should we send the proposal?</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-base text-white/80">Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="you@company.com" type="email" className="h-16 rounded-xl bg-white/[0.03] border-white/10 focus:border-[var(--rare-blue)] focus:bg-white/[0.05] text-lg text-white placeholder:text-white/20" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-base text-white/80">Phone (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="+971 50..." className="h-16 rounded-xl bg-white/[0.03] border-white/10 focus:border-[var(--rare-blue)] focus:bg-white/[0.05] text-lg text-white placeholder:text-white/20" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base text-white/80">Additional Details</FormLabel>
                                <FormControl>
                                <Textarea placeholder="Anything else we should know?" className="min-h-[140px] rounded-xl bg-white/[0.03] border-white/10 focus:border-[var(--rare-blue)] focus:bg-white/[0.05] text-lg text-white placeholder:text-white/20 resize-none p-6" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </motion.div>
                    )}
                    </AnimatePresence>

                    <div className="flex justify-between pt-8 border-t border-white/10 mt-auto">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`text-white/60 hover:text-white hover:bg-white/5 ${currentStep === 0 ? "invisible" : ""}`}
                    >
                        Back
                    </Button>
                    
                    {currentStep < steps.length - 1 ? (
                        <MotionButton type="button" onClick={nextStep} className="bg-white text-black hover:bg-white/90 px-8 rounded-full font-bold">
                        Next Step <ChevronRight className="ml-2 h-4 w-4" />
                        </MotionButton>
                    ) : (
                        <MotionButton type="submit" disabled={isSubmitting} className="min-w-[180px] bg-gradient-to-r from-[var(--rare-blue)] to-[var(--teal)] text-white hover:opacity-90 rounded-full font-bold shadow-[0_0_20px_-5px_rgba(45,107,255,0.4)] border-0">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <>Submit Inquiry <ArrowRight className="ml-2 h-4 w-4" /></>}
                        </MotionButton>
                    )}
                    </div>
                </form>
                </Form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
