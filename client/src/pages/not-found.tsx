import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 opacity-20" />
      
      <GlassCard className="w-full max-w-md mx-6 relative z-10 text-center py-12">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
            <AlertCircle className="h-8 w-8" />
          </div>
        </div>
        
        <h1 className="text-4xl font-display font-bold mb-2">404</h1>
        <p className="text-xl font-medium mb-6">System Error: Page Not Found</p>
        
        <p className="text-muted-foreground mb-8">
          The requested route does not exist in our operating layer.
        </p>

        <Link href="/">
          <MotionButton className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Base
          </MotionButton>
        </Link>
      </GlassCard>
    </div>
  );
}