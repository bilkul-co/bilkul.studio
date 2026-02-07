import crypto from "crypto";
import { promisify } from "util";
import type { NextFunction, Request, Response } from "express";
import { storage } from "./storage";
import { db } from "./db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

const scryptAsync = promisify(crypto.scrypt);
const SALT_BYTES = 16;
const KEY_LENGTH = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(SALT_BYTES).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [salt, keyHex] = storedHash.split(":");
  if (!salt || !keyHex) return false;
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  const storedKey = Buffer.from(keyHex, "hex");
  if (storedKey.length !== derivedKey.length) return false;
  return crypto.timingSafeEqual(storedKey, derivedKey);
}

export async function ensureAdminUser(): Promise<void> {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return;

  const existing = await storage.getUserByUsername(username);
  const nextHash = await hashPassword(password);

  if (!existing) {
    await storage.createUser({ username, password: nextHash });
    return;
  }

  const matches = await verifyPassword(password, existing.password);
  if (!matches) {
    await db.update(users).set({ password: nextHash }).where(eq(users.id, existing.id));
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.adminUserId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return next();
}
