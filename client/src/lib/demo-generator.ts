import { PageBlueprint, PageBlueprintSchema } from "./demo-schema";

// Mock generator that simulates AI behavior
export async function generatePageBlueprint(
  prompt: string, 
  vibe: string
): Promise<PageBlueprint> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2500));

  const isClinic = prompt.toLowerCase().includes("clinic") || prompt.toLowerCase().includes("medical") || prompt.toLowerCase().includes("health");
  const isRealEstate = prompt.toLowerCase().includes("estate") || prompt.toLowerCase().includes("property") || prompt.toLowerCase().includes("home");
  const isEcommerce = prompt.toLowerCase().includes("store") || prompt.toLowerCase().includes("shop") || prompt.toLowerCase().includes("commerce");

  // Base template
  let blueprint: PageBlueprint = {
    brandName: "Nexus Digital",
    tagline: "Future of Innovation",
    tone: "modern-minimal",
    primaryColor: "rareBlue",
    sections: []
  };

  if (isClinic) {
    blueprint = {
      brandName: "Aura Medical",
      tagline: "Reimagining Patient Care",
      tone: "calm-luxury",
      primaryColor: "turquoise",
      sections: [
        {
          type: "hero",
          headline: "World-Class Healthcare, Redefined.",
          subheadline: "Experience a new standard of medical excellence with personalized care plans and cutting-edge diagnostics.",
          ctaPrimary: "Book Consultation",
          ctaSecondary: "Our Services"
        },
        {
          type: "trustBar",
          items: ["Mayo Clinic Certified", "Top 100 Hospitals", "JCI Accredited", "24/7 Support"]
        },
        {
          type: "features",
          headline: "Why Choose Aura",
          items: [
            { title: "Expert Specialists", desc: "Board-certified doctors with decades of experience.", icon: "Stethoscope" },
            { title: "Advanced Technology", desc: "State-of-the-art diagnostic equipment.", icon: "Activity" },
            { title: "Patient-First Care", desc: "Your comfort and recovery are our top priorities.", icon: "Heart" }
          ]
        },
        {
          type: "testimonials",
          headline: "Patient Stories",
          items: [
            { name: "Sarah J.", role: "Patient", quote: "The level of care I received was absolutely phenomenal. I felt heard and cared for." },
            { name: "Michael R.", role: "Patient", quote: "A truly modern clinic. No wait times, digital records, and amazing staff." }
          ]
        },
        {
          type: "cta",
          headline: "Ready to Prioritize Your Health?",
          subheadline: "Schedule your first appointment today and take the first step towards a healthier you.",
          cta: "Book Now"
        }
      ]
    };
  } else if (isRealEstate) {
    blueprint = {
      brandName: "Vantage Properties",
      tagline: "Luxury Living, Elevated",
      tone: "bold-premium",
      primaryColor: "aquamarine",
      sections: [
        {
          type: "hero",
          headline: "Find Your Dream Sanctuary.",
          subheadline: "Exclusive listings in the world's most coveted neighborhoods. Discover a home that reflects your achievements.",
          ctaPrimary: "View Listings",
          ctaSecondary: "Sell with Us"
        },
        {
          type: "trustBar",
          items: ["Featured in ArchDigest", "Forbes Global Properties", "$2B+ Sold", "Elite Network"]
        },
        {
          type: "showcase",
          headline: "Featured Collections",
          items: [
            { title: "Waterfront Villas", desc: "Breathtaking ocean views and private beaches." },
            { title: "Urban Penthouses", desc: "Sky-high luxury in the heart of the city." },
            { title: "Historic Estates", desc: "Timeless architecture meets modern comfort." }
          ]
        },
        {
          type: "faq",
          headline: "Common Questions",
          items: [
             { q: "Do you handle international buyers?", a: "Yes, we specialize in seamless cross-border transactions." },
             { q: "What is your commission rate?", a: "We offer competitive rates tailored to property value and marketing needs." }
          ]
        },
        {
          type: "cta",
          headline: "Unlock Exclusive Access",
          subheadline: "Join our private client list for off-market opportunities.",
          cta: "Join Now"
        }
      ]
    };
  } else {
    // Generic fallback (Agency/SaaS)
    blueprint = {
      brandName: "Nova Systems",
      tagline: "Scale Without Limits",
      tone: "futuristic-glass",
      primaryColor: "rareBlue",
      sections: [
        {
          type: "hero",
          headline: "Accelerate Your Digital Evolution.",
          subheadline: "We build high-performance platforms that drive growth and efficiency for modern enterprises.",
          ctaPrimary: "Start Free Trial",
          ctaSecondary: "View Demo"
        },
        {
          type: "trustBar",
          items: ["Trusted by Fortune 500", "SOC2 Certified", "99.99% Uptime", "Global Support"]
        },
        {
          type: "features",
          headline: "Power Your Growth",
          items: [
            { title: "AI-Driven Analytics", desc: "Gain actionable insights with our predictive models.", icon: "BarChart" },
            { title: "Seamless Integration", desc: "Connect with your favorite tools in seconds.", icon: "Zap" },
            { title: "Enterprise Security", desc: "Bank-grade encryption for your peace of mind.", icon: "ShieldCheck" }
          ]
        },
         {
          type: "testimonials",
          headline: "What Leaders Say",
          items: [
            { name: "David K.", role: "CTO, TechCorp", quote: "Nova Systems transformed how we handle data. A game changer." },
            { name: "Elena S.", role: "Founder, StartUp", quote: "Incredible speed and reliability. Highly recommended." }
          ]
        },
        {
          type: "cta",
          headline: "Ready to Transform?",
          subheadline: "Join thousands of forward-thinking companies today.",
          cta: "Get Started"
        }
      ]
    };
  }

  // Override tone based on user input if provided
  if (vibe === "Calm Luxury") blueprint.tone = "calm-luxury";
  if (vibe === "Modern Minimal") blueprint.tone = "modern-minimal";
  if (vibe === "Bold Premium") blueprint.tone = "bold-premium";
  if (vibe === "Futuristic Glass") blueprint.tone = "futuristic-glass";

  return blueprint;
}