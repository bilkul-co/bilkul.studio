import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { transitions } from "@/lib/motion";

const steps = [
  {
    number: "01",
    title: "Discovery & Audit",
    tags: ["Stakeholder Interviews", "Tech Audit", "Data Analysis"],
    desc: "We deep-dive into your business logic, audience, and operational bottlenecks. We don't guess; we measure."
  },
  {
    number: "02",
    title: "System Architecture",
    tags: ["Data Flow", "User Journeys", "Tech Stack"],
    desc: "We map out the data flows, user journeys, and technical stack. This is the blueprint for your digital engine."
  },
  {
    number: "03",
    title: "Design & Prototyping",
    tags: ["High-Fidelity UI", "Interactive Prototypes", "Motion Design"],
    desc: "High-fidelity visuals and interactive prototypes. You'll feel the product before a single line of code is written."
  },
  {
    number: "04",
    title: "Engineering",
    tags: ["Next.js", "React", "Node.js", "Postgres"],
    desc: "Clean, scalable code built on modern frameworks. Performance is non-negotiable. We build for the future."
  },
  {
    number: "05",
    title: "Launch & Optimization",
    tags: ["Deployment", "Analytics", "Iterative Growth"],
    desc: "Seamless deployment followed by data-driven iteration. We stick around to ensure the system scales."
  }
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-32 bg-background relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={transitions.section.viewport}
          variants={transitions.section}
          className="mb-24 text-center max-w-3xl mx-auto"
        >
          <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-4 block">The Bilkul Method</span>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">How We Build</h2>
          <p className="text-xl text-muted-foreground font-light">A rigorous, scientific approach to creative problems.</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-1/2">
             <motion.div 
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-primary via-cyan-400 to-primary shadow-[0_0_15px_1px_rgba(56,189,248,0.5)]"
             />
          </div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row gap-8 items-start md:items-center",
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Number Bubble */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-[#05050A] border border-white/10 flex items-center justify-center font-mono text-xs text-primary shadow-2xl z-10 group ring-4 ring-background">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-0 group-hover:opacity-30 transition-opacity" />
                  <span className="relative z-10 font-bold">{step.number}</span>
                </div>

                {/* Content */}
                <div className={cn(
                  "ml-16 md:ml-0 md:w-[42%] p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:border-white/10 backdrop-blur-sm group",
                  index % 2 === 0 ? "md:text-left" : "md:text-right"
                )}>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{step.title}</h3>
                  <div className={cn("flex flex-wrap gap-2 mb-6", index % 2 === 0 ? "" : "md:justify-end")}>
                    {step.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded border border-white/5">
                            {tag}
                        </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg font-light">
                    {step.desc}
                  </p>
                </div>
                
                {/* Spacer */}
                <div className="hidden md:block md:w-[42%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}