import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <Link href="/">
              <a className="flex items-center gap-2 mb-6 group">
                <div className="relative w-8 h-8">
                    <img src="/brand/logo.png" alt="Bilkul" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-display font-bold tracking-tight text-slate-900">
                  Bilkul<span className="text-blue-600">.</span>
                </span>
              </a>
            </Link>
            <p className="text-slate-500 max-w-md text-lg leading-relaxed">
              Building the digital operating layer for next-generation businesses in the UAE and beyond.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold mb-8 text-slate-900">Sitemap</h4>
            <ul className="space-y-4">
              <li><Link href="/services"><a className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Services</a></Link></li>
              <li><Link href="/pricing"><a className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Pricing</a></Link></li>
              <li><Link href="/work"><a className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Work</a></Link></li>
              <li><Link href="/about"><a className="text-slate-500 hover:text-blue-600 transition-colors font-medium">About</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-8 text-slate-900">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">LinkedIn</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Twitter</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Instagram</a></li>
              <li><Link href="/contact"><a className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Contact Us</a></Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2026 Bilkul Technologies. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy"><a className="hover:text-slate-900 transition-colors">Privacy Policy</a></Link>
            <Link href="/terms"><a className="hover:text-slate-900 transition-colors">Terms of Service</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}