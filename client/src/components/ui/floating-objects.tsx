import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

// Asset paths
const shapes = {
  cylinder: "/assets/shapes/cylinder.png",
  cone: "/assets/shapes/cone.png",
  lightning: "/assets/shapes/lightning.png",
  jack: "/assets/shapes/jack.png",
  cubesFalling: "/assets/shapes/cubes-falling.png",
  coil: "/assets/shapes/coil.png",
  sphere: "/assets/shapes/sphere.png",
  diamond: "/assets/shapes/diamond.png",
  triangle: "/assets/shapes/triangle.png",
  cube: "/assets/shapes/cube.png",
  star: "/assets/shapes/star.png",
  blobDark: "/assets/shapes/blob-dark.png",
  cubesCluster: "/assets/shapes/cubes-cluster.png",
  torus: "/assets/shapes/torus.png",
  blobIridescent: "/assets/shapes/blob-iridescent.png",
  tube: "/assets/shapes/tube.png",
};

export function FloatingObjects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 40, damping: 20, restDelta: 0.001 };
  
  // Create distinct vertical tracks for parallax to prevent collision
  // Track 1: Fast (Foreground)
  const yFast = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1500]), springConfig);
  
  // Track 2: Medium (Midground)
  const yMedium = useSpring(useTransform(scrollYProgress, [0, 1], [0, -800]), springConfig);
  
  // Track 3: Slow (Background)
  const ySlow = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), springConfig);
  
  // Reverse direction tracks for variety
  const yReverseMedium = useSpring(useTransform(scrollYProgress, [0, 1], [0, 600]), springConfig);

  // Rotations
  const rotateSlow = useSpring(useTransform(scrollYProgress, [0, 1], [0, 45]), springConfig);
  const rotateFast = useSpring(useTransform(scrollYProgress, [0, 1], [0, 180]), springConfig);
  const rotateReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -90]), springConfig);

  return (
    <div ref={ref} className="fixed inset-0 overflow-hidden pointer-events-none z-0 h-[120vh] w-full">
      {/* 
        GRID DISTRIBUTION STRATEGY:
        Divide screen into roughly 6 zones (Top-Left, Top-Right, Mid-Left, Mid-Right, Bot-Left, Bot-Right)
        and ensure spacing.
      */}

      {/* --- ZONE 1: TOP LEFT (Hero Area) --- */}
      <motion.div 
        style={{ y: yMedium, rotate: rotateSlow }} 
        className="absolute top-[8%] left-[3%] w-[12vw] max-w-[180px] opacity-90 z-10"
      >
        <img src={shapes.torus} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "0s" }} />
      </motion.div>

      {/* --- ZONE 2: TOP RIGHT (Hero Area) --- */}
      <motion.div 
        style={{ y: yFast, rotate: rotateFast }} 
        className="absolute top-[12%] right-[5%] w-[16vw] max-w-[240px] opacity-100 z-20"
      >
        <img src={shapes.blobIridescent} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "1.5s" }} />
      </motion.div>

      {/* --- ZONE 3: UPPER MID LEFT (Service Area) --- */}
      <motion.div 
        style={{ y: ySlow, rotate: rotateReverse }} 
        className="absolute top-[35%] left-[8%] w-[10vw] max-w-[140px] opacity-70 blur-[1px] z-0"
      >
        <img src={shapes.sphere} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "2.5s" }} />
      </motion.div>

      {/* --- ZONE 4: UPPER MID RIGHT --- */}
      <motion.div 
        style={{ y: yReverseMedium, rotate: rotateSlow }} 
        className="absolute top-[40%] right-[12%] w-[9vw] max-w-[120px] opacity-80 z-10"
      >
        <img src={shapes.diamond} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "3s" }} />
      </motion.div>

      {/* --- ZONE 5: CENTER FLOAT (Transition) --- */}
      <motion.div 
        style={{ y: yMedium, rotate: rotateFast }} 
        className="absolute top-[55%] left-[25%] w-[14vw] max-w-[200px] opacity-60 z-0"
      >
        <img src={shapes.cubesFalling} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "0.5s" }} />
      </motion.div>

      {/* --- ZONE 6: MID LEFT (Work Area) --- */}
      <motion.div 
        style={{ y: yFast, rotate: rotateReverse }} 
        className="absolute top-[65%] left-[5%] w-[11vw] max-w-[160px] opacity-80 z-10"
      >
        <img src={shapes.coil} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "4s" }} />
      </motion.div>

      {/* --- ZONE 7: MID RIGHT (Work Area) --- */}
      <motion.div 
        style={{ y: ySlow, rotate: rotateFast }} 
        className="absolute top-[60%] right-[5%] w-[13vw] max-w-[190px] opacity-75 z-10"
      >
        <img src={shapes.jack} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "1.2s" }} />
      </motion.div>

      {/* --- ZONE 8: LOWER LEFT (Footer/Bottom) --- */}
      <motion.div 
        style={{ y: yReverseMedium, rotate: rotateSlow }} 
        className="absolute top-[80%] left-[15%] w-[15vw] max-w-[220px] opacity-50 blur-[2px] z-0"
      >
        <img src={shapes.tube} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "2s" }} />
      </motion.div>

      {/* --- ZONE 9: LOWER RIGHT (Footer/Bottom) --- */}
      <motion.div 
        style={{ y: yFast, rotate: rotateFast }} 
        className="absolute top-[85%] right-[8%] w-[12vw] max-w-[170px] opacity-80 z-10"
      >
        <img src={shapes.lightning} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "3.5s" }} />
      </motion.div>

      {/* Tiny Accents - Scattered without overlay */}
      <motion.div style={{ y: yMedium }} className="absolute top-[25%] left-[40%] w-8 opacity-60"><img src={shapes.star} className="w-full" alt="" /></motion.div>
      <motion.div style={{ y: ySlow }} className="absolute top-[75%] right-[35%] w-6 opacity-50"><img src={shapes.star} className="w-full" alt="" /></motion.div>
      
       {/* Background Deep Elements (Slow Moving Ambiance) */}
       <motion.div 
        style={{ y: useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig) }}
        className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[50vw] opacity-[0.08] blur-[100px] pointer-events-none"
      >
        <img src={shapes.blobDark} alt="" className="w-full h-full object-contain" />
      </motion.div>

      <motion.div 
        style={{ y: useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), springConfig) }}
        className="absolute top-[60%] left-[20%] w-[40vw] opacity-[0.05] blur-[80px] pointer-events-none"
      >
        <img src={shapes.blobDark} alt="" className="w-full h-full object-contain rotate-90" />
      </motion.div>
    </div>
  );
}