import { Variants, Transition, Easing } from "framer-motion";

const easeInOut: Easing = [0.16, 1, 0.3, 1];
const easeOut: Easing = "easeOut";
const easeElastic: Easing = [0.175, 0.885, 0.32, 1.275]; // Bouncy

export const transitions = {
  page: {
    initial: { opacity: 0, y: 10, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -10, filter: "blur(10px)" },
    transition: { duration: 0.8, ease: easeInOut }
  } as Variants,
  section: {
    initial: { opacity: 0, y: 30, filter: "blur(4px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: easeInOut }
  },
  card: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: easeElastic }
  },
  stagger: {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.1
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
      show: { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: easeElastic } 
      }
    }
  },
  button: {
    tap: { scale: 0.92, filter: "brightness(0.9)" },
    hover: { scale: 1.05, filter: "brightness(1.1)" },
    transition: { type: "spring", stiffness: 400, damping: 15 }
  },
  textReveal: {
    hidden: { y: "100%" },
    visible: { 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  }
};
