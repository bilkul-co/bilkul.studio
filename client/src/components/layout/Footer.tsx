import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/">
              <a className="text-2xl font-display font-bold tracking-tighter mb-4 block">
                Bilkul<span className="text-primary">.</span>
              </a>
            </Link>
            <p className="text-muted-foreground max-w-md text-lg">
              Building the digital operating layer for next-generation businesses in the UAE and beyond.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-6">Sitemap</h4>
            <ul className="space-y-4">
              <li><Link href="/services"><a className="text-muted-foreground hover:text-primary transition-colors">Services</a></Link></li>
              <li><Link href="/ai-integration"><a className="text-muted-foreground hover:text-primary transition-colors">AI Integration</a></Link></li>
              <li><Link href="/work"><a className="text-muted-foreground hover:text-primary transition-colors">Work</a></Link></li>
              <li><Link href="/about"><a className="text-muted-foreground hover:text-primary transition-colors">About</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a></li>
              <li><Link href="/contact"><a className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Bilkul Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}