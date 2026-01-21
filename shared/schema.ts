import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  serviceType: text("service_type").notNull(),
  businessName: text("business_name").notNull(),
  industry: text("industry"),
  goals: text("goals").array().notNull(),
  timeline: text("timeline").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  details: text("details"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const demoBlueprints = pgTable("demo_blueprints", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  brandName: text("brand_name").notNull(),
  tagline: text("tagline").notNull(),
  tone: text("tone").notNull(),
  primaryColor: text("primary_color").notNull(),
  sections: jsonb("sections").notNull(),
  promptAnchors: text("prompt_anchors").array(),
  coverageScore: text("coverage_score"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDemoBlueprintSchema = createInsertSchema(demoBlueprints).omit({
  id: true,
  createdAt: true,
});

export type InsertDemoBlueprint = z.infer<typeof insertDemoBlueprintSchema>;
export type DemoBlueprint = typeof demoBlueprints.$inferSelect;
