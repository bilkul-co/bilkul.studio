import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const OrbitalBackground = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none bg-[#030305]", className)}>
      {/* 1. Deep Atmospheric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,107,255,0.08),transparent_70%)]" />
      
      {/* 2. Central Star/Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--rare-blue)]/5 blur-[100px] rounded-full mix-blend-screen" />

      {/* 3. Orbital Rings Container - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-30">
        
        {/* Ring 1 - Slowest */}
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-white/5"
        />
        
        {/* Ring 2 - Medium */}
        <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%] rounded-full border border-white/[0.03] border-dashed"
        />

        {/* Ring 3 - Planet / Satellite */}
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] left-[20%] right-[20%] bottom-[20%] rounded-full border border-white/5"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/20 rounded-full blur-[1px] shadow-[0_0_15px_white]" />
        </motion.div>

        {/* Ring 4 - Inner */}
        <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
             className="absolute top-[35%] left-[35%] right-[35%] bottom-[35%] rounded-full border border-white/[0.08]"
        />
      </div>

      {/* 4. Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
    </div>
  );
};
