import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

// Updated Asset paths using new blue 3D shapes
const shapes = {
  triangleRounded: "/assets/shapes-new/blue-triangle-rounded.png",
  torusKnot: "/assets/shapes-new/blue-torus-knot.png",
  cubeHole: "/assets/shapes-new/blue-cube-hole.png",
  crossRounded: "/assets/shapes-new/blue-cross-rounded.png",
  jackRounded: "/assets/shapes-new/blue-jack-rounded.png",
  torus: "/assets/shapes-new/blue-torus.png",
  dodecahedron: "/assets/shapes-new/blue-dodecahedron.png",
  starBurst: "/assets/shapes-new/blue-star-burst.png",
  diamondDouble: "/assets/shapes-new/blue-diamond-double.png",
  hexagon: "/assets/shapes-new/blue-hexagon.png",
  tubeCurve: "/assets/shapes-new/blue-tube-curve-c.png",
  spring: "/assets/shapes-new/blue-spring.png",
  starFour: "/assets/shapes-new/blue-star-four.png",
  cylinderHole: "/assets/shapes-new/blue-cylinder-hole.png",
  pyramidTall: "/assets/shapes-new/blue-pyramid-tall.png",
  blueTorus: "/assets/shapes-new/blue-torus.png",
  
  // Legacy or backup shapes if needed, though we will replace most
  blobDark: "/assets/shapes/blob-dark.png",
};

