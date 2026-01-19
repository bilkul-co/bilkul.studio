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
    { name: "Pricing", href: "/pricing" }, // Updated to match Framer site usually
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6 pointer-events-none">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "w-full max-w-6xl rounded-full transition-all duration-300 pointer-events-auto",
          scrolled || isOpen 
            ? "bg-white/80 border border-slate-200 shadow-lg shadow-black/5 backdrop-blur-xl py-2.5 px-2" 
            : "bg-transparent py-4"
        )}
      >
        <div className="px-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="relative w-8 h-8">
                <img 
                  src="/brand/logo.png" 
                  alt="Bilkul Digital Studio" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className={cn(
                "text-xl font-display font-bold tracking-tight transition-colors",
                scrolled ? "text-slate-900" : "text-slate-900" 
              )}>
                Bilkul<span className="text-[var(--rare-blue)]">.</span>
              </span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-slate-100",
                    location === link.href ? "text-slate-900 bg-slate-100" : "text-slate-600"
                  )}
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
             <Link href="/login">
                <a className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3">Log in</a>
             </Link>
             <Link href="/contact">
              <MotionButton size="sm" className="rounded-full px-6 h-10 text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 border-0">
                Book a Call
              </MotionButton>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-900 p-2 rounded-full hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="absolute top-24 left-4 right-4 bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-2xl z-40 pointer-events-auto p-4"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <a
                    className={cn(
                        "text-lg font-medium p-4 rounded-xl transition-all flex justify-between items-center",
                        location === link.href ? "bg-slate-50 text-slate-900" : "text-slate-600 hover:bg-slate-50"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <Link href="/contact">
                  <MotionButton className="w-full rounded-xl py-4 text-base font-bold bg-[var(--rare-blue)] text-white shadow-lg shadow-blue-200" onClick={() => setIsOpen(false)}>
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