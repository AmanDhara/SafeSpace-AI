import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  isUserMessage: boolean("is_user_message").notNull(),
  language: text("language").notNull(),
  sessionId: text("session_id").notNull(),
  timestamp: text("timestamp").notNull()
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  content: true,
  isUserMessage: true,
  language: true,
  sessionId: true,
  timestamp: true
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Schema for chat requests
export const chatRequestSchema = z.object({
  message: z.string().min(1),
  language: z.string().optional(),
  sessionId: z.string()
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

// Schema for chat responses
export const chatResponseSchema = z.object({
  message: z.string(),
  language: z.string(),
  detectedLanguage: z.string().optional()
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;
