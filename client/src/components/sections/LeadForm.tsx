import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { Button } from "@/components/ui/button"; // Added import
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  { id: "type", title: "What do you need?" },
  { id: "details", title: "Business Details" },
  { id: "goals", title: "Goals & Timeline" },
  { id: "contact", title: "Contact Info" },
];

export function LeadForm() {
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
    setIsSubmitting(false);
    toast({
      title: "Inquiry Sent",
      description: "We've received your details. Expect a response within 24 hours.",
    });
    // Reset or show success state
  }

  const nextStep = async () => {
    // Validate current step fields before moving
    let fieldsToValidate: any[] = [];
    if (currentStep === 0) fieldsToValidate = ["serviceType"];
    if (currentStep === 1) fieldsToValidate = ["businessName"];
    if (currentStep === 2) fieldsToValidate = ["goals", "timeline"];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="contact">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl rounded-full translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Start Your Project</h2>
            <p className="text-muted-foreground text-lg">Tell us about your vision. We'll handle the systems.</p>
          </div>

          <GlassCard className="p-8 md:p-12 border-primary/20">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 -z-10" />
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 -z-10 transition-all duration-300" 
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-300 ${
                    index <= currentStep ? "bg-primary text-white" : "bg-card border border-white/10 text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-semibold">What are you looking to build?</h3>
                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["Web Experience", "Client Portal", "AI Integration", "Digital Product", "Strategy", "Other"].map((type) => (
                                  <div
                                    key={type}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                      field.value === type 
                                        ? "border-primary bg-primary/10 text-primary" 
                                        : "border-white/10 hover:border-white/20 hover:bg-white/5"
                                    }`}
                                    onClick={() => field.onChange(type)}
                                  >
                                    <span className="font-medium">{type}</span>
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
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-semibold">Tell us about your business</h3>
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Corp" className="h-12 bg-white/5 border-white/10" {...field} />
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
                            <FormLabel>Industry</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Real Estate, Fintech" className="h-12 bg-white/5 border-white/10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-semibold">Goals & Timeline</h3>
                      <FormField
                        control={form.control}
                        name="goals"
                        render={() => (
                          <FormItem>
                            <FormLabel>Primary Goals</FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                              {["Generate Leads", "Automate Operations", "Modernize Brand", "Launch New Product", "Improve UX"].map((goal) => (
                                <FormField
                                  key={goal}
                                  control={form.control}
                                  name="goals"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={goal}
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-white/10 p-4 hover:bg-white/5 transition-colors"
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
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer w-full">
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
                            <FormLabel>Ideal Timeline</FormLabel>
                            <FormControl>
                              <select 
                                className="w-full h-12 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                {...field}
                              >
                                <option value="" disabled>Select a timeline</option>
                                <option value="asap">ASAP (&lt; 1 month)</option>
                                <option value="1-3months">1-3 Months</option>
                                <option value="3-6months">3-6 Months</option>
                                <option value="flexible">Flexible</option>
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
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-semibold">How can we reach you?</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="you@company.com" type="email" className="h-12 bg-white/5 border-white/10" {...field} />
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
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="+971 50..." className="h-12 bg-white/5 border-white/10" {...field} />
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
                            <FormLabel>Any other details?</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Tell us more about the project..." className="min-h-[100px] bg-white/5 border-white/10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between pt-6 border-t border-white/10">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={currentStep === 0 ? "invisible" : ""}
                  >
                    Back
                  </Button>
                  
                  {currentStep < steps.length - 1 ? (
                    <MotionButton type="button" onClick={nextStep}>
                      Next Step <ChevronRight className="ml-2 h-4 w-4" />
                    </MotionButton>
                  ) : (
                    <MotionButton type="submit" disabled={isSubmitting} className="min-w-[140px]">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Inquiry"}
                    </MotionButton>
                  )}
                </div>
              </form>
            </Form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}