import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertDemoBlueprintSchema } from "../shared/schema";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";
import { ensureAdminUser, requireAdmin, verifyPassword } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await ensureAdminUser();

  const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const ok = await verifyPassword(password, user.password);
      if (!ok) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      req.session.adminUserId = user.id;
      return res.json({ id: user.id, username: user.username });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          error: "Validation failed",
          details: fromZodError(error).message,
        });
      }
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Failed to login" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.clearCookie("bilkul.sid");
      return res.json({ ok: true });
    });
  });

  app.get("/api/admin/me", async (req, res) => {
    if (!req.session?.adminUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await storage.getUser(req.session.adminUserId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.json({ id: user.id, username: user.username });
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.json(lead);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: fromZodError(error).message 
        });
      }
      console.error("Error creating lead:", error);
      res.status(500).json({ error: "Failed to create lead" });
    }
  });

  const contactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    company: z.string().optional(),
    phone: z.string().optional(),
    message: z.string().min(5),
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactSchema.parse(req.body);
      const lead = await storage.createLead({
        serviceType: "Contact",
        businessName: data.company?.trim() || data.name.trim(),
        industry: data.company ? "Unknown" : null,
        goals: ["general-inquiry"],
        timeline: "flexible",
        email: data.email,
        phone: data.phone || null,
        details: data.message,
      });
      res.json(lead);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          error: "Validation failed",
          details: fromZodError(error).message,
        });
      }
      console.error("Error creating contact lead:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  app.get("/api/leads", requireAdmin, async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error: any) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:id", requireAdmin, async (req, res) => {
    try {
      const lead = await storage.getLeadById(req.params.id);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      res.json(lead);
    } catch (error: any) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ error: "Failed to fetch lead" });
    }
  });

  app.patch("/api/leads/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ error: "Status is required" });
      }
      const lead = await storage.updateLeadStatus(req.params.id, status);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      res.json(lead);
    } catch (error: any) {
      console.error("Error updating lead status:", error);
      res.status(500).json({ error: "Failed to update lead status" });
    }
  });

  app.post("/api/demo-blueprints", async (req, res) => {
    try {
      const validatedData = insertDemoBlueprintSchema.parse(req.body);
      const blueprint = await storage.createDemoBlueprint(validatedData);
      res.json(blueprint);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: fromZodError(error).message 
        });
      }
      console.error("Error creating demo blueprint:", error);
      res.status(500).json({ error: "Failed to create demo blueprint" });
    }
  });

  app.get("/api/demo-blueprints", requireAdmin, async (req, res) => {
    try {
      const blueprints = await storage.getAllDemoBlueprints();
      res.json(blueprints);
    } catch (error: any) {
      console.error("Error fetching demo blueprints:", error);
      res.status(500).json({ error: "Failed to fetch demo blueprints" });
    }
  });

  app.get("/api/demo-blueprints/:id", requireAdmin, async (req, res) => {
    try {
      const blueprint = await storage.getDemoBlueprintById(req.params.id);
      if (!blueprint) {
        return res.status(404).json({ error: "Demo blueprint not found" });
      }
      res.json(blueprint);
    } catch (error: any) {
      console.error("Error fetching demo blueprint:", error);
      res.status(500).json({ error: "Failed to fetch demo blueprint" });
    }
  });

  return httpServer;
}
