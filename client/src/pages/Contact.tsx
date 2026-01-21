import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LeadForm } from "@/components/sections/LeadForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
                 <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white">Let's Build <br/><span className="text-[var(--aquamarine)]">The Future.</span></h1>
                 <p className="text-xl text-white/60 mb-12 font-light leading-relaxed">
                    Whether you have a groundbreaking idea or need to modernize your existing infrastructure, we are ready to engineer your vision.
                 </p>
                 
                 <div className="space-y-8">
                    <div>
                        <h3 className="text-white font-mono text-sm uppercase tracking-wider opacity-50 mb-2">Call Us</h3>
                        <p className="text-2xl text-white font-medium hover:text-[var(--aquamarine)] transition-colors cursor-pointer">+971 55 563 9160</p>
                    </div>
                    <div>
                        <h3 className="text-white font-mono text-sm uppercase tracking-wider opacity-50 mb-2">Visit Us</h3>
                        <p className="text-2xl text-white font-medium">Bilkul Technologies</p>
                        <p className="text-lg text-white/60">Jumeirah Garden City, Dubai, UAE</p>
                    </div>
                    <div>
                        <h3 className="text-white font-mono text-sm uppercase tracking-wider opacity-50 mb-2">Email</h3>
                        <p className="text-2xl text-white font-medium hover:text-[var(--aquamarine)] transition-colors cursor-pointer">hello@bilkul.ae</p>
                    </div>
                 </div>
            </div>
            <div className="md:w-1/2">
                <LeadForm />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}