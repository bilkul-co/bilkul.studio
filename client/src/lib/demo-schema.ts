import { z } from "zod";

export const SectionTypeSchema = z.enum([
  "hero",
  "trustBar",
  "features",
  "showcase",
  "testimonials",
  "faq",
  "cta"
]);

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

// Section Schemas
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
  icon: z.string() // Lucide icon name
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
  brandName: z.string(),
  tagline: z.string(),
  tone: ToneSchema,
  primaryColor: ColorSchema,
  sections: z.array(SectionSchema)
});

export type PageBlueprint = z.infer<typeof PageBlueprintSchema>;
export type Section = z.infer<typeof SectionSchema>;
