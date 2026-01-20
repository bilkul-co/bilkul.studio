import { z } from "zod";

// --- SCHEMAS ---

export const ToneSchema = z.enum([
  "calm-luxury",
  "modern-minimal",
  "bold-premium",
  "futuristic-glass"
]);

export const ColorSchema = z.enum([
  "rareBlue",
  "aquamarine",
  "teal",
  "turquoise",
  "softPink"
]);

export const HeroSectionSchema = z.object({
  type: z.literal("hero"),
  headline: z.string(),
  subheadline: z.string(),
  ctaPrimary: z.string(),
  ctaSecondary: z.string().optional()
});

export const TrustBarSectionSchema = z.object({
  type: z.literal("trustBar"),
  items: z.array(z.string())
});

export const FeatureItemSchema = z.object({
  title: z.string(),
  desc: z.string(),
  icon: z.string() 
});

export const FeaturesSectionSchema = z.object({
  type: z.literal("features"),
  headline: z.string(),
  items: z.array(FeatureItemSchema)
});

export const ShowcaseItemSchema = z.object({
  title: z.string(),
  desc: z.string()
});

export const ShowcaseSectionSchema = z.object({
  type: z.literal("showcase"),
  headline: z.string(),
  items: z.array(ShowcaseItemSchema)
});

export const TestimonialItemSchema = z.object({
  name: z.string(),
  role: z.string(),
  quote: z.string()
});

export const TestimonialsSectionSchema = z.object({
  type: z.literal("testimonials"),
  headline: z.string(),
  items: z.array(TestimonialItemSchema)
});

export const FAQItemSchema = z.object({
  q: z.string(),
  a: z.string()
});

export const FAQSectionSchema = z.object({
  type: z.literal("faq"),
  headline: z.string(),
  items: z.array(FAQItemSchema)
});

export const CTASectionSchema = z.object({
  type: z.literal("cta"),
  headline: z.string(),
  subheadline: z.string(),
  cta: z.string()
});

export const SectionSchema = z.discriminatedUnion("type", [
  HeroSectionSchema,
  TrustBarSectionSchema,
  FeaturesSectionSchema,
  ShowcaseSectionSchema,
  TestimonialsSectionSchema,
  FAQSectionSchema,
  CTASectionSchema
]);

export const PageBlueprintSchema = z.object({
  id: z.string().optional(),
  createdAt: z.string().optional(),
  brandName: z.string(),
  tagline: z.string(),
  tone: ToneSchema,
  primaryColor: ColorSchema,
  sections: z.array(SectionSchema),
  promptAnchors: z.array(z.string()).optional(),
  coverageScore: z.number().optional()
});

export type PageBlueprint = z.infer<typeof PageBlueprintSchema>;
export type Section = z.infer<typeof SectionSchema>;

// --- MOCK GENERATOR LOGIC ---

// Helper to simulate "extracting anchors"
function extractAnchors(prompt: string): string[] {
  const stopwords = ["a", "the", "and", "or", "with", "for", "in", "of", "to", "building", "website", "site", "web", "page"];
  return prompt
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopwords.includes(w))
    .slice(0, 8); // Top 8 keywords
}

