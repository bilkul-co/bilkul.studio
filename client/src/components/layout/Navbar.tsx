import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { MotionButton } from "@/components/ui/motion-button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "AI Integration", href: "/ai-integration" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "w-full max-w-5xl rounded-full transition-all duration-300 border backdrop-blur-xl",
          scrolled || isOpen 
            ? "bg-black/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] py-3" 
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="px-6 md:px-8 flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-display font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-1">
              Bilkul<span className="text-primary animate-pulse">.</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group",
                    location === link.href ? "text-white" : "text-muted-foreground hover:text-white"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  {location === link.href && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/5 shadow-inner"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/contact">
              <MotionButton size="sm" className="rounded-full px-6 h-10 text-xs font-semibold bg-white text-black hover:bg-white/90 border-none shadow-[0_0_15px_-3px_rgba(255,255,255,0.4)]">
                Book a Call
              </MotionButton>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-24 left-4 right-4 glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl z-40 bg-[#05050A]"
          >
            <div className="p-2 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <a
                    className={cn(
                        "text-lg font-medium p-4 rounded-2xl transition-all flex justify-between items-center",
                        location === link.href ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                    {location === link.href && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />}
                  </a>
                </Link>
              ))}
              <div className="h-px bg-white/5 my-2 mx-4" />
              <div className="p-2">
                <Link href="/contact">
                    <MotionButton className="w-full rounded-xl py-6 text-base font-semibold" onClick={() => setIsOpen(false)}>
                    Book a Call
                    </MotionButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}