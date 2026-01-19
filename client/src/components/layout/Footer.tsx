import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#05080f] border-t border-white/[0.05] pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--rare-blue)]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <Link href="/">
              <a className="flex items-center gap-2 mb-6 group">
                <div className="relative w-8 h-8">
                    <img src="/brand/logo.png" alt="Bilkul" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-2xl font-display font-bold tracking-tighter text-white">
                  Bilkul<span className="text-[var(--aquamarine)]">.</span>
                </span>
              </a>
            </Link>
            <p className="text-white/50 max-w-md text-lg font-light leading-relaxed">
              Building the digital operating layer for next-generation businesses in the UAE and beyond.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-8 text-white">Sitemap</h4>
            <ul className="space-y-4">
              <li><Link href="/services"><a className="text-white/50 hover:text-[var(--aquamarine)] transition-colors">Services</a></Link></li>
              <li><Link href="/ai-integration"><a className="text-white/50 hover:text-[var(--aquamarine)] transition-colors">AI Integration</a></Link></li>
              <li><Link href="/work"><a className="text-white/50 hover:text-[var(--aquamarine)] transition-colors">Work</a></Link></li>
              <li><Link href="/about"><a className="text-white/50 hover:text-[var(--aquamarine)] transition-colors">About</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-8 text-white">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/50 hover:text-[var(--aquamarine)] transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-white/50 hover:text-[var(--aquamarine)] transition-colors">Twitter</a></li>
              <li><a href="#" className="text-white/50 hover:text-[var(--aquamarine)] transition-colors">Instagram</a></li>
              <li><Link href="/contact"><a className="text-white/50 hover:text-[var(--aquamarine)] transition-colors">Contact Us</a></Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
          <p>© 2026 Bilkul Technologies. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy"><a className="hover:text-white transition-colors">Privacy Policy</a></Link>
            <Link href="/terms"><a className="hover:text-white transition-colors">Terms of Service</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}