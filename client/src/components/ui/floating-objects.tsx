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

  const springConfig = { stiffness: 60, damping: 30, restDelta: 0.001 };
  
  // Parallax layers
  const yLayer1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 800]), springConfig);
  const yLayer2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 400]), springConfig);
  const yLayer3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig);
  
  // Rotations
  const rotate1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 180]), springConfig);
  const rotate2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -90]), springConfig);
  const rotate3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 360]), springConfig);

  return (
    <div ref={ref} className="fixed inset-0 overflow-hidden pointer-events-none z-0 h-screen w-screen">
      
      {/* SECTION 1: TOP AREA (HERO) */}
      <motion.div style={{ y: yLayer1, rotate: rotate1 }} className="absolute top-[5%] left-[5%] w-32 md:w-48 opacity-80 z-10">
        <img src={shapes.torus} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "0s" }} />
      </motion.div>

      <motion.div style={{ y: yLayer2, rotate: rotate2 }} className="absolute top-[15%] right-[8%] w-40 md:w-56 opacity-90 z-10">
        <img src={shapes.blobIridescent} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "1s" }} />
      </motion.div>

      {/* SECTION 2: UPPER MID */}
      <motion.div style={{ y: yLayer3, rotate: rotate3 }} className="absolute top-[30%] left-[20%] w-24 md:w-32 opacity-70 blur-[1px]">
        <img src={shapes.sphere} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "2s" }} />
      </motion.div>

      <motion.div style={{ y: yLayer1, rotate: rotate2 }} className="absolute top-[25%] right-[25%] w-20 md:w-28 opacity-60">
        <img src={shapes.diamond} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "3s" }} />
      </motion.div>

      {/* SECTION 3: MID */}
      <motion.div style={{ y: yLayer2, rotate: rotate1 }} className="absolute top-[50%] left-[8%] w-36 md:w-48 opacity-60 blur-[1px]">
        <img src={shapes.cubesFalling} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "1.5s" }} />
      </motion.div>

      <motion.div style={{ y: yLayer3, rotate: rotate3 }} className="absolute top-[45%] right-[5%] w-32 md:w-44 opacity-80">
        <img src={shapes.jack} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "0.5s" }} />
      </motion.div>

      {/* SECTION 4: LOWER MID */}
      <motion.div style={{ y: yLayer1, rotate: rotate2 }} className="absolute top-[65%] left-[25%] w-28 md:w-36 opacity-70">
         <img src={shapes.coil} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "4s" }} />
      </motion.div>

      <motion.div style={{ y: yLayer2, rotate: rotate1 }} className="absolute top-[70%] right-[15%] w-40 md:w-52 opacity-50 blur-[2px]">
        <img src={shapes.tube} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "2.5s" }} />
      </motion.div>

      {/* SECTION 5: BOTTOM */}
      <motion.div style={{ y: yLayer3, rotate: rotate3 }} className="absolute top-[85%] left-[10%] w-32 md:w-44 opacity-60">
        <img src={shapes.lightning} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "3.5s" }} />
      </motion.div>

      <motion.div style={{ y: yLayer1, rotate: rotate2 }} className="absolute top-[90%] right-[20%] w-24 md:w-32 opacity-70">
        <img src={shapes.star} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "1s" }} />
      </motion.div>
      
       {/* Background Deep Elements (Slow Moving) */}
       <motion.div 
        style={{ y: useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), springConfig) }}
        className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] opacity-10 blur-[80px]"
      >
        <img src={shapes.blobDark} alt="" className="w-full h-full object-contain" />
      </motion.div>

      <motion.div 
        style={{ y: useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig) }}
        className="absolute bottom-[20%] left-[30%] -translate-x-1/2 w-[700px] opacity-10 blur-[90px]"
      >
        <img src={shapes.blobDark} alt="" className="w-full h-full object-contain rotate-180" />
      </motion.div>
    </div>
  );
}