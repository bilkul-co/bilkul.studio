import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We deep-dive into your business logic, audience, and operational bottlenecks."
  },
  {
    number: "02",
    title: "Strategy & Architecture",
    desc: "We map out the system, user flows, and technical stack before a pixel is drawn."
  },
  {
    number: "03",
    title: "Design & Prototype",
    desc: "High-fidelity visuals and interactive prototypes to validate the experience."
  },
  {
    number: "04",
    title: "Development",
    desc: "Clean, scalable code built on modern frameworks. Performance is paramount."
  },
  {
    number: "05",
    title: "Launch & Optimize",
    desc: "Seamless deployment followed by data-driven iteration and support."
  }
];

export function ProcessTimeline() {
  return (
    <section className="py-32 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">The Bilkul Method</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">How We Build</h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2" />

          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-background md:bg-transparent p-6 md:p-0 rounded-xl border border-white/5 md:border-none z-10"
              >
                <div className="w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center font-mono text-sm text-primary mb-6 shadow-xl shadow-black/50 mx-auto md:mx-0 relative z-20">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 md:pr-4">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}