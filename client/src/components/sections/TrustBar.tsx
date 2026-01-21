import { motion } from "framer-motion";

const trustItems = [
  "Systems-first Architecture",
  "UAE-ready Compliance",
  "Enterprise Security",
  "Performance Obsessed",
  "AI-Native Workflows",
  "Scalable Infrastructure", // Added for infinite loop smoothness
  "Data Privacy First",      // Added for infinite loop smoothness
];

export function TrustBar() {
  return (
    <section className="py-10 border-y border-white/5 bg-white/[0.02] overflow-hidden">
      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 opacity-50 hover:opacity-100 transition-opacity duration-500">
          {[...trustItems, ...trustItems, ...trustItems].map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--aquamarine)] shadow-[0_0_10px_var(--aquamarine)]" />
              <span className="text-sm font-mono uppercase tracking-[0.2em] font-medium">{item}</span>
            </div>
          ))}
        </div>
        
        {/* Clone for seamless loop */}
        <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap gap-16 md:gap-32 opacity-50 hover:opacity-100 transition-opacity duration-500">
           {[...trustItems, ...trustItems, ...trustItems].map((item, index) => (
            <div 
              key={`clone-${index}`}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--aquamarine)] shadow-[0_0_10px_var(--aquamarine)]" />
              <span className="text-sm font-mono uppercase tracking-[0.2em] font-medium">{item}</span>
            </div>
          ))}
        </div>
        
        {/* Fade masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030305] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030305] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}