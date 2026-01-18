import { motion } from "framer-motion";

const trustItems = [
  "Systems-first Architecture",
  "UAE-ready Compliance",
  "Enterprise Security",
  "Performance Obsessed",
  "AI-Native Workflows"
];

export function TrustBar() {
  return (
    <section className="py-10 border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50">
          {trustItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-sm font-mono uppercase tracking-wider">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}