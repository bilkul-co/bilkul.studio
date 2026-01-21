import { 
  users, 
  leads, 
  demoBlueprints,
  type User, 
  type InsertUser,
  type Lead,
  type InsertLead,
  type DemoBlueprint,
  type InsertDemoBlueprint
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  getLeadById(id: string): Promise<Lead | undefined>;
  updateLeadStatus(id: string, status: string): Promise<Lead | undefined>;
  
  createDemoBlueprint(blueprint: InsertDemoBlueprint): Promise<DemoBlueprint>;
  getDemoBlueprintById(id: string): Promise<DemoBlueprint | undefined>;
  getAllDemoBlueprints(): Promise<DemoBlueprint[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(insertLead)
      .returning();
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead | undefined> {
    const [lead] = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning();
    return lead || undefined;
  }

  async createDemoBlueprint(insertBlueprint: InsertDemoBlueprint): Promise<DemoBlueprint> {
    const [blueprint] = await db
      .insert(demoBlueprints)
      .values(insertBlueprint)
      .returning();
    return blueprint;
  }

  async getDemoBlueprintById(id: string): Promise<DemoBlueprint | undefined> {
    const [blueprint] = await db.select().from(demoBlueprints).where(eq(demoBlueprints.id, id));
    return blueprint || undefined;
  }

  async getAllDemoBlueprints(): Promise<DemoBlueprint[]> {
    return await db.select().from(demoBlueprints).orderBy(desc(demoBlueprints.createdAt));
  }
}

export const storage = new DatabaseStorage();
