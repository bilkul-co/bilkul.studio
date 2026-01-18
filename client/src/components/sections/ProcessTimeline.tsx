import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Discovery & Audit",
    desc: "We deep-dive into your business logic, audience, and operational bottlenecks. We don't guess; we measure."
  },
  {
    number: "02",
    title: "System Architecture",
    desc: "We map out the data flows, user journeys, and technical stack. This is the blueprint for your digital engine."
  },
  {
    number: "03",
    title: "Design & Prototyping",
    desc: "High-fidelity visuals and interactive prototypes. You'll feel the product before a single line of code is written."
  },
  {
    number: "04",
    title: "Engineering",
    desc: "Clean, scalable code built on modern frameworks (Next.js, React, Node). Performance is non-negotiable."
  },
  {
    number: "05",
    title: "Launch & Optimization",
    desc: "Seamless deployment followed by data-driven iteration. We stick around to ensure the system scales."
  }
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-32 bg-background relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <span className="text-primary font-mono text-sm tracking-[0.2em] uppercase mb-4 block animate-pulse">The Bilkul Method</span>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">How We Build</h2>
          <p className="text-xl text-muted-foreground">A rigorous, scientific approach to creative problems.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2">
             <motion.div 
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-primary via-cyan-400 to-primary shadow-[0_0_10px_2px_rgba(56,189,248,0.3)]"
             />
          </div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row gap-8 items-start md:items-center",
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Number Bubble */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center font-mono text-xs text-primary shadow-[0_0_20px_-5px_rgba(0,0,0,1)] z-10 group">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20" />
                  <span className="relative bg-background rounded-full w-full h-full flex items-center justify-center border border-white/5">{step.number}</span>
                </div>

                {/* Content */}
                <div className={cn(
                  "ml-16 md:ml-0 md:w-[45%] p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors backdrop-blur-sm",
                  index % 2 === 0 ? "md:text-left" : "md:text-right"
                )}>
                  <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {step.desc}
                  </p>
                </div>
                
                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}