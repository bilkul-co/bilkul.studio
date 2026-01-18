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
    <nav
      className={cn(
        "fixed top-4 left-0 right-0 z-50 transition-all duration-300 flex justify-center",
      )}
    >
      <div className={cn(
        "container mx-auto px-6 flex items-center justify-between transition-all duration-300 max-w-6xl rounded-full",
        scrolled ? "glass py-3 bg-black/40 border-white/10 backdrop-blur-md shadow-lg" : "py-6 bg-transparent"
      )}>
        <Link href="/">
          <a className="text-xl font-display font-bold tracking-tighter hover:opacity-80 transition-opacity pl-2">
            Bilkul<span className="text-primary">.</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group overflow-hidden",
                  location === link.href ? "text-white" : "text-muted-foreground hover:text-white"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                {location === link.href && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              </a>
            </Link>
          ))}
          <div className="ml-4 pl-4 border-l border-white/10">
            <Link href="/contact">
              <MotionButton size="sm" className="rounded-full px-6 h-9 text-xs bg-white text-black hover:bg-white/90 border-none shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                Book a Call
              </MotionButton>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground pr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-20 left-4 right-4 glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-50 bg-black/90"
          >
            <div className="p-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <a
                    className="text-lg font-medium text-foreground hover:text-primary p-4 rounded-xl hover:bg-white/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <Link href="/contact">
                <MotionButton className="w-full rounded-xl py-6" onClick={() => setIsOpen(false)}>
                  Book a Call
                </MotionButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}