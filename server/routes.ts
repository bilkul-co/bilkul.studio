import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertDemoBlueprintSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
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

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error: any) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
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

  app.patch("/api/leads/:id/status", async (req, res) => {
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

  app.get("/api/demo-blueprints", async (req, res) => {
    try {
      const blueprints = await storage.getAllDemoBlueprints();
      res.json(blueprints);
    } catch (error: any) {
      console.error("Error fetching demo blueprints:", error);
      res.status(500).json({ error: "Failed to fetch demo blueprints" });
    }
  });

  app.get("/api/demo-blueprints/:id", async (req, res) => {
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
