import { Variants, Transition, Easing } from "framer-motion";

const easeInOut: Easing = [0.16, 1, 0.3, 1];
const easeOut: Easing = "easeOut";

export const transitions = {
  page: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.6, ease: easeInOut }
  } as Variants,
  section: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: easeInOut }
  },
  card: {
    initial: { opacity: 0, scale: 0.98 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: easeOut }
  },
  stagger: {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } }
    }
  },
  button: {
    tap: { scale: 0.94 },
    hover: { scale: 1.02 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
};