export function FloatingObjects() {
  const { scrollYProgress } = useScroll();

  const springConfig = { stiffness: 30, damping: 20, restDelta: 0.001 };
  
  // Create distinct vertical tracks for parallax to prevent collision
  // Track 1: Fast (Foreground) - Move faster
  const yFast = useSpring(useTransform(scrollYProgress, [0, 1], [0, -2500]), springConfig);
  
  // Track 2: Medium (Midground)
  const yMedium = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1500]), springConfig);
  
  // Track 3: Slow (Background)
  const ySlow = useSpring(useTransform(scrollYProgress, [0, 1], [0, -800]), springConfig);
  
  // Reverse direction tracks for variety (Objects moving UP as you scroll DOWN)
  const yReverseMedium = useSpring(useTransform(scrollYProgress, [0, 1], [0, 800]), springConfig);
  const yReverseFast = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1200]), springConfig);

  // Rotations - Continuous
  const rotateSlow = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), springConfig);
  const rotateFast = useSpring(useTransform(scrollYProgress, [0, 1], [0, 240]), springConfig);
  const rotateReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), springConfig);
  
  // Scales (Subtle breathing effect or zoom on scroll)
  const scaleEffect = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]), springConfig);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 h-full w-full">
      {/* 
        GRID DISTRIBUTION STRATEGY:
        Expanded to cover more vertical space since we have scroll animations.
      */}

      {/* --- ZONE 1: TOP LEFT (Hero Area) --- */}
      <motion.div 
        style={{ y: yMedium, rotate: rotateSlow }} 
        className="absolute top-[5%] left-[2%] w-[14vw] max-w-[200px] opacity-90 z-10"
      >
        <img src={shapes.torusKnot} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "0s" }} />
      </motion.div>

      {/* --- ZONE 2: TOP RIGHT (Hero Area) --- */}
      <motion.div 
        style={{ y: yFast, rotate: rotateFast }} 
        className="absolute top-[10%] right-[3%] w-[18vw] max-w-[260px] opacity-100 z-20"
      >
        <img src={shapes.dodecahedron} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "1.5s" }} />
      </motion.div>

      {/* --- ZONE 3: UPPER MID LEFT (Service Area) --- */}
      <motion.div 
        style={{ y: ySlow, rotate: rotateReverse }} 
        className="absolute top-[25%] left-[10%] w-[12vw] max-w-[160px] opacity-70 blur-[1px] z-0"
      >
        <img src={shapes.dodecahedron} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "2.5s" }} />
      </motion.div>

      {/* --- ZONE 4: UPPER MID RIGHT --- */}
      <motion.div 
        style={{ y: yReverseMedium, rotate: rotateSlow }} 
        className="absolute top-[30%] right-[15%] w-[10vw] max-w-[140px] opacity-80 z-10"
      >
        <img src={shapes.diamondDouble} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "3s" }} />
      </motion.div>

      {/* --- ZONE 5: CENTER FLOAT (Transition) --- */}
      <motion.div 
        style={{ y: yMedium, rotate: rotateFast, scale: scaleEffect }} 
        className="absolute top-[45%] left-[30%] w-[16vw] max-w-[220px] opacity-60 z-0"
      >
        <img src={shapes.cubeHole} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "0.5s" }} />
      </motion.div>

      {/* --- ZONE 6: MID LEFT (Work Area) --- */}
      <motion.div 
        style={{ y: yFast, rotate: rotateReverse }} 
        className="absolute top-[55%] left-[5%] w-[13vw] max-w-[180px] opacity-80 z-10"
      >
        <img src={shapes.spring} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "4s" }} />
      </motion.div>

      {/* --- ZONE 7: MID RIGHT (Work Area) --- */}
      <motion.div 
        style={{ y: ySlow, rotate: rotateFast }} 
        className="absolute top-[60%] right-[8%] w-[15vw] max-w-[210px] opacity-75 z-10"
      >
        <img src={shapes.jackRounded} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "1.2s" }} />
      </motion.div>

      {/* --- ZONE 8: LOWER LEFT (Footer/Bottom) --- */}
      <motion.div 
        style={{ y: yReverseFast, rotate: rotateSlow }} 
        className="absolute top-[75%] left-[12%] w-[16vw] max-w-[240px] opacity-50 blur-[1px] z-0"
      >
        <img src={shapes.tubeCurve} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "2.5s" }} />
      </motion.div>

      {/* --- ZONE 9: LOWER RIGHT (Footer/Bottom) --- */}
      <motion.div 
        style={{ y: yFast, rotate: rotateFast }} 
        className="absolute top-[85%] right-[10%] w-[14vw] max-w-[190px] opacity-80 z-10"
      >
        <img src={shapes.starBurst} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "3.5s" }} />
      </motion.div>
      
      {/* --- ZONE 10: DEEP SCROLL (Far Bottom 1) --- */}
      <motion.div 
        style={{ y: yMedium, rotate: rotateReverse }} 
        className="absolute top-[110%] left-[25%] w-[14vw] max-w-[200px] opacity-70 z-10"
      >
        <img src={shapes.blueTorus} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "1.0s" }} 
             onError={(e) => e.currentTarget.src = shapes.torus}
        />
      </motion.div>

      {/* --- ZONE 11: DEEP SCROLL (Far Bottom 2) --- */}
      <motion.div 
        style={{ y: yFast, rotate: rotateFast }} 
        className="absolute top-[130%] right-[20%] w-[18vw] max-w-[250px] opacity-90 z-20"
      >
        <img src={shapes.pyramidTall} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "2.8s" }} />
      </motion.div>

       {/* --- EXTRA ACCENTS --- */}
      <motion.div style={{ y: yMedium, rotate: rotateSlow }} className="absolute top-[20%] left-[50%] w-[8vw] max-w-[100px] opacity-60">
          <img src={shapes.starFour} className="w-full object-contain animate-float" alt="" style={{ animationDelay: "1s" }} />
      </motion.div>
      
      <motion.div style={{ y: yReverseMedium, rotate: rotateFast }} className="absolute top-[65%] left-[45%] w-[10vw] max-w-[130px] opacity-50 blur-[1px]">
          <img src={shapes.cylinderHole} className="w-full object-contain animate-float" alt="" style={{ animationDelay: "2.2s" }} />
      </motion.div>

      <motion.div style={{ y: ySlow, rotate: rotateReverse }} className="absolute top-[80%] right-[35%] w-[12vw] max-w-[150px] opacity-60">
          <img src={shapes.pyramidTall} className="w-full object-contain animate-float" alt="" style={{ animationDelay: "0.8s" }} />
      </motion.div>
      
      <motion.div style={{ y: yFast, rotate: rotateSlow }} className="absolute top-[40%] right-[40%] w-[6vw] max-w-[80px] opacity-40">
          <img src={shapes.hexagon} className="w-full object-contain animate-float" alt="" style={{ animationDelay: "3.2s" }} />
      </motion.div>
      
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