// Helper to select content based on keywords
function getContentForIndustry(anchors: string[]): Partial<PageBlueprint> {
  const text = anchors.join(" ");
  
  if (text.includes("clinic") || text.includes("dental") || text.includes("medical") || text.includes("health")) {
    return {
      brandName: "Aura Medical",
      tagline: "Care Reimagined",
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
          items: ["Mayo Clinic Certified", "JCI Accredited", "Top 100 Hospitals", "24/7 Care"]
        },
        {
          type: "features",
          headline: "Why Patients Choose Aura",
          items: [
            { title: "Expert Specialists", desc: "Board-certified doctors with decades of global experience.", icon: "Stethoscope" },
            { title: "Advanced Diagnostics", desc: "State-of-the-art imaging and lab technology on-site.", icon: "Activity" },
            { title: "Patient-Centric Approach", desc: "Your comfort, dignity, and recovery are our sole focus.", icon: "Heart" }
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
            type: "faq",
            headline: "Common Questions",
            items: [
               { q: "Do you accept insurance?", a: "Yes, we partner with all major insurance providers globally." },
               { q: "How do I book an appointment?", a: "You can book directly online or call our 24/7 concierge line." }
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
  }
  
  if (text.includes("estate") || text.includes("property") || text.includes("home") || text.includes("villa")) {
    return {
      brandName: "Vantage Properties",
      tagline: "Luxury Living, Elevated",
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
          items: ["Forbes Global Properties", "$2B+ Sold", "Featured in ArchDigest", "Elite Network"]
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
          type: "features",
          headline: "The Vantage Difference",
          items: [
            { title: "Off-Market Access", desc: "Exclusive access to properties before they hit the public market.", icon: "Key" },
            { title: "Global Reach", desc: "Connecting buyers and sellers across 40+ countries.", icon: "Globe" },
            { title: "Concierge Service", desc: "From viewing to closing, we handle every detail.", icon: "UserCheck" }
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
  }

  if (text.includes("food") || text.includes("restaurant") || text.includes("cafe") || text.includes("dining")) {
    return {
      brandName: "Lumina Dining",
      tagline: "Taste the Extraordinary",
      primaryColor: "softPink",
      sections: [
        {
          type: "hero",
          headline: "A Culinary Journey for the Senses.",
          subheadline: "Experience award-winning gastronomy in an atmosphere of modern elegance. Locally sourced, globally inspired.",
          ctaPrimary: "Reserve a Table",
          ctaSecondary: "View Menu"
        },
        {
          type: "trustBar",
          items: ["Michelin Star 2025", "Best Fine Dining UAE", "Farm-to-Table", "Sustainable Sourcing"]
        },
        {
          type: "showcase",
          headline: "Signature Dishes",
          items: [
            { title: "Truffle Risotto", desc: "Aged acquerello rice, black truffle, parmesan foam." },
            { title: "Wagyu Ribeye", desc: "A5 Japanese Wagyu, smoked salt, seasonal vegetables." },
            { title: "Yuzu Tart", desc: "Citrus curd, burnt meringue, basil gel." }
          ]
        },
        {
            type: "testimonials",
            headline: "Guest Reviews",
            items: [
              { name: "James L.", role: "Food Critic", quote: "Every bite was a revelation. The service is impeccable." },
              { name: "Sophie T.", role: "Guest", quote: "The perfect spot for our anniversary. Magical atmosphere." }
            ]
        },
        {
          type: "cta",
          headline: "Book Your Experience",
          subheadline: "Tables book out weeks in advance. Secure your spot today.",
          cta: "Reserve Now"
        }
      ]
    };
  }

  // Default / Agency / SaaS
  return {
    brandName: "Nova Systems",
    tagline: "Scale Without Limits",
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
        type: "faq",
        headline: "Frequently Asked Questions",
        items: [
           { q: "Is this suitable for small teams?", a: "Absolutely. We scale with you from 1 to 10,000 users." },
           { q: "Can I cancel anytime?", a: "Yes, we offer flexible monthly billing with no lock-in contracts." }
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

export async function generatePageBlueprint(
  prompt: string, 
  vibe: string
): Promise<PageBlueprint> {
  // Simulate AI latency
  await new Promise(resolve => setTimeout(resolve, 2000));

  const anchors = extractAnchors(prompt);
  const content = getContentForIndustry(anchors);

  // Map tone string from UI to Schema enum
  let mappedTone: "calm-luxury" | "modern-minimal" | "bold-premium" | "futuristic-glass" = "modern-minimal";
  if (vibe === "Calm Luxury") mappedTone = "calm-luxury";
  if (vibe === "Modern Minimal") mappedTone = "modern-minimal";
  if (vibe === "Bold Premium") mappedTone = "bold-premium";
  if (vibe === "Futuristic Glass") mappedTone = "futuristic-glass";

  // Construct full blueprint
  const blueprint: PageBlueprint = {
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString(),
    brandName: content.brandName || "New Project",
    tagline: content.tagline || "",
    tone: mappedTone,
    primaryColor: (content.primaryColor as any) || "rareBlue",
    sections: content.sections || [],
    promptAnchors: anchors,
    coverageScore: 0.95 // Mock high score since we are using templates
  };

  return blueprint;
}