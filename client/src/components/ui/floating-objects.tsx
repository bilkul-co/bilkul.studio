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
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), springConfig);
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig);
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), springConfig);
  const rotate1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 45]), springConfig);
  const rotate2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -45]), springConfig);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Left Cluster */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[10%] left-[5%] w-32 md:w-48 opacity-80"
      >
        <img src={shapes.torus} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "0s" }} />
      </motion.div>

      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[20%] left-[15%] w-24 md:w-32 opacity-60 blur-[2px]"
      >
        <img src={shapes.sphere} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "2s" }} />
      </motion.div>

      {/* Top Right Cluster */}
      <motion.div 
        style={{ y: y3, rotate: rotate2 }}
        className="absolute top-[15%] right-[8%] w-40 md:w-56 opacity-90"
      >
        <img src={shapes.blobIridescent} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "1s" }} />
      </motion.div>

      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[35%] right-[20%] w-20 md:w-28 opacity-70"
      >
        <img src={shapes.diamond} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "3s" }} />
      </motion.div>

      {/* Bottom Floating Elements */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[20%] left-[10%] w-28 md:w-40 opacity-50 blur-[1px]"
      >
        <img src={shapes.coil} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "4s" }} />
      </motion.div>

      <motion.div 
        style={{ y: y3, rotate: rotate1 }}
        className="absolute bottom-[30%] right-[10%] w-36 md:w-48 opacity-60"
      >
        <img src={shapes.star} alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: "1.5s" }} />
      </motion.div>
      
       {/* Background Deep Elements */}
       <motion.div 
        className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] opacity-10 blur-[80px]"
      >
        <img src={shapes.blobDark} alt="" className="w-full h-full object-contain" />
      </motion.div>
    </div>
  );
}